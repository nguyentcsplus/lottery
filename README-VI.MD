# Chương trình quay số may mắn

Chương trình quay số may mắn cho tiệc tất niên, quay số quả cầu 3D, hỗ trợ cấu hình thông tin giải thưởng, nhập thông tin người tham gia bằng `Excel`, và xuất kết quả quay số bằng `Excel`

Nếu chương trình này hữu ích cho bạn😎😎😎, rất mong bạn cho một⭐**sao**⭐ 😘😘😘😍🥰🎉🎈🎃

> Thử ngay:  [https://moshang-ax.github.io/lottery/](https://moshang-ax.github.io/lottery/)

## Công nghệ sử dụng

Công nghệ: Node + Express + Three.js

Server: Express + Node

Trang web: Three.js, Tham khảo ví dụ 3D chính thức của `Three.js`

## Mô tả chức năng:

1. Kết quả có thể được lưu và tải xuống excel đồng bộ🎉
2. Người trúng thưởng sẽ không tham gia quay số nữa, và người quay số có thể quay lại nếu người đó không có mặt tại chỗ🎁
3. Làm mới hoặc tắt server sẽ lưu dữ liệu người trúng thưởng và sẽ không đặt lại dữ liệu quay số, chỉ khi nhấp vào nút đặt lại trên trang thì dữ liệu quay số mới được đặt lại🧧
4. Số lượng giải thưởng có thể cấu hình🎈
5. Sau khi tất cả giải thưởng đã được quay, bạn có thể tiếp tục quay giải đặc biệt (Ví dụ: Lì xì, giải thưởng bổ sung, v.v.). Mặc định, một lần quay một giải🧨

## Xem trước

> Thử ngay:  [https://moshang-ax.github.io/lottery/](https://moshang-ax.github.io/lottery/)

![lottery.gif](https://raw.githubusercontent.com/moshang-xc/blog/master/share/lottery.gif)

![index.jpg](https://raw.githubusercontent.com/moshang-xc/blog/master/share/index.jpg)

![start.jpg](https://raw.githubusercontent.com/moshang-xc/blog/master/share/start.jpg)

![end.jpg](https://raw.githubusercontent.com/moshang-xc/blog/master/share/end.jpg)

## Cài đặt

```
git clone https://github.com/moshang-xc/lottery.git

cd lottery

# Cài đặt plugin server
cd server
npm install

# Cài đặt plugin front-end
cd ../product
npm install

# Đóng gói
npm run build

# Chạy
npm run serve

# Phát triển & gỡ lỗi
npm run dev

```

## Cấu trúc thư mục

```
Lottery
├── product
│   ├── src
│   │   ├── lottery
│   │   │   └── index.js
│   │   ├── lib
│   │   ├── img
│   │   ├── css
│   │   └── data
│   ├── package.json
│   └── webpack.config.js
├── server
│   ├── config.js
│   ├── server.js
│   └── package.js
```

> 1. product là thư mục trang front-end
> 2. package.josn là file cấu hình dự án web
> 3. webpack.config.js là file cấu hình đóng gói
> 4. server là thư mục server
> 5. config là file cấu hình thông tin giải thưởng

## Thông tin cấu hình

### Cấu hình thông tin người dùng quay số

Thông tin người dùng quay số trong file**`server/data/user.xlsx`**, điền theo định dạng file, không thể sửa tên file và tiêu đề cột

### Cấu hình thông tin giải thưởng

Thông tin cấu hình giải thưởng được điền trong file**server/config.js**, không thể sửa tên file.

**Mô tả cấu hình giải thưởng prizes như sau:**

| Tham số  | Kiểu giá trị | Mô tả                                                         |
| ----- | ------ | ------------------------------------------------------------ |
| type  | Number | Loại giải thưởng, mã định danh duy nhất, 0 là placeholder cho giải đặc biệt mặc định, các giải thưởng khác không thể sử dụng |
| count | Number | Số lượng giải thưởng                                                     |
| text  | String | Tên giải thưởng                                                     |
| title | String | Mô tả giải thưởng                                                     |
| img   | String | Địa chỉ hình ảnh giải thưởng, hình ảnh trong thư mục**img**                          |

```js
// Thông tin giải thưởng, mục đầu tiên là mục dự phòng không thể sửa, các mục khác có thể sửa theo nhu cầu
let prizes = [{
        type: 0,
        count: 1000,
        title: "",
        text: "Giải đặc biệt"
    },
    {
        type: 1,
        count: 2,
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
    }
    ...
];
```

### Cấu hình số lượng giải thưởng quay mỗi lần

**EACH_COUNT**Dùng để cấu hình số lượng quay số mỗi lần, tương ứng một-một với prizes giải thưởng, ví dụ cấu hình số lượng quay số tương ứng với cấu hình giải thưởng ở trên như sau:

```js
const EACH_COUNT = [1, 1, 5];
```

Cấu hình trên có nghĩa là số lượng giải thưởng quay một lần theo thứ tự là: giải đặc biệt mỗi lần quay một, giải đặc biệt mỗi lần quay một, giải nhất mỗi lần quay năm

### Cấu hình logo công ty

Logo này dùng để hiển thị trên thẻ quay số.

```js
const COMPANY = "MoShang";
```


## Phương án triển khai Docker

### Tổng quan

Dự án này hiện hỗ trợ sử dụng Docker để triển khai. Docker là một nền tảng container hóa nhẹ, cho phép bạn triển khai, kiểm thử và chạy ứng dụng một cách nhanh chóng. Tài liệu này sẽ hướng dẫn bạn cách sử dụng Docker để triển khai dự án.

### Yêu cầu hệ thống

Trước khi bắt đầu sử dụng Docker để triển khai dự án, bạn cần đảm bảo đã cài đặt các phần mềm sau:

- Docker (Vui lòng tham khảo tài liệu chính thức của Docker để biết hướng dẫn cài đặt)
- Docker Compose

### Cài đặt

1. Tải xuống và giải nén mã nguồn của dự án.

2. Vào thư mục dự án sau khi giải nén.

3. Thực thi lệnh sau để xây dựng Docker image:

   ```
   ./build.sh [TAG]
   ```

   Điều này sẽ sử dụng Dockerfile để xây dựng một Docker image có tên`lottery:[TAG]`. Nếu không chỉ định tag, mặc định sẽ sử dụng tag`latest`.

4. Thực thi lệnh sau để chạy container cục bộ:

   ```
   ./dev.sh [TAG]
   ```

   Điều này sẽ khởi động container và triển khai ứng dụng trong Docker container. Bạn có thể kiểm thử cục bộ để đảm bảo mọi thứ hoạt động bình thường. Lưu ý rằng ứng dụng trong container sẽ lắng nghe cổng 8888 và cổng 443.

5. Thực thi lệnh sau để đánh dấu Docker image và đẩy lên Docker repository từ xa:

   ```
   ./tagpush.sh [TAG]
   ```

   Điều này sẽ đánh dấu Docker image và đẩy lên Docker repository từ xa, nếu muốn sử dụng docker hub chính thức, vui lòng tạo repo của riêng bạn tại https://hub.docker.com/ trước, sau đó thay đổi tên người dùng trong file thành của bạn. Lưu ý rằng,`[TAG]`nên được thay thế bằng tên tag bạn muốn sử dụng.

6. Đảm bảo có một file có tên`docker-compose.yml`và thêm nội dung sau:

   ```
   version: '3.8'
   
   volumes:
     lottery_log:
   
   services:
     lottery:
       container_name: lottery
       expose:
         - 8888
       ports:
         - "28458:8888"
         - "443:443"
       volumes:
         - "lottery_log:/var/log"
       image: "panda1024/lottery:[TAG]" 
       restart: always
   ```

   Lưu ý rằng,`[TAG]`nên được thay thế bằng tên image bạn đã đẩy lên Docker repository.

7. Trong thư mục dự án trên server, chạy lệnh sau để sử dụng Docker Compose triển khai ứng dụng:

```
	docker-compose up -d
```

​		Điều này sẽ khởi động một Docker Compose stack và triển khai dự án trong đó. Lưu ý rằng, ở đây cổng 8888 và cổng 443 của container được ánh xạ đến cổng 8888 và cổng 443 trên server. Nếu bạn muốn sử dụng cổng khác, vui lòng thay đổi file`docker-compose.yml`tương ứng.



## License

MIT

