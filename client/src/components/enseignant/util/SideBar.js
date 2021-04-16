import React from "react";
import "./sideBar.css";
import { NavLink } from 'react-router-dom';

function SideBar() {
  return (
    <div className="sidebar-container"> 
      <ul className="sidebar-navigation">
        <li>
          <NavLink to="/enseignant"  exact activeClassName="activeSideBar">
            <i className="fa fa-home"  aria-hidden="true"  ></i> Homepage
          </NavLink>
        </li>
        <li>
          <a href="#">
          <i className="fa fa-folder-open" aria-hidden="true"></i> Stages choisis
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-info-circle" aria-hidden="true"></i> Information
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
