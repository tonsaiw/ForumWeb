## Forum Application

## Description

forum WebApplication with Database

Project นี้เป็นโปรเจคที่เตรียมตัว สำหรับทำ Assignment

## Project setup

### 1. Setup Database

Run the command to start the database with Docker Compose:

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
