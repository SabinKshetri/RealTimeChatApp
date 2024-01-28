import React, { useState } from "react";
import "./Join.css";
import { Link } from "react-router-dom";
let user;
const sendUser = () => {
  user = document.getElementById("joinInput").value;
  document.getElementById("joinInput").value="";
 
};
const Join = () => {
  const [name,setName]=useState('')
 
  
  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <h1>GuffGaff</h1>
        <input onChange={(e)=>setName(e.target.value)} type="text" id="joinInput" placeholder="Enter Name" />
        <Link onClick={(event)=>!name?event.preventDefault():null} to="/chat">
          <button className="joinbtn" onClick={sendUser}>
           
            Join
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export {user}

