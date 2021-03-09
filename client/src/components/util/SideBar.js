import React from "react";
import "./sidebar.css";

function SideBar() {
  return (
    <div className="sidebar-container">
      <ul className="sidebar-navigation">
        <li>
          <a href="#">
            <i className="fa fa-home" aria-hidden="true"></i> Homepage
          </a>
        </li>
        <li>
          <a href="#">
          <i className="far fa-folder-open"></i> Mes Soumissions
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
