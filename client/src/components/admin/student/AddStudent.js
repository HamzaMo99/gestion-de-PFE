import React,{useState} from 'react'
import ErrorModal from '../../modals/ErrorModal';
import { Form, Button, Table } from "react-bootstrap";
import Select from "react-select";
import Input from '../../form/Input';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./addStudent.css"


export default function AddStudent() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");


  const [Nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [tel, setTel] = useState("");
  const [matricule, setMatricule] = useState("");
  const [cin, setCin] = useState("");
  const [cne, setCne] = useState("");
  const [genre, setGenre] = useState("");
  const [dateNaissance, setDateNaissance] = useState(new Date());
  const [filieres, setFilieres] = useState([]);
  const [selectedFiliere, setSelectedFiliere ]  = useState("");
  const [selectedOption, setSelectedOption ]  = useState("");
  const [options, setOptions] = useState([]);
  const [AnneeStage, setAnneeStage] = useState("");
  const [email, setEmail] = useState ("");

  const handleChange = (selectedFiliere) => {
    setSelectedFiliere(selectedFiliere);
  };
  const handleChangeOption = (selectedOption) => {
    setSelectedOption(selectedOption);
  };
  
  const addNewStudent = async (event) => {
    // add logic here.
  }
  
  
  const submitButtonStyle = {
    margin: "20px",
    position: "relative",
    width: "200px",
    height: "50px",
  };

  const formStyle = {
    marginTop: "10px",
    marginBottom: "10px",
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
          <div className="col-lg-4">
            <Input
                id="formMatricule"
                label="Matricule"
                type="text"
                placeHolder="Matricule"
                className="text-muted"
                text=""
                value={matricule}
                inputValue={matricule}
                setInput={setMatricule}
            />
        </div>

            <div className="col-lg-4">
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

            <div className="col-lg-4">
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
      
        </div>

        <div className="row">
            <div className="col-lg-4">
              <Input
                id="formCni"
                label="CNI"
                type="text"
                placeHolder="Carte Nationale d'Identité"
                className="text-muted"
                text=""
                value={cin}
                inputValue={cin}
                setInput={setCin} 
             />
            </div>

            <div className="col-lg-4">
              <Input
                id="formCne"
                label="CNE"
                type="text"
                placeHolder="Code national de l'étudiant"
                className="text-muted"
                text=""
                value={cne}
                inputValue={cne}
                setInput={setCne} 
            />
          </div>
      
        <div className="col-lg-4">
            <Input
                id="formTelephone"
                label="Telephone"
                type="text"
                placeHolder="Numero de telephone"
                className="text-muted"
                text=""
                value={tel}
                inputValue={tel}
                setInput={setTel}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <Input
              id="formGenre"
              label="Genre"
              type="text"
              placeHolder="M (Masculin) ou F (Feminin)"
              className="text-muted"
              text=""
              value={genre}
              inputValue={genre}
              setInput={setGenre}
            />
          </div>

          <div className="col-lg-4" style={{ textAlign: "left" }}>
            <label>Filiere</label>

            <Select
              value={selectedFiliere}
              onChange={handleChange}
              options={filieres}
            />
          </div>

          <div className="col-lg-4" style={{ textAlign: "left" }}>
            <label>Options</label>

            <Select
              value={selectedOption}
              onChange={handleChangeOption}
              options={options}
            />
          </div>
        </div>

        <div className="row">
            <div className="col-lg-4">
              <Input
                  id="formAnneeStage"
                  label="Annee de Stage"
                  type="text"
                  placeHolder="Numero de telephone"
                  className="text-muted"
                  text=""
                  value={AnneeStage}
                  inputValue={AnneeStage}
                  setInput={setAnneeStage}
              />
             </div>

             <div className="col-lg-4">
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

          <div className="col-lg-4" style={{ textAlign: "left" }}>
            
              <label>Date de Naissance </label>
            
            <DatePicker
              style={{ width: "inherit"}}
              selected={dateNaissance}
              onChange={(date) => {
                setDateNaissance(date);
              }}
            />
            
          </div>
        </div>

        <Button
          variant="primary"
          type="submit"
          style={submitButtonStyle}
          onClick={addNewStudent}
        >
          Ajouter Etudiant
        </Button>
        </Form>
        </React.Fragment>
  )
}
