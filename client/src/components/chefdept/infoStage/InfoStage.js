import React, { useState,useEffect } from "react";
import Info from './Info'
import { Form, Col, ButtonGroup,Button} from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router';
import Spinner from 'react-bootstrap/Spinner';
import './InfoStage.css'
import ErrorModal from '../../modals/ErrorModal';
import { withRouter } from 'react-router';

const InfoStage = (props) => {


    const formStyle = {
        width: "100%",
        padding: "10px",
        backgroundColor: "white",
        position: "relative",
        marginTop: "10px",
        marginBottom: "10px",
        paddingTop: "10px",
    };


//traitement backend : 

    
    // user info 
    const [userInfo,setUserInfo] = useState();
  
    // stage info
    const [stageInfo,setStageInfo] = useState('');


    const [loadesUsers,setLoadedUsers] = useState() ;
    const [loaded,setLoaded]=useState(false);
    const [show, setShow] = useState(false);
    const [error, setError] = useState("");

    const stageId= useParams().stageId;







    useEffect(() => {
        axios({
      url: 'http://localhost:5000/api/stages/stageInfo/'+stageId,
      method: 'Get',
      headers: { "Content-Type": "application/json"},

     })
   .then(response => {
  

       setStageInfo(response.data.stageInfo)
       setUserInfo(response.data.students)
       setLoaded(true)
       
   }) 
   .catch(err => {
      console.log(err);
   })
  
  },[]);




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
            stageId:stageId
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
  

   async function deleteHandler(){
    props.history.push("/chefdept");
    }




      if(!loaded){
          return(  <div>

          <Spinner animation="grow" variant="danger" />
        </div>  )
      }
      
      
      else{

        return (

            <React.Fragment>
            <ErrorModal show={show} setShow={setShow} error={error} titre='' />
        
      


            <div className="stageInfo" style={formStyle}>
                    <div className="row header">
                        Information de stage
                    </div>
               
    
    
                <Form >

                    { 

                    userInfo.map( (s,index) =>{

                    
                 return(
                <form>

                 <fieldset>

                     {
                         userInfo.length>1 ? <legend>Etudiant {index+1} :</legend> : <legend>Etudiant :</legend>
                     }

                  
                  
                    <div className="row" >
                        <div className="col-md-6">
                            <Info
                                controlId="FormNom"
                                type="text"
                                label="Nom"
                                value={s.nom}
                            />
                            </div>
                            <div className="col-md-6">
                            <Info
                                controlId="FormPrenom"
                                type="text"
                                label="Prenom"
                                value={s.prenom}
                            />
                        </div>
                    </div>
                            
                    <div className="row" >
                        <div className="col-md-6">

                            <Info
                                controlId="FormCIN"
                                type="text"
                                label="CIN"
                                value={s.cin}
                            />
                            </div>
                            <div className="col-md-6">
                            <Info
                                controlId="FormDateNaissance"
                                type="text"
                                label="Date de naissance"
                                value={s.dateNaissance}
                            />
                            </div>
                        </div> 

                        <div className="row" >
                          <div className="col-md-6">
                            <Info
                                controlId="FormAnnee"
                                type="text"
                                label="Année"
                                value="2021"
                            />
                            </div>
                            <div className="col-md-6">
                            <Info
                                controlId="FormTelephone"
                                type="Tel"
                                label="Telephone"
                                value={s.tel}
                            />
                            </div>
                        </div>

                        <div className="row" >
                          <div className="col-md-6">

                            <Info
                                controlId="FormEmail"
                                type="Email"
                                label="Email"
                                value={s.email}
                            />

                            </div>

                            <div className="col-md-6">
                            <Info
                                controlId="FormFiliere"
                                type="text"
                                label="Filière"
                                value="Informatique"
                            />

                            </div>
                           </div>

                           <div className="row" >
                          <div className="col-md-6">
                         
                            <Info
                                controlId="FormCNE"
                                type="text"
                                label="CNE"
                                value={s.cne}
                            />
                            </div>
                            <div className="col-md-6">
                            <Info
                                controlId="FormGenre"
                                type="text"
                                label="Genre"
                                value={s.genre}
                            />
                            </div>
                        </div>


                </fieldset>  
                </form>
                 )

                  })

                    }



                    <fieldset>
                    <legend>Stage :</legend>

                        <div className="row" >
                        <div className="col-md-12 mt-3">
                        <Info
                                controlId="FormTitreStage"
                                type="text"
                                label="Titre de Stage"
                                value={stageInfo.description}
                            />
                        </div>
                        </div>    


                        <div className="row" >
                        <div className="col-md-6">
    
                             <Info
                                controlId="FormDateDebut"
                                type="date"
                                label="Date de debut"
                                value={stageInfo.dateDebut}
                            />                           
                            </div>

                            <div className="col-md-6">

                                <Info
                                controlId="FormDateFin"
                                type="text"
                                label="Date de fin"
                                value={stageInfo.dateFin}
                            />

                            </div>
                            </div>

                        <div className="row" >
                          <div className="col-md-6">
    

                              <Info
                                controlId="FormOrganismeAcceuil"
                                type="text"
                                label="Organisme d'acceuil"
                                value={stageInfo.organismeAceuil}
                            />
                            </div>

                            <div className="col-md-6">
                            <Info
                                controlId="FormPosteDeRepresentant"
                                type="text"
                                label="Poste De Representant"
                                value={stageInfo.posteRepresentant}
                            />
                            </div>
                            </div>

                        <div className="row" >
                          <div className="col-md-6">
                            <Info
                                controlId="FormEncadrantInterne"
                                type="text"
                                label="Encadrant interne"
                                value="encadrant interne"
                            />
                            </div>
                            <div className="col-md-6">
                            <Info
                                controlId="FormEncadrantExterne"
                                type="text"
                                label="Encadrant externe"
                                value={stageInfo.encadrantExterne}
                            />
                            </div>
                        </div>

                        <div className="row" >
                          <div className="col-md-6">
                          <Info
                                controlId="FormPaysStage"
                                type="text"
                                label="Pays de stage"
                                value={stageInfo.paysStage}
                            />
                            </div>
                        <div className="col-md-6">

                            <Info
                                controlId="FormVilleStage"
                                type="text"
                                label="Ville de stage"
                                value={stageInfo.villeStage}
                            />
                        </div>
                        </div>
                </fieldset>
                     



    

    
                </Form>

           
               
                <button onClick={validHandler } className="btn btn-primary btn-lg mr-5 px-5" >Valider</button>

                <button onClick={deleteHandler} className="btn btn-primary btn-lg px-5" >Retour</button>
                
    
            </div>
    
    
            </React.Fragment>
        )
            
    }
}

    


export default InfoStage;


