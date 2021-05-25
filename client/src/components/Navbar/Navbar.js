import React from 'react';
 import './navbar.css'
import { NavLink } from 'react-router-dom';
import mainLogo from'../../assets/images/logo1.png';
import {BrowserRouter as Router} from  'react-router-dom'
import * as actionTypes from '../store/reducers/actions' ;
import { connect } from "react-redux";
function Navbar(props){



  function onLogout(){

    props.onLogOut()
  }
  


    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light " id='mainNav'>
        <Router>
        <NavLink className="navbar-brand" to="/"> <img src={mainLogo} width="70" height="40" alt="" ></img> Gestion de PFE</NavLink>
        <button className="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            
          Menu
         <i className="fas fa-bars"></i>
             
        </button>
      
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
 
          </ul>
          <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink  className="nav-link" to="#"  exact activeClassName="selectedOption"  ><i className="far fa-bell"></i></NavLink>
                </li>


               
                {/* <li className="nav-item">
                      <NavLink  className="nav-link" to="#"   exact activeClassName="selectedOption avatar "   > <img src="http://placehold.it/64x64"  width='33' height='33' className="float-left userImage rounded-circle"></img>{props.userInfo.nom +" " +props.userInfo.prenom }</NavLink>
                </li> */}

              <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {props.userInfo.nom +" " +props.userInfo.prenom } <i className="fas fa-user"></i>
                      </a>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <button onClick={onLogout} className="dropdown-item" > Deconnecte </button>
        
                      </div>
                </li>


            </ul>

        </div>
        </Router>
      </nav>
    )
}



const mapStateToProps = (state) => {
  return {
    isLoged: state.isLoged,
    userInfo: state.userInfo,
    userId: state.userId,
  };
};

const mapDispatchToProps =(dispatch) =>{
  return{
      onLogOut:()=> dispatch({type:actionTypes.LOGOUT})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);


