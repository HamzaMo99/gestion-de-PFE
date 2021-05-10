import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from 'react-router-dom'
import Search from "../util/search/search"
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner'
import ErrorModal from '../modals/ErrorModal';
import PlanningsList from "./Liste.js/PlanningsList";





function ListePlannings() {

  const [plannings, setPlannings] = useState([]);
  const [loaded, setLoaded] = useState(false);


  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {

    axios.get('http://localhost:5000/api/planning')
      .then(function (response) {


        setPlannings(response.data.plannings)
        setLoaded(true)
        console.log(response.data.plannings);

      })
      .catch(function (error) {

      })

  }, [show])

  async function validHandler(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/stages/valider',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'

          },
          body: JSON.stringify({
            stageId: e.target.value
          })
        });
      const responseData = await response.json();

      setError(responseData.message)
      setShow(true);



    } catch (error) {
      setError(error)
      setShow(true);

    }

  }





  async function deleteHandler(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/stages/delete',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'

          },
          body: JSON.stringify({
            stageId: e.target.value
          })
        });
      const responseData = await response.json();

      setError(responseData.message)
      setShow(true);



    } catch (error) {
      setError(error)
      setShow(true);

    }
  }




  return (
    <React.Fragment>
      <ErrorModal show={show} setShow={setShow} error={error} titre='' />

      <div className="container chefdept">
      <div className="row header">Liste des Plannings</div>
      <div className="row justify-content-end mb-5">
     <div className="col-sm-4">
            <Search />
          </div>
        </div>


        <div className="table">

          {loaded ?
            <PlanningsList
              data={plannings}
              pageLimit={3}
              dataLimit={10}
            />
            : <Spinner animation="grow" />}
        </div>
        <button><Link to="/chefdept/newPlanning">Ajouter Planning</Link></button>
      </div>
    </React.Fragment>
  );
}
export default ListePlannings;
