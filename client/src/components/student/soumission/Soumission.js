import React from 'react'
import {Button} from 'react-bootstrap'
import './soumission.css'
import Table from 'react-bootstrap/Table'
import FormPfe from '../modals/FormPfe'
import FormInfo from '../../form/FormInfo'

function Soumission(){


    return(

        <div className="container soumission-table">
           <div className="row header">
               Ma soumission
           </div>
         

          <FormInfo/>
            
        </div>
    )
}


export default Soumission;