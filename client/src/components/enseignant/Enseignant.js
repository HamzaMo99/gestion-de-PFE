import React from "react";


import Navbar from "../Navbar/Navbar";
import SideBar from "./util/SideBar"
import Stageform  from "./stages/StageForm"
import "./Enseignant.css";


function Enseignant (){
    return (
        <div className="enseignant">
            <Navbar />
                <div className='row'>
                    <div className="col-sm-2 side_bar">
                        <SideBar/>
                    </div>
                    <div className="col-sm-10 mb-0 soumission jumbotron">
                    <Stageform/>
                    </div>
            </div>
        </div>
    )

};

export default Enseignant;