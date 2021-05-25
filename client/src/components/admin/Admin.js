import React,{useState} from "react"
import Navbar from '../Navbar/Navbar'

import {BrowserRouter as Router,Route,Switch} from  'react-router-dom'
import SideBar from "../util/SideBar"
import Student from "./student/Student"
import AddStudent from "./student/AddStudent"
import AddChefDept from "./chefDept/AddChefDept"
import ChefDept from './chefDept/ChefDept'
import Enseignant from "./enseignant/Enseignant"
import AddEnseignant from "./enseignant/AddEnseignant"



function Admin(){


    const menu=[{menu:"Homepage",icon:"fa fa-home",to:"/admin"},
               {menu:"Chefs de dept",icon:"fa fas fa-user-shield",to:"/admin/chefDept"},
               {menu:"Enseignants",icon:"fa fas fa-chalkboard-teacher",to:"/admin/enseigants"},
               {menu:"Etudiants",icon:"fa fas fa-user-graduate",to:"/admin/etudiants"},
               {menu:"Add Etudiants",icon:"fa fas fa-user-graduate",to:"/admin/etudiants/add"},
               {menu:"Add Chef dept",icon:"fa fas fa-user-graduate",to:"/admin/chefDept/add"},
               {menu:"Add Enseignant",icon:"fa fas fa-user-graduate",to:"/admin/enseignant/add"}
            
            ]



    return(
        <div className="student">
            
            <Navbar/>
            

            <div className='row'>

                <Router>
                    <div className="col-sm-2 side_bar">
                        <SideBar menu={menu} />

                    </div>
                    <div className="col-sm-10 mb-0 soumission jumbotron">
                            <Switch>
                                <Route exact path="/admin/etudiants" >
                                    <Student/>
                                </Route>

                               <Route exact path="/admin/chefDept" >
                                    <ChefDept/>
                                </Route>

                                <Route  path="/admin/etudiants/add" >
                                    <AddStudent/>
                                </Route>

                                <Route  path="/admin/chefDept/add" >
                                    <AddChefDept/>
                                </Route>

                                <Route  exact path="/admin/enseignant" >
                                    <Enseignant/>
                                </Route>

                                <Route  path="/admin/enseignant/add" >
                                    <AddEnseignant/>
                                </Route>

                                
                            </Switch>


                    </div>
                
           </Router>

     </div> 
     </div> 

    )

    
}

export default Admin;