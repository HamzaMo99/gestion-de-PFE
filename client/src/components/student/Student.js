import React from 'react';
import Navbar from '../Navbar/Navbar'
import Soumission from './soumission/Soumission'
import SideBar from '../util/SideBar'
import './student.css'
function Student() {

    const menu=[{menu:"Homepage",icon:"fa fa-home",to:"/student"},{menu:"Ma Soumission",icon:"far fa-folder-open",to:"/student/soumission"}]



    return (

        <div className="student">
            <Navbar />



                <div className='row'>
                    <div className="col-sm-2 side_bar">
                        <SideBar menu={menu}/>

                    </div>
                    <div className="col-sm-10 mb-0 soumission jumbotron">

                        <Soumission/>
                    </div>
            </div>

        </div>
    )
}

export default Student;


