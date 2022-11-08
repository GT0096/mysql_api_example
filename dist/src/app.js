"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// import express from '@types/express';
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    console.log('Hello world');
    res.send("Hello World");
});
const route = require('./routes/user');
app.use('/api/v1/emp', route);
app.listen(3000, () => {
    console.log("Hello you are on port 3000");
});
