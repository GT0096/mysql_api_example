import express from 'express';
import bodyParser from 'body-parser';
// import express from '@types/express';

const app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get('/',(req, res)=> {
console.log('Hello world');
res.send("Hello World")
})
const route = require('./routes/user');

app.use('/api/v1/emp', route)

app.listen(3000, ()=>{
    console.log("Hello you are on port 3000");
}) 