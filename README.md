## Forum Application

## Description

forum WebApplication with Database

Project นี้เป็นโปรเจคที่เตรียมตัว สำหรับทำ Blog Assignment

1. สามารถ login เพื่อเก็บ access_token ไว้เป็นสิทธิในการ สร้าง, แก้ไขและลบ (post, comment)
2. สามารถ logout เพื่อ clear access_token
3. ระบบสามารถจำกัดสิทธิให้คนที่จะมา update และ delete เฉพาะเจ้าของ post/comment เท่านั้น
4. post สามารถ create, update และ delete(post ของตัวเองได้)
5. comment สามารถ create, update และ delete(comment ของตัวเองได้)
6. หน้าเว็บสามารถ display รายการทั้งหมดของ post และ comment ได้(โดยที่ยังไม่ต้อง login)

## การใช้งาน

เนื่องจากการจะ login ได้ จำเป็นต้อง register ก่อน แต่ผมยังทำหน้า register ไม่เสร็จ จึงอาจจะรบกวนให้ เรียก api post ไปที่ localhost:3001/user/register พร้อมตัวอย่าง body ดังนี้

```bash
{
    "email":"tonsai@test.com",
    "password":"231",
    "username":"Pondxx"
}
```

เนื่องจากบนหน้า web ตอนนี้ผมกำลังแก้ปัญหาเรื่องปุ่ม logout หายอยู่ หากต้องการ logout สามารถยิง api post ไปที่ localhost:3001/auth/logout โดยไม่ต้องใส่ body

## Project setup

### 1. Setup Database

Run the command to start the database with Docker Compose:

```bash
cd backend/server
```

และ run

```bash
docker-compose up -d
```

### 2. Setup Project in backend

Add config data to .env file

```bash

MONGO_URI=mongodb://localhost:27018
MONGO_USER=root
MONGO_PASSWORD=password
MONGO_DB_NAME=forum
JWT_SECRET=secret
```

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

สามารถ run test เพื่อตรวจสอบการทำงานของ post& user ที่มีการทำงานกับ mongo ได้ และตรวจสอบ auth ที่มีการทำงาน Local & Jwt Strategy ได้

```bash
# unit tests
$ npm run test

```

### 3. Setup Project in frontend

install library ในโปรเจค

```bash
$ npm install
```

## Compile and run the project

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
