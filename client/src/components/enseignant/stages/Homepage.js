import React from 'react'
import {Button} from 'react-bootstrap'
import './homepage.css'
import Table from 'react-bootstrap/Table'
//import FormPfe from '../modals/FormPfe'
import ListeDeStages from './ListeDeStages'

function Homepage(){
    return(
        <React.Fragment>
        <div className='container'>
            <form className='model'>
              
                        <h1 className ="title">Bienvenue dans l'espace de gestion des PFE</h1> 
                        <div class="container">
 
                                <div class="col-12 col-md-5">
                                    <h6 class="text-muted"></h6> 
                                    <ul class="list-group">
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            Les stages à encadrer
                                        <span class="badge badge-primary badge-pill">3</span>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            Les stages de cette année
                                        <span class="badge badge-primary badge-pill">14</span>
                                        </li>
                                        
                                    </ul>
                                    </div>
                            </div>

                   
                <div className="flex-row">
                
            
                </div>

            </form>


        </div>

        </React.Fragment> 

    )
}


export default Homepage;