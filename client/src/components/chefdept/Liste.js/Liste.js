
import axios from 'axios'

import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import {Link} from 'react-router-dom'
import React, { useState, useEffect } from "react";
export default function Liste({
  data,
  deleteHandler,
  validHandler,
  pageLimit,
  dataLimit
}) {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    setCurrentPage(page => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage(page => page - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
     
     }
    return (
        <div>
        <Table bordered hover >
        <thead className="tableHead">
          <tr>
            <th>Date de soumission</th>
            <th>Sujet</th>
            <th>Etudiants</th>
            <th>Action</th>
          </tr>
        </thead>
       
        <tbody>
    
          {/* show the posts, 10 posts at a time */}
          
            {getPaginatedData().map((x, idx) => {
             
                return(
                    <tr key={x._id}> 
                      
                        <td> <Link  to="/chefdept/1" exact="true" >{x.description} </Link>  </td>
                        <td > <Link  to="/chefdept/2" >{x.dateDebut} </Link> </td>
                        <td ><Link  to="/chefdept/3"  > {x.etudiants.map(e=>{return (<div key={e._id}> {e.nom+" " +e.prenom} </div> )})} </Link></td>
                        <td  className="buttons"> 
                            
                             <Button  onClick={validHandler} type="submit" value={x._id} className="mr-1" variant="success">{ x.signatureDept=="1" ? "invalider" : <i className="fas fa-check"></i> }</Button>
                             <Button   onClick={deleteHandler} type="submit"  value={x._id} variant="danger"><i className="far fa-trash-alt"></i></Button>
                            </td>
                   </tr>)
            })

            }
    
          {/* show the pagiantion
            it consists of next and previous buttons
            along with page numbers, in our case, 5 page
            numbers at a time
        */}
        
          
        </tbody>
         
         </Table>
          <div className="pagination">
            {/* previous button */}
            <button
              onClick={goToPreviousPage}
              className={`prev ${currentPage === 1 ? "disabled" : ""}`}
            >
              prev
            </button>
    
            {/* show page numbers */}
            {getPaginationGroup().map((item, index) => (
              <button
                key={index}
                onClick={changePage}
                className={`paginationItem ${
                  currentPage === item ? "active" : null
                }`}
              >
                <span>{item}</span>
              </button>
            ))}
    
            {/* next button */}
            <button
              onClick={goToNextPage}
              className={`next ${currentPage === pages ? "disabled" : ""}`}
            >
              next
            </button>
          </div>
        </div>
      );
    }
    