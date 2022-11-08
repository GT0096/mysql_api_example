"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const { getUsers, createInsert, createInsertForUserdata } = require('../middleware/get');
const route = express_1.default.Router();
console.log("route", route);
// route.get('/', login)
route.get('/', getUsers);
route.post('/', createInsert);
route.post('/userdata', createInsertForUserdata);
module.exports = route;
