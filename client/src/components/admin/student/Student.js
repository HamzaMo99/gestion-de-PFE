import React, { useState, useEffect, Fragment } from "react";
import Select from "react-select";
import { DataGrid } from '@material-ui/data-grid';
import axios from "axios";
import {Link} from 'react-router-dom'


export default function Student() {

  const [selectedFiliere, setSelectedFiliere] = useState("");

  const [filieres, setFiliere] = useState([]);

  const [loaded, setloaded] = useState(false)

  const columns = [
    { field: 'id', headerName: 'CNE', width: 150 },
    { field: 'firstName', headerName: 'PRENOM', width: 150 },
    { field: 'lastName', headerName: 'NOM', width: 150 },
    { field: 'dateNaissance',headerName: 'DATE DE NAISSANCE',type: 'date',width: 150},
    { field: 'genre',headerName: 'Genre',width: 120},
    { field: 'email',headerName: 'EMAIL',width: 160},
    { field: 'option',headerName: 'Option',width: 160,
    renderCell: (params) => (
  
        <a
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          href={params.value}
        >
          Open
        </a>
      )},
  ];
    
    const [rows, setrows] = useState([]);
  // const rows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 14 },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  // ];

  const handleChange = (selectedFiliere) => {
    console.log(selectedFiliere)
    setSelectedFiliere(selectedFiliere);
  };
  

    //getting filieres

    useEffect(() => {
      axios
        .get("http://localhost:5000/api/filieres")
        .then(function (response) {
          let t = [],r=[];
  
          response.data.filieres.map((x) => {
            t.push({ value: x._id, label: x.nomFiliere });
          });
          setFiliere(t);

          // setrows(r)
        })
        .catch(function (error) {});
    }, []);

  // get students
    useEffect(() => {
      axios
        .get("http://localhost:5000/api/filieres/"+selectedFiliere.value)
        .then(function (response) {
          let t = [];
  

          response.data.students.map(e=>{
              t.push({  id: e.cne, lastName: e.prenom, firstName: e.prenom, dateNaissance: e.dateNaissance,
                genre: e.genre,email: e.email,option:"cc" })
               })
      
          setrows(t);

          // setrows(r)
        })
        .catch(function (error) {});
    }, [selectedFiliere]);
  

  return (
    <div className="">
    <div className="row">
         <div className="col-lg-8 mb-5">
         <Select
              value={selectedFiliere}
              onChange={handleChange}
              options={filieres}
            />
          </div>

              <div class="col-sm-4">
                <Link to='/admin/etudiants/add'>
                    <button type="button" class="btn btn-info add-new"><i class="fa fa-plus"></i> Ajouter Nouveau Etudiant</button>
                </Link>
                  
              </div>
    </div>

    
    <div className="bg-white" style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>

    </div>
  )
}
