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
           {/* <div className="newSubmission">
           <Button variant="success" >Modifier Soumission</Button>
            </div> */}

          <FormInfo/>
            {/* <div className="table">
               
            <Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>Sujet</th>
      <th>Date de soumission</th>
      <th>First Name</th>
      <th>Last Name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>gestion de pfe</td>
      <td>07/03/2021</td>
      <td>hamza</td>
      <td>moukrim</td>
    </tr>
  </tbody>
</Table> */}
            {/* </div> */}


        </div>
    )
}


export default Soumission;