import React,{useState} from "react"
import Navbar from '../Navbar/Navbar'
import SideBar from '../util/SideBar'
import ListeStages from './ListeStages'
import {BrowserRouter as Router,Route,Switch} from  'react-router-dom'
import '../student/student.css';
import InfoStage from './infoStage/InfoStage'
import Conversation from '../util/conversation/Conversation'


function ChefDept(){


    const menu=[{menu:"Liste des stages",icon:"fas fa-list",to:"/"},{menu:"Planning PFE",icon:"fas fa-calendar-alt",to:"/chefDept/planning"}]



    return(
        <div className="student">

<Navbar />



<div className='row'>
   
    

        <Router>
            <div className="col-sm-2 side_bar">
                <SideBar menu={menu}/>
            </div>
                
        <div className="col-sm-10 mb-0 soumission jumbotron">
             <Switch>

                <Route path="/chefdept/conversation/:to">
                        
                       <Conversation/>
                            
                </Route>

                 <Route path="/chefdept/:stageId">
                        <InfoStage/>
                 </Route>

                 <Route path="/chefdept" >
                    <ListeStages />
                 </Route>
             </Switch>
        </div>

        </Router>
   
</div>

        </div>
    )
}

export default ChefDept;