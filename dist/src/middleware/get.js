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
const login_1 = require("../components/login");
const login_2 = require("../components/login");
const userLogin = new login_1.Login();
// fetch login information.
exports.getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield userLogin.ipfslogin("ipfslogin");
    console.log("get db", db);
    const value = yield db[0].select().execute();
    const data = yield value.fetchAll();
    console.log('value of get', data);
    return res.send({ message: "data retrived successfully", data: Object.assign({}, data) });
});
// Create login information
exports.createInsert = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const userData = new login_2.User(req.body);
    const cred = userData.user;
    if (req.body.constructor === Object && Object(req.body).length === 0) {
        res.send(400);
        return res.send({ message: "Please fill all the fields" });
    }
    else {
        console.log("valid data");
        const db = yield userLogin.ipfslogin("ipfslogin");
        const db1 = yield db[0].existsInDatabase(cred.UserName);
        console.log("db1", db1);
        if (!db1) {
            return res.send({ message: "Enter another Username as this one is taken by another user" });
        }
        else {
            const value = yield db[0].insert(['ID', 'UserName', 'Password', 'LoginDate']).values(cred.ID, cred.UserName, cred.Password, cred.LoginDate).execute();
            console.log("value is", value);
            if (value.getWarningsCount() > 0) {
                for (const warning in value.getWarnings()) {
                    console.log('Warnings', warning);
                }
            }
            console.log('Data inserted successfully.');
            return res.send({ message: "Data inserted successfully.", ID: `${cred.ID}` });
        }
    }
});
exports.createInsertForUserdata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const userData = new login_2.UserData(req.body);
    const cred = userData.userdata;
    console.log(cred);
    if (req.body.constructor === Object && Object(req.body).length === 0) {
        res.send(400);
        return res.send({ message: "Please fill all the fields" });
    }
    else {
        console.log("valid data");
        const db = yield userLogin.ipfslogin("userdata");
        const getname = yield db[1].getName();
        console.log("name", getname);
        const db1 = yield db[1].existsInDatabase(cred.datahash);
        console.log("db1", db1);
        if (!db1) {
            return res.send({ message: "data already exist" });
        }
        else {
            const value = yield db[1].insert(['dataID', 'ID', 'datahash', 'link', 'createDate']).values(cred.dataID, cred.ID, cred.datahash, cred.link, cred.createDate).execute();
            console.log("value is", value);
            if (value.getWarningsCount() > 0) {
                for (const warning in value.getWarnings()) {
                    console.log('Warnings', warning);
                }
            }
            console.log('Data inserted successfully.');
            return res.send({ message: "Data inserted successfully." });
        }
    }
});
