
import { connect } from "../../config/db.config";

export interface ipfsLoginStr {
  ID : string;
  UserName: string;
  Password: string;
  LoginDate: Date;
}

export interface userdatatype {
  dataID: number,
  ID : number;
  datahash: string;
  link: string;
  createDate: Date;
}


export class Login  {

constructor() {

}
ipfslogin :(arg0:string)=>Promise<any> = async function(table:string) : Promise<{}>{
   const tableData : any = await connect();
   const db:any = await  tableData.getTables(table)
   console.log(db);
    return  db;
}
}

export class User {
  user : ipfsLoginStr;
 
  constructor(user:ipfsLoginStr){
    this.user = user;
  }

}

export class UserData {
  userdata: userdatatype;
  constructor( userdata:userdatatype){
    this.userdata=userdata;
  }
}
