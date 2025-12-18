/**
 * Cài đặt giải thưởng
 * type: Mã định danh duy nhất, 0 là placeholder cho giải đặc biệt mặc định, các giải thưởng khác không thể sử dụng
 * count: Số lượng giải thưởng
 * title: Mô tả giải thưởng
 * text: Tiêu đề giải thưởng
 * img: Địa chỉ hình ảnh
 */
const prizes = [
  {
    type: 0,
    count: 1000,
    title: "",
    text: "Giải đặc biệt"
  },
  {
    type: 1,
    count: 5,
    text: "Giải đặc biệt",
    title: "Quà tặng bí ẩn",
    img: "../img/secrit.jpg"
  },
  {
    type: 2,
    count: 5,
    text: "Giải nhất",
    title: "Mac Pro",
    img: "../img/mbp.jpg"
  },
  {
    type: 3,
    count: 5,
    text: "Giải nhì",
    title: "Huawei Mate30",
    img: "../img/huawei.png"
  },
  {
    type: 4,
    count: 5,
    text: "Giải ba",
    title: "Ipad Mini5",
    img: "../img/ipad.jpg"
  },
  {
    type: 5,
    count: 5,
    text: "Giải tư",
    title: "Máy bay không người lái DJI",
    img: "../img/spark.jpg"
  }
];

/**
 * Số lượng giải thưởng quay một lần tương ứng với prizes
 */
const EACH_COUNT = [1, 1, 1, 1, 1, 1];

/**
 * Logo tên công ty trên thẻ
 */
const COMPANY = "Splus-Software";

module.exports = {
  prizes,
  EACH_COUNT,
  COMPANY
};
