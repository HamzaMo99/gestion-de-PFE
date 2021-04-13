import React from "react"
import Navbar from '../Navbar/Navbar'
import SideBar from '../util/SideBar'
import ListeStages from './ListeStages'
import {BrowserRouter as Router,Route,Switch} from  'react-router-dom'
import '../student/student.css'



function ChefDept(){


    const menu=[{menu:"Liste des stages",icon:"fas fa-list",to:"/"},{menu:"Planning PFE",icon:"fas fa-calendar-alt",to:"/chefDept/planning"}]




    return(
        <div className="student">

<Navbar />



<div className='row'>
    <div className="col-sm-2 side_bar">
        <SideBar menu={menu}/>

    </div>
    <div className="col-sm-10 mb-0 soumission jumbotron">

        <Router>
             <Switch>
                 <Route path="/chefdept/1">
                        <div>11111</div>
                 </Route>
                 <Route path="/chefdept/2">
                        <div>222222</div>
                 </Route>

                 <Route path="/chefdept" >
                 <ListeStages/>
                 </Route>



       

        </Switch>

        </Router>
    </div>
</div>

        </div>
    )
}

export default ChefDept;