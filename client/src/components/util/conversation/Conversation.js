import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router';
import './conversation.css';
import Message from './Messages/Message'
import { connect } from "react-redux";
import {BrowserRouter as Router,Route,Switch} from  'react-router-dom'
import axios from 'axios'


function Conversation(props){

const [message, setmessage] = useState('')
const [chats,setChats] = useState([]);
const [loaded,setLoaded]=useState(false);
const [sent,setSent]=useState(false);



const to = useParams().to;


useEffect(() => {

   {//Get Request
    (async () => { 
      try {
        const response = await fetch('http://localhost:5000/api/conversation/fetchMessages/'+to,
        
        {
          method:'Post',
          headers:{
              'Content-Type' : 'application/json',
              'Accept' : 'application/json'
          
          },
          body:JSON.stringify({
              user:props.userId
          })
      });

          if (response.ok) {
            const data = await response.json();
            // console.log(data.chats) 
            setChats(data.chats)
            setLoaded(true)
        } else {
          console.log('error')
        }
      } catch (error) {
        console.log(error)
      }
       ;
    })()}


},[sent,to]);



async function sendMessage(e){

    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/conversation/send',
      {
          method:'POST',
          headers:{
              'Content-Type' : 'application/json',
              'Accept' : 'application/json'
          
          },
          body:JSON.stringify({
            message:message,
            to:to,
            user:props.userId

          })
      });
      const responseData = await response.json();
  
              setSent(!sent)
              setmessage('')
              
      
        
        } catch (error) {
            console.log(error);
            
        }
  
   }

    
    return(
        <div className="">

            <div className="container-fluid bg-light" id="chat">
            <div className="content d-flex flex-column" id="chat-content">

              {
                loaded ? chats.map(m =>{
                   return(
                    <Message key={m._id} user={m.user==props.userId ? true : false}   message={m.message} time={m.time} />
                   )
                }): ''
              }
                
   

            </div>
            <div className="tools form-row">
                <input onChange={(e)=>{ setmessage(e.target.value) }} value={message} id="newMessage" className="form-control col mr-2" type="text" name="" placeholder="Message"  ></input>

                <button onClick={sendMessage} className="btn btn-primary " type="button">
                <i className="far fa-paper-plane"></i>
                </button>
            </div>
            </div>
  </div>
    )
}


const mapStateToProps = state =>{
  return {
    
    userId: state.userId,
  }
}


export default connect(mapStateToProps,null)(Conversation);  