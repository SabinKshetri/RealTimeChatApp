const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIO = require("socket.io");



const app = express();
const port = 4500 || process.env.PORT;


const users=[{}];

app.use(cors());



app.get("/", (req, res) => {
  res.send("server working");
});

const server = http.createServer(app);
const io = socketIO(server);

//io means the whole circiuit and socket mean each and user

io.on("connect",(socket)=>{
  console.log("New Connection !!!");

  socket.on('joined',({user})=>{
    users[socket.id]=user;
    console.log(`${user} has Joined!!`);
    socket.broadcast.emit('userJoined',{user:"Admin",message:`${users[socket.id]} has Joined !!`})
    socket.emit('welcome',{user:"Admin", message:`Welcome to the chat,${users[socket.id]}`})
  })



socket.on('message',({message,id})=>{
  io.emit('sendMessage',{user:users[id],message,id});
  
})


  socket.on('userDisconnect',() =>{
    socket.broadcast.emit('leave',{user:"Admin", message:` ${users[socket.id]} has left the chat !!`})
    console.log(`User Left!!`);
  })


})

















server.listen(port, () => {
  console.log(`Server is working on ${port}`);
});
