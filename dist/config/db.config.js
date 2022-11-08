"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.config = void 0;
const mysqlx = require('@mysql/xdevapi');
require('dotenv').config();
const schema = process.env.MYSQL_SCHEMA;
exports.config = {
    schema: `${schema}`,
    user: `${process.env.MYSQL_USER}`,
    password: `${process.env.MYSQL_PASS}`,
    port: 33060,
};
const connect = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield mysqlx.getSession(exports.config);
        const tables = yield session.getSchema(`${schema}`);
        return tables;
    });
};
exports.connect = connect;
