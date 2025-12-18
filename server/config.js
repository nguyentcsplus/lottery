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
    // Giải 1: quay đầu tiên
    type: 1,
    count: 1,
    text: "Giải vui vẻ",
    title: "",
    img: "../img/gift.png"
  },
  {
    // Giải 3: quay cuối cùng
    type: 3,
    count: 1,
    text: "Giải đặc biệt",
    title: "",
    img: "../img/gift.png"
  },
  {
    // Giải 2
    type: 2,
    count: 1,
    text: "Giải may mắn",
    title: "",
    img: "../img/gift.png"
  },
  {
    // Giải 1: quay đầu tiên
    type: 1,
    count: 1,
    text: "Giải vui vẻ",
    title: "",
    img: "../img/gift.png"
  }
];

/**
 * Số lượng giải thưởng quay một lần tương ứng với prizes
 */
const EACH_COUNT = [1, 1, 1, 1];

/**
 * Logo tên công ty trên thẻ
 */
const COMPANY = "Splus-Software";

module.exports = {
  prizes,
  EACH_COUNT,
  COMPANY
};
