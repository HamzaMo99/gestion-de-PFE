import { Form, Button } from "react-bootstrap";
import Input from "./Input";
const FormInfo = (props) => {
  const formStyle = {
    marginLeft: 250,
    marginRight: 350,
    border: "solid 1px",
    boxShadow: "2px 2px",
    marginTop: "20px",
    marginBottom: "100px",
    paddingTop: "20px"
  }
  const submitButtonStyle={
    margin  : "20px",
    position : "relative",
    left : "250px",
    width : "200px" ,
    height : "50px"
  }
  return (
    <Form style={formStyle}>
      <Input
        id="formMatricule"
        label="Matricule"
        type="text"
        placeHolder="125875"
        className="text-muted"
        text=""
        readonly="true"
      />
      <Input
        id="formNom"
        label="Nom"
        type="text"
        placeHolder="sdkfkf"
        className="text-muted"
        text=""
        readonly="true"
      />
      <Input
        id="formPrenom"
        label="Prenom"
        type="text"
        placeHolder="sdjfksldf"
        className="text-muted"
        text=""
        readonly="true"
      />

      <Input
        id="formCIN"
        label="CIN"
        type="text"
        placeHolder="245866"
        className="text-muted"
        text=""
        readonly="true"
      />
      <Input
        id="formCNE"
        label="CNE"
        type="text"
        placeHolder="D5525588"
        className="text-muted"
        text=""
        readonly="true"

      />
      <Input
        id="formDateNaissance"
        label="Date de Naissance"
        type="text"
        placeHolder="10/05/1985"
        className="text-muted"
        text=""
        readonly="true"

      />
      <Input
        id="formGenre"
        label="Genre"
        type="text"
        placeHolder="M"
        className="text-muted"
        text=""
        readonly="true"

      />
      <Input
        id="formTelephone"
        label="Telephone"
        type="text"
        placeHolder="0652485514"
        className="text-muted"
        text=""

      />
      <Input
        id="formEmail"
        label="Email"
        type="email"
        placeHolder="test@gmail.com"
        className="text-muted"

      />
      <Input
        id="formAnnee"
        label="Année"
        type="text"
        placeHolder="Troisième année"
        className="text-muted"

      />

      <Input
        id="formFiliere"
        label="Filiere"
        type="text"
        placeHolder="Génie informatique"
        className="text-muted"

      />
      <Input
        id="formOrganismeAcceuil"
        label="ORGANISME D'ACCEUIL"
        type="text"
        placeHolder="Banque Centrale Populaire"
        className="text-muted"

      />
      <Input
        id="formPostDuRepresentant"
        label="POSTE DU REPRESENTANT"
        type="text"
        placeHolder="Chef de Projet Senior SI"
        className="text-muted"

      />
      <Input
        id="formEncadrantExterne"
        label="ENCADRANT EXTERNE"
        type="text"
        placeHolder="XXXX YYYY"
        className="text-muted"

      />

      <Input
        id="formEncadrantInterne"
        label="ENCADRANT INTERNE"
        type="text"
        placeHolder="XXXX YYYY"
        className="text-muted"

      />
      <Input
        id="formTitreStage"
        label="Titre De Stage"
        type="text"
        placeHolder="XXXX YYYY"
        className="text-muted"

      />
      <Input
        id="formDateDebutStage"
        label="Date de Debut de Stage"
        type="text"
        placeHolder="XXXX YYYY"
        className="text-muted"

      />
      <Input
        id="formDateFinStage"
        label="Date de Debut de Stage"
        type="text"
        placeHolder="XXXX YYYY"
        className="text-muted"

      />
      <Input
        id="formVilleStage"
        label="Ville de Stage"
        type="text"
        placeHolder="XXXX YYYY"
        className="text-muted"

      />
      <Input
        id="formPaysStage"
        label="Pays de Stage"
        type="text"
        placeHolder="XXXX YYYY"
        className="text-muted"

      />
      <Button variant="primary" type="submit" style={submitButtonStyle}>
        Submit
      </Button>
    </Form>);
}
export default FormInfo;