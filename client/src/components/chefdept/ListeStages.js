import React,{useEffect,useState} from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import {Link} from 'react-router-dom'
import Search from "../util/search/search"
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import './chefdept.css'
import ErrorModal from '../modals/ErrorModal';
import Liste from './Liste.js/Liste'





function ListeStages() {
   
  const [stages,setStages]=useState([]);
  const [loaded,setLoaded]=useState(false);
  
  
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

useEffect(() => {

  axios.get('http://localhost:5000/api/stages')
  .then(function (response) {
   

    setStages(response.data.stages)
    setLoaded(true)
    
  })
  .catch(function (error) {
    
  })

}, [show])

async function validHandler(e){
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5000/api/stages/valider',
    {
        method:'POST',
        headers:{
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        
        },
        body:JSON.stringify({
          stageId:e.target.value
        })
    });
    const responseData = await response.json();

            setError(responseData.message)
            setShow(true);
            
    
      
      } catch (error) {
           setError(error)
            setShow(true);
          
      }


  // axios({
  //   method: 'POST',
  //   url:'http://localhost:5000/api/stages/valider',
  //   headers: {
  //    'Content-Type' : 'application/json',
  //    'Accept' : 'application/json',
  //    'Authorization' : 'Bearer <token_here>'
  //   }, 
  //   data: {
  //     stageId:e.target.value ,
  //   }
 
  //  })
  //  .then(function (response) {
    
  //    // setStages(response.data.stages)
  //    // setLoaded(true)
  //    setError(response.data.message)
  //    setShow(true);
  //  })
  //  .catch(function (error) {
    
  //  })
 }





 async function deleteHandler(e){
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:5000/api/stages/delete',
    {
        method:'DELETE',
        headers:{
            'Content-Type' : 'application/json',
            'Accept' : 'application/json'
        
        },
        body:JSON.stringify({
          stageId:e.target.value
        })
    });
    const responseData = await response.json();

            setError(responseData.message)
            setShow(true);
            
    
      
      } catch (error) {
           setError(error)
            setShow(true);
          
      }

  // axios({
  //  method: 'DELETE',
  //  url:'http://localhost:5000/api/stages/delete',
  //  headers: {
  //   'Content-Type' : 'application/json',
  //   'Accept' : 'application/json',
  //   'Authorization' : 'Bearer <token_here>'
  //  }, 
  //  data: {
  //    stageId:e.target.value ,
  //  }

  // })
  // .then(function (response) {
  //   setError(response.data.message)
  //   setShow(true);
  // })
  // .catch(function (error) {
   
  // })
}




  return (
    <React.Fragment>
    <ErrorModal show={show} setShow={setShow} error={error} titre='' />

    <div className="container chefdept">
      <div className="row header">Liste des Stages</div>
      <div className="row justify-content-end mb-5">
     <div className="col-sm-4">
     <Search/>
     </div>
     </div>
     

      <div className="table">

      { loaded ?
            <Liste
            data={stages}
            pageLimit={3}
            dataLimit={10}
            deleteHandler={deleteHandler}
            validHandler={validHandler}
             />
        :  <Spinner animation="grow" />  }
      </div>
    </div>
    </React.Fragment>
  );
}

export default ListeStages;