import React from 'react';
import Navbar from '../Navbar/Navbar'
import Soumission from './soumission/Soumission'
import SideBar from '../util/SideBar'
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom'
import './student.css'
import Conversations from '../util/Conversations/conversation'
import Home from '../util/homepage/HomePage'
function Student() {

    const menu = [{ menu: "Homepage", icon: "fa fa-home", to: "/student" },
    { menu: "Ma Soumission", icon: "far fa-folder-open", to: "/student/soumission" },
    { menu: "Coversations", icon: "fas fa-comments-alt", to: "/student/conversation" }

    ]



    return (

        <div className="student">
            <Navbar />


            <div className='row'>
                <Router>
                    <div className="col-sm-2 side_bar">
                        <SideBar menu={menu} />

                    </div>
                    <div className="col-sm-10 mb-0 soumission jumbotron">
                        <Switch>

                            <Route path="/student/conversation" >
                                <Conversations />
                                {/* <h1>hello</h1>   */}

                            </Route>
                            <Route path="/student/soumission" >
                                <Soumission />
                            </Route>

                            <Route path="/student" >
                                <Home />

                            </Route>
                        </Switch>

                    </div>
                </Router>

            </div>





        </div>
    )
}

export default Student;


