import React,{useEffect,useState} from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import {Link,NavLink} from 'react-router-dom'
import Search from "../util/search/search"
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import './chefdept.css'
import ErrorModal from '../modals/ErrorModal';
<<<<<<< HEAD
import Liste from './Liste.js/Liste'
=======
import { DataGrid } from '@material-ui/data-grid';
import Liste  from './Liste.js/Liste'
>>>>>>> 4d0ae37e836c41f8af3319bdf6bcb73a225c8861




function ListeStages() {
   
  const [stages,setStages]=useState([]);
  const [loaded,setLoaded]=useState(false);
  
  
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [rows, setrows] = useState([]);

<<<<<<< HEAD
useEffect(() => {

  axios.get('http://localhost:5000/api/stages')
  .then(function (response) {
    setStages(response.data.stages)
    setLoaded(true)
    
  })
  .catch(function (error) {
    
  })
=======

>>>>>>> 4d0ae37e836c41f8af3319bdf6bcb73a225c8861


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
}

useEffect(() => {

  axios.get('http://localhost:5000/api/stages')
  .then(function (response) {
   

    // setStages(response.data.stages)

    let t = [];
  
   response.data.stages.map(e=>{
        t.push({ id:e._id,  etudiants: e.etudiants, sujet: e.description, date: e.dateDebut, etat: e.signatureDept == 1 ? "Valide" : "Non Valide",
          genre: e.genre,email: e.email,action:e,pdf:e.docs[0].url })
         })

    setrows(t); 
    
    setLoaded(true)
  })
  .catch(function (error) {
    
  })
}, [show])
const columns = [
  { field: 'etudiants', headerName: 'Etudiants', width: 150,height:150,
  renderCell: (params) => (
    <div>
    {params.value.map(e=>{
   return(  <div>{e.nom + " " + e.prenom}</div>)
  
    })
   }
     </div>
  )},
  { field: 'sujet', headerName: 'Sujet', width: 180,height:250 },
  { field: 'date',headerName: 'Date de soumission',type: 'date',width: 150},
  { field: 'pdf',headerName: 'PDF',width: 100,
  renderCell: (params) => (

    <a href={"http://localhost:5000/"+params.value}> <i className="far fa-file-pdf" style={{fontSize:"32px",color:"red"}}></i>  </a>
  )},
  { field: 'etat',headerName: 'Etat',width: 160},
  { field: 'action',headerName: 'Action',width: 360,
  renderCell: (params) => (
   <div>
    <button  onClick={validHandler} value={params.value._id} className="mr-1 mb-1 btn btn-link border-0 text-decoration-none">{ params.value.signatureDept=="1" ? "invalider" : "Valider" }</button>
    <button   onClick={deleteHandler}  value={params.value._id}  className="btn btn-link border-0 text-decoration-none ">Supprimer</button> 
    <NavLink className="text-decoration-none btn-link" to={"/chefdept/conversation/"+params.value.etudiants[0].cin}  exact   >Envoyer une remarque</NavLink>
   </div>
    
      // <Link
      //   variant="contained"
      //   color="primary"
      //   size="small"
      //   style={{ marginLeft: 16 }}
      //   href={params.value}
      // >
      //   Open
      // </Link>
    )},
];



  return (
    <React.Fragment>
    <ErrorModal show={show} setShow={setShow} error={error} titre='' />

    <div className="container chefdept">
      <div className="row header">Liste des Stages</div>
      <div className="row justify-content-end mb-5">
     {/* <div className="col-sm-4">
     <Search/>
     </div> */}


     </div>
     

      <div className="table">

<<<<<<< HEAD
      { loaded ?
            <Liste
          
=======

      <div className="bg-white" style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>

      {/* { loaded ?
            <Liste          
>>>>>>> 4d0ae37e836c41f8af3319bdf6bcb73a225c8861
            data={stages}
            pageLimit={3}
            dataLimit={10}
            deleteHandler={deleteHandler}
            validHandler={validHandler}
             />
        :  <Spinner animation="grow" />  } */}
      
      </div>
    </div>
    </React.Fragment>
  );
}

export default ListeStages;
