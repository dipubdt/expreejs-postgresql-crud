const express = require('express');
const bodyParser = require('body-parser');
const db = require('./service');

const app = express();

app.use(bodyParser.json());



const PORT = 4000;

app.get('/users',db.GetUsers);
app.get('/users/:id', db.GetUserId);
app.post('/users',db.CreateUser);
app.delete('/users/:id',db.DeleteUser);
app.put('/users/:id', db.UpdateUser);

app.get('/',(req,res)=>{


    res.json({
        info:'server is running port 4000'
    })
}



)


app.listen(PORT,() => {

console.log("START APP PORT 4000 ")

})
