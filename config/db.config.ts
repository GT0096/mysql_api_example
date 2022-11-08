const mysqlx = require('@mysql/xdevapi');
require('dotenv').config();
const schema: string | undefined = process.env.MYSQL_SCHEMA
export const config = {
    schema: `${schema}`,
    user:  `${process.env.MYSQL_USER}`,
    password: `${process.env.MYSQL_PASS}`,
    port: 33060,
};
export const connect:()=>Promise<any> = async function(): Promise<{}>{
const session:any= await mysqlx.getSession(config);
 const tables:any = await  session.getSchema(`${schema}`);

 return tables

}




