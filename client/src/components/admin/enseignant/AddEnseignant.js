import React, {useState} from 'react';
import ErrorModal from '../../modals/ErrorModal';
import { Form, Button, Table } from "react-bootstrap";
import Select from "react-select";
import Input from '../../form/Input';

export default function AddEnseignant() {
  
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");


  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [filieres, setFilieres] = useState([]);
  const [selectedFiliere,setSelectedFiliere ] = useState("");
  

  const handleChange = (selectedFiliere) => {
    setSelectedFiliere(selectedFiliere);
  };
 
  
  const AddNewEnseignant = async (event) => {
    // add logic here.
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
              <label>Filiere</label>

              <Select
                value={selectedFiliere}
                onChange={handleChange}
                options={filieres}
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
        </React.Fragment>
  )
}
