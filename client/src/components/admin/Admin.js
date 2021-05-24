import React,{useState} from "react"
import Navbar from '../Navbar/Navbar'

import {BrowserRouter as Router,Route,Switch} from  'react-router-dom'
import SideBar from "../util/SideBar"
import Student from "./student/Student"



function Admin(){


    const menu=[{menu:"Homepage",icon:"fa fa-home",to:"/admin"},
               {menu:"Chefs de departement",icon:"fa fas fa-user-shield",to:"/admin/chefs-de-departement"},
               {menu:"Enseignants",icon:"fa fas fa-chalkboard-teacher",to:"/admin/enseigants"},
               {menu:"Etudiants",icon:"fa fas fa-user-graduate",to:"/admin/etudiants"}
            
            ]



    return(
        <div>
            <header>
                <div><Navbar />s</div>
            </header>

            <div className='row'>

                <Router>
                    <div className="col-sm-2 side_bar">
                        <SideBar menu={menu} />

                    </div>
                    <div className="col-sm-10 mb-0 soumission jumbotron">
                            <Switch>
                                <Route path="/admin/etudiants" >
                                    <Student/>
                                </Route>
                            </Switch>

                    </div>
                
           </Router>

     </div> 
     </div> 

    )

    
}

export default Admin;