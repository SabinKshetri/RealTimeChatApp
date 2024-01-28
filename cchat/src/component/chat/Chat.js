import React, { useEffect, useState } from 'react'
import { user } from "../Join/Join";
import socketIo from "socket.io-client";
import './chat.css'
import Message from '../message/Message';
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../../images/closeIcon.png"
import sendButton from "../../images/send.png";



let socket;

const ENDPOINT = "http://localhost:4500/";

const Chat = () => {
    const [id, setid] = useState("");
   const [message,setMessage]=useState([])

    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id });
        document.getElementById('chatInput').value = "";
    }

    
    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            alert('Connected');
            setid(socket.id);

        })
        console.log(socket);
        socket.emit('joined', { user })

        socket.on('welcome', (data) => {
          setMessage([...message,data]);
            
            console.log(data.user, data.message);
        })

        socket.on('userJoined', (data) => {
          setMessage([...message,data]);
            console.log(data.user, data.message);
        })

        socket.on('leave', (data) => {
          setMessage([...message,data]);
            console.log(data.user, data.message)
        })

        return () => {
            socket.emit('userDisconnect');
            socket.off();
        }
    }, []);

    useEffect(()=>{

          socket.on('sendMessage',(data)=>{
            setMessage([...message,data]);
            console.log(data.user, data.message,data.id);
          })
      return()=>{
        socket.off();

      }
    },[message])

   

    return (
      <div>
      <div className="chatPage">
        <div className="chatContainer">
          <div className="header">
            <h2>GuffGaff</h2>
          <a href='/'> <img src={closeIcon}alt='close'/></a> 
            </div>
          <ReactScrollToBottom className="chatBox">
            {message.map((item,i)=><Message user={item.id===id?'you':item.user} message={item.message} classs={item.id===id?'right':'left'}/>)}
           
            
          </ReactScrollToBottom>
          <div className="inputBox">
            <input type="text" id="chatInput" />
            <button onClick={send} className="sendBtn">
             Send
            </button>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Chat
