# Thecaofast Discord Bot

## Hướng dẫn sử dụng

1. Clone repo này về `git clone https://github.com/hoangvu12/thecaofast-bot.git`
2. Cài dependencies `npm install`
3. Tạo file .env, thêm các biến yêu cầu:

- **BOT_TOKEN**: Token lấy ở [Discord Developer](https://discord.com/developers/applications)
- **BOT_PREFIX**: Prefix (ví dụ: !).
- **SECRET_KEY**: API Key lấy ở web thecaofast. Xem [Documentation](https://github.com/hoangvu12/thecaofast-api-docs)
- **URL**: URL bạn đang host (VD: Mình host ở heroku sẽ có URL như sau:
  https://thecaofast.herokuapp.com
  )

## Bắt đầu chạy bot

Chỉ cần chạy `npm start` là được.

## Roles

Có 2 cách để check role của một user.

### 1. Sử dụng `$or`

Khi sử dụng `$or`, hệ thống sẽ kiểm tra xem nếu user CÓ 1 trong những role id đã cho.

VD:

```js
const memberRoles = ["1", "2", "3"];

const query = { $or: ["1", "2"] };

/**
 * Trả về true vì memberRoles
 * chứa 1 trong 2 role có ở query
 */
isValidRole(query, memberRoles);
```

### 2. Sử dụng `$and`

Khi sử dụng `$and`, hệ thống sẽ kiểm tra xem nếu user CÓ TẤT CẢ những role id đã cho;

```js
const memberRoles = ["1", "2", "3"];

const query = { $and: ["1", "2"] };

/**
 * Trả về true vì memberRoles
 * có tất cả role ở query
 */
isValidRole(query, memberRoles);
```

```js
const memberRoles = ["1", "3"];

const query = { $and: ["1", "2"] };

/**
 * Trả về false vì memberRoles
 * không có role "2"
 */
isValidRole(query, memberRoles);
```

## Thêm lệnh

Giả sử chúng ta cần tạo lệnh `!random`

### 1. Tạo file mới ở thư mục `commands`

Đặt tên file là lệnh bạn muốn tạo, ở đây chúng ta sẽ đặt tên file là `random.js`

### 2. Export ra những thứ sau:

```js
module.exports = {
  name: "Tên command (random)",
  description: "Description của command (random integer number)",
  roles: {$or: ["", ""]} // Role ids
  execute(message, args) {
    // Chạy thứ gì đó ở đây
  },
};
```
