# Thecaofast Discord Bot

## Hướng dẫn sử dụng

1. Clone repo này về `git clone https://github.com/hoangvu12/thecaofast-bot.git`
2. Cài dependencies `npm install`
3. Tạo file .env, thêm các biến yêu cầu:

- **BOT_TOKEN**: Token lấy ở [Discord Developer](https://discord.com/developers/applications)
- **BOT_PREFIX**: Prefix (ví dụ: !).
- **SECRET_KEY**: API Key lấy ở web thecaofast. Xem [Documentation](https://github.com/hoangvu12/thecaofast-api-docs)

## Bắt đầu chạy bot

Chỉ cần chạy `npm start` là được.

## Thêm lệnh

Giả sử chúng ta cần tạo lệnh `!random`

### 1. Tạo file mới ở thư mục `commands`

Đặt tên file là lệnh bạn muốn tạo, ở đây chúng ta sẽ đặt tên file là `random.js`

### 2. Export ra những thứ sau:

```js
module.exports = {
  name: "Tên command (random)",
  description: "Description của command (random integer number)",
  execute(message, args) {
    // Chạy thứ gì đó ở đây
  },
};
```
