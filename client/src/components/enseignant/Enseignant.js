import React from "react";


import Navbar from "../Navbar/Navbar";
import SideBar from "./util/SideBar"
import Stageform  from "./stages/StageForm"
import "./Enseignant.css";
import Homepage from "./stages/Homepage";


function Enseignant (){
    const menu=[{menu:"Homepage",icon:"fa fa-home",to:"/enseignant"},{menu:"Mes stages",icon:"far fa fa-folder-open",to:"/enseignant/stages/mes-stages"}, {menu:"Liste des stages",icon:"fa fa-folder",to:"/enseignant/stages/listes"}]

    return (
        <div className="enseignant">
            <Navbar />
                <div className='row'>
                    <div className="col-sm-2 side_bar">
                        <SideBar menu = {menu}/>
                    </div>
                    <div className="col-sm-10 mb-0 soumission jumbotron">
                    <Homepage/>
                    </div>
            </div>
        </div>
    )

};

export default Enseignant;