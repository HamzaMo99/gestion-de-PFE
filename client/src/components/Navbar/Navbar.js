import React from 'react';
 import './navbar.css'
import { NavLink } from 'react-router-dom';
import mainLogo from'../../assets/images/logo1.png';
function Navbar(){




    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <NavLink className="navbar-brand" to="/"> <img src={mainLogo} width="70" height="40" alt="" ></img> </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
 
          </ul>
          <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink  className="nav-link" to="#"  exact activeClassName="selectedOption"  ><i className="far fa-bell"></i></NavLink>
                </li>


               
                <li className="nav-item">
                      <NavLink  className="nav-link" to="#"   exact activeClassName="selectedOption avatar "   > <img src="http://placehold.it/64x64"  width='33' height='33' className="float-left userImage rounded-circle"></img>   Hamza Moukrim</NavLink>
                </li>
                



            </ul>

        </div>
      </nav>
    )
}




export default  Navbar;


/*
 <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <NavLink className="navbar-brand" to="/"> EMI </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
 
          </ul>
          <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink  className="nav-link" to="#"  exact activeClassName="selectedOption"  ><i class="far fa-bell"></i></NavLink>
                </li>


               
                <li className="nav-item">
                      <NavLink  className="nav-link" to="#"   exact activeClassName="selectedOption avatar "   > <img src="http://placehold.it/64x64"  width='33' height='33' class="float-left userImage rounded-circle"></img>   Hamza Moukrim</NavLink>
                </li>
                



            </ul>

        </div>
*/