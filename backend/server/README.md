## Forum Server

## Description

ในโปรเจกต์นี้ ผมได้ตั้งค่า MongoDB โดยไม่เก็บข้อมูลถาวร เพื่อให้ฐานข้อมูลถูกรีเซ็ตทุกครั้งที่ Docker ถูกรีสตาร์ท วิธีนี้ช่วยให้ทุกการทดสอบเริ่มต้นด้วยข้อมูลที่สะอาด และไม่เก็บข้อมูลเก่าค้างไว้ ทำให้การทดสอบง่ายและมีประสิทธิภาพมากขึ้น

## Project setup

### 1. Setup Database

Run the command to start the database with Docker Compose:

```bash
docker-compose up -d
```

### 2. Setup Project

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

```bash
# unit tests
$ npm run test

```
