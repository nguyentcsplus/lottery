const express = require("express");
const opn = require("opn");
const bodyParser = require("body-parser");
const path = require("path");
const chokidar = require("chokidar");
const cfg = require("./config");

const {
  loadXML,
  loadTempData,
  writeXML,
  saveDataFile,
  shuffle,
  saveErrorDataFile
} = require("./help");

let app = express(),
  router = express.Router(),
  cwd = process.cwd(),
  dataBath = __dirname,
  port = 8090,
  curData = {},
  luckyData = {},
  errorData = [],
  defaultType = cfg.prizes[0]["type"],
  defaultPage = `default data`;

//Ở đây chỉ định tham số sử dụng định dạng json
app.use(
  bodyParser.json({
    limit: "1mb"
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

if (process.argv.length > 2) {
  port = process.argv[2];
}

app.use(express.static(cwd));

//Địa chỉ yêu cầu trống, mặc định chuyển hướng đến file index.html
app.get("/", (req, res) => {
  res.redirect(301, "index.html");
});

//Thiết lập truy cập cross-origin
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.post("*", (req, res, next) => {
  log(`Nội dung yêu cầu：${JSON.stringify(req.path, 2)}`);
  next();
});

// Lấy dữ liệu đã thiết lập trước đó
router.post("/getTempData", (req, res, next) => {
  getLeftUsers();
  res.json({
    cfgData: cfg,
    leftUsers: curData.leftUsers,
    luckyData: luckyData
  });
});

// Lấy tất cả người dùng
router.post("/reset", (req, res, next) => {
  luckyData = {};
  errorData = [];
  log(`Đặt lại dữ liệu thành công`);
  saveErrorDataFile(errorData);
  return saveDataFile(luckyData).then(data => {
    res.json({
      type: "success"
    });
  });
});

// Lấy tất cả người dùng
router.post("/getUsers", (req, res, next) => {
  res.json(curData.users);
  log(`Trả về dữ liệu người quay số thành công`);
});

// Lấy thông tin giải thưởng
router.post("/getPrizes", (req, res, next) => {
  // res.json(curData.prize);
  log(`Trả về dữ liệu giải thưởng thành công`);
});

// Lưu dữ liệu quay số
router.post("/saveData", (req, res, next) => {
  let data = req.body;
  setLucky(data.type, data.data)
    .then(t => {
      res.json({
        type: "Thiết lập thành công！"
      });
      log(`Lưu dữ liệu giải thưởng thành công`);
    })
    .catch(data => {
      res.json({
        type: "Thiết lập thất bại！"
      });
      log(`Lưu dữ liệu giải thưởng thất bại`);
    });
});

// Lưu dữ liệu quay số
router.post("/errorData", (req, res, next) => {
  let data = req.body;
  setErrorData(data.data)
    .then(t => {
      res.json({
        type: "Thiết lập thành công！"
      });
      log(`Lưu dữ liệu người không đến thành công`);
    })
    .catch(data => {
      res.json({
        type: "Thiết lập thất bại！"
      });
      log(`Lưu dữ liệu người không đến thất bại`);
    });
});

// Lưu dữ liệu vào excel
router.post("/export", (req, res, next) => {
  let type = [1, 2, 3, 4, 5, defaultType],
    outData = [["Mã nhân viên", "Họ tên", "Phòng ban"]];
  cfg.prizes.forEach(item => {
    outData.push([item.text]);
    outData = outData.concat(luckyData[item.type] || []);
  });

  writeXML(outData, "/Kết quả quay số.xlsx")
    .then(dt => {
      // res.download('/Kết quả quay số.xlsx');
      res.status(200).json({
        type: "success",
        url: "Kết quả quay số.xlsx"
      });
      log(`Xuất dữ liệu thành công！`);
    })
    .catch(err => {
      res.json({
        type: "error",
        error: err.error
      });
      log(`Xuất dữ liệu thất bại！`);
    });
});

//Đối với đường dẫn hoặc yêu cầu không khớp, trả về trang mặc định
//Phân biệt các yêu cầu khác nhau trả về nội dung trang khác nhau
router.all("*", (req, res) => {
  if (req.method.toLowerCase() === "get") {
    if (/\.(html|htm)/.test(req.originalUrl)) {
      res.set("Content-Type", "text/html");
      res.send(defaultPage);
    } else {
      res.status(404).end();
    }
  } else if (req.method.toLowerCase() === "post") {
    let postBackData = {
      error: "empty"
    };
    res.send(JSON.stringify(postBackData));
  }
});

function log(text) {
  global.console.log(text);
  global.console.log("-----------------------------------------------");
}

function setLucky(type, data) {
  if (luckyData[type]) {
    luckyData[type] = luckyData[type].concat(data);
  } else {
    luckyData[type] = Array.isArray(data) ? data : [data];
  }

  return saveDataFile(luckyData);
}

function setErrorData(data) {
  errorData = errorData.concat(data);

  return saveErrorDataFile(errorData);
}

app.use(router);

function loadData() {
  console.log("Tải file dữ liệu EXCEL");
  let cfgData = {};

  // curData.users = loadXML(path.join(cwd, "data/users.xlsx"));
  curData.users = loadXML(path.join(dataBath, "data/users.xlsx"));
  // Xáo trộn lại
  shuffle(curData.users);

  // Đọc kết quả đã quay
  loadTempData()
    .then(data => {
      luckyData = data[0];
      errorData = data[1];
    })
    .catch(data => {
      curData.leftUsers = Object.assign([], curData.users);
    });
}

function getLeftUsers() {
  //  Ghi lại người dùng đã quay hiện tại
  let lotteredUser = {};
  for (let key in luckyData) {
    let luckys = luckyData[key];
    luckys.forEach(item => {
      lotteredUser[item[0]] = true;
    });
  }
  // Ghi lại người đã quay nhưng không có mặt
  errorData.forEach(item => {
    lotteredUser[item[0]] = true;
  });

  let leftUsers = Object.assign([], curData.users);
  leftUsers = leftUsers.filter(user => {
    return !lotteredUser[user[0]];
  });
  curData.leftUsers = leftUsers;
}

loadData();

module.exports = {
  run: function(devPort, noOpen) {
    let openBrowser = true;
    if (process.argv.length > 3) {
      if (process.argv[3] && (process.argv[3] + "").toLowerCase() === "n") {
        openBrowser = false;
      }
    }

    if (noOpen) {
      openBrowser = noOpen !== "n";
    }

    if (devPort) {
      port = devPort;
    }

    let server = app.listen(port, () => {
      let host = server.address().address;
      let port = server.address().port;
      global.console.log(`lottery server listenig at http://${host}:${port}`);
      openBrowser && opn(`http://127.0.0.1:${port}`);
    });
  }
};
