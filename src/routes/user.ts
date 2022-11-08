import express from "express";
const {getUsers,createInsert, createInsertForUserdata} = require('../middleware/get')
const route = express.Router()
console.log("route",route);
// route.get('/', login)
route.get('/',getUsers)
route.post('/', createInsert)
route.post('/userdata', createInsertForUserdata)

module.exports =  route;