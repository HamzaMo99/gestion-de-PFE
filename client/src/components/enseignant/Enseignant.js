import React from "react";


import Navbar from "../Navbar/Navbar";
import SideBar from "./util/SideBar"
import Stageform  from "./stages/MesStages"
import "./Enseignant.css";
import '../student/student.css'
import Homepage from "./stages/Homepage";
import {BrowserRouter as Router,Route,Switch,withRouter} from  'react-router-dom';
import Conversations from '../util/Conversations/conversation'
import MesStages from './stages/MesStages';
import ListeStagesEns from "./stages/stageListe/ListeStagesEns";
import Conversation from "../util/conversation/Conversation";




function Enseignant (){
    const menu=[{menu:"Homepage",icon:"fa fa-home",to:"/enseignant"},
                {menu:"Mes stages",icon:"far fa fa-folder-open",to:"/enseignant/stages/mes-stages"}, 
                {menu:"Liste des stages",icon:"fa fa-folder",to:"/enseignant/stages/listes"}, 
                {menu:"Coversations",icon:"fas fa-comments-alt",to:"/enseignant/conversation"}]

    return (
        // <div className="enseignant">
        //     <Navbar />
        //         <div className='row'>
        //             <div className="col-sm-2 side_bar">
        //                 <SideBar menu = {menu}/>
        //             </div>
        //             <div className="col-sm-10 mb-0 soumission jumbotron">
        //             <Homepage/>
        //             </div>
        //     </div>
        // </div>
        

       <div className="student">
                 <Navbar />

                 <div className='row'>
     
        <Router>
                   <div className="col-sm-2 side_bar">  
                        <SideBar menu={menu}/>

                    </div>
                        <div className="col-sm-10 mb-0 soumission jumbotron">
                <Switch>
                
                        <Route path="/enseignant/conversation/:to">     
                            <Conversation/>
                        </Route>

                        <Route path="/enseignant/conversation" > 
                          <Conversations role = {"enseignant"}/>     
                           
                        </Route>

                        
 
                        <Route path = '/enseignant/stages/mes-stages'>
                                <MesStages/>
                        </Route>

                        <Route path = '/enseignant/stages/mes-stages'>
                                <MesStages/>
                        </Route>

                        <Route path = '/enseignant/stages/listes'>
                                <ListeStagesEns/>
                        </Route>


                        {/* 
                        <Route path="/student/soumission" >
                           <Soumission />  
                        </Route>
                        */}
                        <Route path="/enseignant">
                            <Homepage/>
                        </Route>
                       

                
                  </Switch>
            </div>
                
             </Router>
           </div>

           </div>
    )

};

export default Enseignant;