import React from 'react'
import {Button} from 'react-bootstrap'
import './homepage.css'
import Table from 'react-bootstrap/Table'
//import FormPfe from '../modals/FormPfe'
import ListeDeStages from './ListeDeStages'

function Homepage(){
    return(
        <React.Fragment>
        <div className='containerEnseignant'>
            <form className='modelEnseignant'>
              
                        <h1 className ="title">Bienvenue dans l'espace de gestion des PFE</h1> 
                        
 
                                    <h6 className="text-muted"></h6> 
                                    <ul className ="list-group">
                                        <li className ="list-group-item d-flex justify-content-between align-items-center">
                                            Les stages à encadrer
                                        <span className ="badge badge-primary badge-pill">3</span>
                                        </li>
                                        <li className  ="list-group-item d-flex justify-content-between align-items-center">
                                            Les stages de cette année
                                        <span className = "badge badge-primary badge-pill">14</span>
                                        </li>
                                        
                                    </ul>
                                
                            

                   
                <div className ="flex-row">
                
            
                </div>

            </form>


        </div>

        </React.Fragment> 

    )
}


export default Homepage;