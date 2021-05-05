import React from 'react' ;
import	TablePlanning from './TablePlanning' ;
import Button from 'react-bootstrap/Button'
import Search from "../../util/search/search.js";
import './Planning.css' ;
import { Link } from 'react-router-dom';

const Planning = ()=>{
    return <div>
        <h1 className="row header1">Planning PFE</h1>
        <div className="col-sm-4">
     <Search className="search"/>
     </div>  
        <TablePlanning className="table"/>
        <Link to="/chefdept/newPlanning">Ajouter planning</Link>
    </div>
}
export default Planning ;