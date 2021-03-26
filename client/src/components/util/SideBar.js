import React from "react";
import "./sidebar.css";
import { NavLink } from 'react-router-dom';

function SideBar() {
  return (
    <div className="sidebar-container">
      <ul className="sidebar-navigation">
        <li>
          <NavLink to="/student"  exact activeClassName="activeSideBar">
            <i className="fa fa-home"  aria-hidden="true"  ></i> Homepage
          </NavLink>
        </li>
        <li>
          <a href="#">
          <i className="far fa-folder-open"></i> Ma Soumission
          </a>
        </li>
        {/* <li>
          <a href="#">
            <i className="fa fa-users" aria-hidden="true"></i> Friends
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-cog" aria-hidden="true"></i> Settings
          </a>
        </li> */}
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
