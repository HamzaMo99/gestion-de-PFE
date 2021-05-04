import React from 'react'
import {Button} from 'react-bootstrap'
import './stageform.css'
import Table from 'react-bootstrap/Table'
//import FormPfe from '../modals/FormPfe'
import ListeDesStages from './ListeDesStages';
import Navbar from "../../Navbar/Navbar";
import SideBar from "../util/SideBar";

function MesStages(){
 
    const menu=[{menu:"Homepage",icon:"fa fa-home",to:"/enseignant"},{menu:"Mes stages",icon:"far fa fa-folder-open",to:"/enseignant/stages/mes-stages"}, {menu:"Liste des stages",icon:"fa fa-folder",to:"/enseignant/stages/listes"}]

    return(

        <div className="container soumission-table">
            <ListeDesStages/>

        </div>
                   
        
    )
}


export default MesStages;