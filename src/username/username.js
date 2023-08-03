import React, { useState } from 'react';
import { useEffect } from 'react';
function Name() {
  const [email,setEmail] = useState(localStorage.getItem('email'))
  const [fname,setfname] = useState("");
  var x = localStorage.getItem("login");
  if(x==="true"){
  fetch("http://localhost:5000/username", {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email,
    })    
  })

  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    setfname(data.data);
  });
  }
    return (
      <div>
        <h3 style={{ fontFamily: 'serif' }}>Welcome <b style={{ color: ' #1B9C85' }}>{fname}</b></h3> 
      </div>
 
    );
  }

  export default Name;