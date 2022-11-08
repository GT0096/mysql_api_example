import { Table } from "@mysql/xdevapi";
import {Login} from "../components/login";
import { ipfsLoginStr, userdatatype } from "../components/login";
import {User, UserData} from "../components/login"
const userLogin = new Login();


// fetch login information.
exports.getUsers = async (req:any, res:any )=>{
  const db = await userLogin.ipfslogin("ipfslogin");
  console.log("get db",db);
  const value = await db[0].select().execute();
  const data = await value.fetchAll();
  console.log('value of get', data);
  return res.send({message: "data retrived successfully", data: {...data}})
  
}

// Create login information


exports.createInsert = async  (req:any, res:any)=>{
   console.log(req.body);
  const userData = new User(req.body);
  const cred:ipfsLoginStr = userData.user
  if(req.body.constructor===Object && Object(req.body).length === 0){
    res.send(400);
    return res.send({message: "Please fill all the fields"});
    
  }else{
    console.log("valid data");
    const db:any = await userLogin.ipfslogin("ipfslogin");
    const db1:any = await db[0].existsInDatabase(cred.UserName);
    console.log("db1",db1);
    if(!db1){
      return res.send({message:"Enter another Username as this one is taken by another user"})
    }else{
      const value:any = await  db[0].insert(['ID', 'UserName', 'Password','LoginDate']).values(cred.ID,cred.UserName,cred.Password,cred.LoginDate).execute()
      console.log("value is",value);
      if (value.getWarningsCount() > 0){
          for (const warning in value.getWarnings()) {
              console.log('Warnings', warning)
      }
      }
      console.log('Data inserted successfully.')
      return res.send({message:"Data inserted successfully.", ID: `${cred.ID}`});
    }
    
  }

}

exports.createInsertForUserdata = async  (req:any, res:any)=>{
  console.log(req.body);
 const userData = new UserData(req.body);
 const cred: userdatatype = userData.userdata
 console.log(cred);
 if(req.body.constructor===Object && Object(req.body).length === 0){
   res.send(400);
   return res.send({message: "Please fill all the fields"});
   
 }else{
   console.log("valid data");
   const db:any = await userLogin.ipfslogin("userdata");
   const getname = await db[1].getName()
   console.log("name",getname);
   const db1:any = await db[1].existsInDatabase(cred.datahash);
   console.log("db1",db1);
   
   if(!db1){
    return res.send({message:"data already exist"})
   }else{
    const value:any = await  db[1].insert(['dataID','ID','datahash', 'link','createDate']).values(cred.dataID,cred.ID, cred.datahash, cred.link, cred.createDate).execute()
     console.log("value is",value);
     if (value.getWarningsCount() > 0){
         for (const warning in value.getWarnings()) {
             console.log('Warnings', warning)
     }
     }
     console.log('Data inserted successfully.')
     return res.send({message:"Data inserted successfully."});
 
   }
       
 }

}
