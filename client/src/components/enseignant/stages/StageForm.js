import React from 'react'
import {Button} from 'react-bootstrap'
import './stageform.css'
import Table from 'react-bootstrap/Table'
//import FormPfe from '../modals/FormPfe'
import ListeDeStages from './ListeDeStages'

function StageForm(){


    return(
        <div className="container soumission-table">
           <div className ="center" >
               les stage à encadrer
           </div>

          <ListeDeStages/>
            
        </div>
    )
}


export default StageForm;