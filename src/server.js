const express = require('express');
var cors = require('cors')
const mongoose = require('mongoose')
const connectDB = require('./connection')
const blog = require('./post')
const date = require('date-and-time');

const app = express();
connectDB();
const now = new Date();

app.use(express.json())
app.use(cors())
const PORT = 4300;


mongoose.connection.once('open', () =>{
    console.log('-------------------------------------------')
    console.log('Database connection is succesfull!')
    app.listen(PORT, () =>{console.log("Listening on port:"+PORT)});
   

})

app.get('/test', (req,res) => {
    //res.send("Yea, I can hear you!")
    res.send(date.format(now, 'YYYY/MM/DD HH:mm:ss'))
})


app.get('/getblog/:id' , async (req, res) => {
    const id = req.params.id

    const blogData = await blog.findOne({_id : id})

    res.send(blogData);
})


app.get('/getblogs', async (req,res) => {
    const blogData = await blog.find({});

    res.send(blogData);
})


app.post('/blogadd', async (req,res) =>
{
    const prev = req.body.body.slice(0,30);
    //console.log(req.body);
    const post = new blog({
        title : req.body.title,
        body : req.body.body,
        preview : prev,
        author : req.body.author,
        date : date.format(now, 'YYYY/MM/DD HH:mm:ss') 
    })
    post.save();
    console.log(post);

    const blogData = await blog.find({});

    res.send(blogData) 
})

app.delete('/blogdelete/:id', async (req,res) => {
    const id = req.params.id

    await blog.deleteOne({_id: id});

    const blogData = await blog.find({});

    res.send(blogData);
})