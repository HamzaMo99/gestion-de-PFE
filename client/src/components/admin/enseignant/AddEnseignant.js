import React, {useState, useEffect} from 'react';
import ErrorModal from '../../modals/ErrorModal';
import { Form, Button, Table } from "react-bootstrap";
import Select from "react-select";
import Input from '../../form/Input';
import * as XLSX from "xlsx";
import axios from 'axios'
import { DataGrid } from '@material-ui/data-grid';


export default function AddEnseignant() {
  
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [items, setItems] = useState([]);
  const [add, setAdd] = useState(true);
  const [email, setEmail] = useState ("");


  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [filieres, setFiliere] = useState([]);
  const [selectedFiliere,setSelectedFiliere ] = useState("");
  const [fil, setFil] = useState([]);
  const [addManually, setAddManually] = useState(true);
  const[rows, setRows] = useState([]);
  

  const handleChange = (selectedFiliere) => {
    setSelectedFiliere(selectedFiliere);
    setAdd(false)
  };
 
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/filieres")
      .then(function (response) {
        let t = [];
        setFil(response.data.filieres)
        response.data.filieres.map((x) => {
          t.push({ value: x._id, label: x.nomFiliere });
        }) 
        
        setFiliere(t);
      })
      .catch(function (error) {});
  }, [filieres]);

  // gridtable colums and rows 
  
  const columns = [
    { field: 'id', headerName: 'Nom', width: 150 },
    { field: 'prenom', headerName: 'Prenom', width: 150 },
    { field: 'email',headerName: 'EMAIL',width: 190}
    ]


  const AddNewEnseignant = async (event) => {
    event.preventDefault();

  }
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };

  let t = [];
   items.map(item =>{
    
    t.push({ id : item.nom, prenom : item.prenom,email : item.email})
  })
  console.log(t);

  // onClick Add Manually an instructor will show 

  const handleAddEnseignant = () =>{
    setAdd(true);
    setAddManually(false);
  }
  
  
  const submitButtonStyle = {
    margin: "30px",
    position: "absolute",
    left: "100px",
    buttom: "1px",
    width: "200px",
    height: "50px"

  };

  const formStyle = {
    marginTop: "10px",
    marginBottom: "160px",
    paddingTop: "10px",
  };
  return (
    <React.Fragment>
      <ErrorModal
        show={show}
        setShow={setShow}
        error={error}
        titre=""
        error2={error2}
      />

      <div className="row">
         <div className="col-lg-4 mb-5">
            <label >Choisir la filiere et l'option  de l'enseignant </label>
         </div>
         
         <div className="col-lg-4">
          <Select
              value={selectedFiliere}
              onChange={handleChange}
              options={filieres}
              placeholder = "filiere"
            />
          </div> 
        </div>

        {add ? "" :
     <div className="row">
        <div className="col-lg-6">
            <button type="button" class="btn  btn-primary add-new" onClick = {handleAddEnseignant}><i className="fa fa-plus"></i> Ajouter Nouveau Enseignant</button>
        </div> 
        {/* <div className="col-lg-6">
            <button type="button" className="btn btn-info add-new"><i className="fa fa-arrow-down-square-fill"></i> Importer un Fichier Excel</button>
        </div> */}
        <div className="col-lg-6">
          {/*<span className="file-input btn btn-primary btn-file"><i className="fa fa-file-excel-o"></i> 
              Importer<br/><input type="file" multiple onChange={(e) => {
                const file = e.target.files[0];
                readExcel(file);
              }}/>
         </span> */}
         <span className="file-input btn btn-primary btn-file"><i className="fa fa-file-excel-o"></i> 
              Importer<br/>
         <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              readExcel(file);
          }}
          
          />
        </span> 
        </div>
      
     </div>
     
    }

    {/* showing the the table */}
    <div className="bg-white" style={{ height: 400, width: '100%' }}>
          <DataGrid rows={t} columns={columns} pageSize={5} checkboxSelection />
    </div>


      { addManually ? "" : 
       <Form style={formStyle}>
         <div className="row">
        

          <div className="col-lg-6">
            <Input
              id="formNom"
              label="Nom"
              type="text"
              placeHolder="Nom"
              className="text-muted"
              text=""
              value={Nom}
              inputValue={Nom}
              setInput={setNom} 
           />
          </div>
      </div>

      <div className="col-lg-6">
            <Input
              id="formPrenom"
              label="Prénom"
              type="text"
              placeHolder="Prénom"
              className="text-muted"
              text=""
              value={Prenom}
              inputValue={Prenom}
              setInput={setPrenom} 
          />
        </div>


        <div className="row">
          <div className="col-lg-6" style={{ textAlign: "left" }}>
          <Input
          id="formEmail"
          label="Email"
          type="email"
          placeHolder="test@gmail.com"
          className="text-muted"
          value={email}
          inputValue={email}
          setInput={setEmail}
        />
          </div>
        </div>
       <br/>
      <Button
        variant="primary"
        type="submit"
        style={submitButtonStyle}
        onClick={AddNewEnseignant}
      >
        Ajouter Chef de dept
      </Button>
      </Form> 
    
      }
        </React.Fragment>
  )
}
