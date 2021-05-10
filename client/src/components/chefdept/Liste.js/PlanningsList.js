
import axios from 'axios'

import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import {Link} from 'react-router-dom'
import React, { useState, useEffect } from "react";
import pdf from '../../../assets/ELFaddouli_Gestion des PFE.pdf'
import { NavLink } from 'react-router-dom';
export default function Liste({
  data,
  pageLimit,
  dataLimit,
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
        <div  className="content-table">
       <Table bordered hover >
       <thead className="tableHead">
                   <tr>
                       <th>Horaire</th>
                       <th>Jury</th>
                       <th>Sujet</th>
                       <th>Salle</th>

                   </tr>
               </thead>
               <tbody>
                   {
                  
                   getPaginatedData().map((p,index)=>{
                       let jour= p.jour ;
                       let heureDebut = p.heureDebut ;
                       let heureFin = p.heureFin ;
                        let jury = p.jury ;
                        let salle = p.salle[0];
                        let description = p.stageId.description ;

                        return <tr key={p._id}>
                            <td className="horaire"><h3>{jour}</h3><br/> De {heureDebut} A {heureFin}</td>
                            <td>{jury.map(en =>{ 
                                return <li>{en.nom +" "+en.prenom}</li>
                            })}</td>
                            <td>{description}</td>
                            <td>{salle}</td>
                        </tr> 
                   })}
               </tbody>

           </Table>
           </div>
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
    