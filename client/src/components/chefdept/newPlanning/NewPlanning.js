import React, { useState, useEffect } from 'react';
import { Form, Col } from 'react-bootstrap';
import Datepicker from "react-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-bootstrap-time-picker';
import './NewPlanning.css';
import { Row } from 'react-bootstrap'
import MultiSelect from "react-multi-select-component";
import axios from 'axios';
import { connect } from "react-redux";
import Select from 'react-select'


const NewPlanning = () => {

    const [profsOptions, setprofsOptions] = useState([]);
    const [sujetOptions, setsujetOptions] = useState([]);
    const [selectedProfs, setSelectedProfs] = useState([]);
    const [selectedSujet, setSelectedSujet] = useState([]);
    const [profsLoaded, setprofsLoaded] = useState(false);
    const [sujetsLoaded, setsujetsLoaded] = useState(false);
    const [salleOptions, setsalleOptions] = useState([]);
    const [sallesLoaded, setsallesLoaded] = useState(false);
    const [selectedSalle, setselectedSalle] = useState([]);
    const [jour, setJour] = useState(new Date());
    const [heureDebut, setHeureDebut] = useState(new Date());
    const [heureFin, setHeureFin] = useState(new Date());
    const [stageId,setStageId]= useState();

   
   const formatNumer=(number)=>{
       if(0<=number<10) return "0"+number;
       return number.toString();
   }
    const submitPlannig = async (event) => {
        try {
            event.preventDefault();
        

            let profs = [];
            selectedProfs.map((x) => {
              profs.push(x.value);
            });
            
            const response = await fetch('http://localhost:5000/api/planning/newplanning',
                {
                    method: 'Post',
                    headers: {
                        'Content-Type' : 'application/json',
                        'Accept' : 'application/json',  
                    },
                    body: JSON.stringify({
                        jour: formatNumer(jour.getDay())+"/"+formatNumer(jour.getMonth())+"/"+jour.getFullYear(),
                heureDebut : heureDebut.getHours()+":"+heureDebut.getMinutes(),
                heureFin :heureFin.getHours()+":"+heureFin.getMinutes(),
                jury : profs,
                sujet:selectedSujet,
                salle : selectedSalle
                    })
                });
        } catch (err) {

        }

    }


    const handleChange = (date) => {
        setJour(date);
    }
    const handleHeureDebutChange = (date) => {
        setHeureDebut(date);
    }
    const handleHeureFinChange = (date) => {
        setHeureFin(date);
    }

    const sallesOptions = [
        {
            value: 1,
            label: "salle 1"
        },
        {
            value: 2,
            label: "salle 2"
        },
        {
            value: 3,
            label: "salle 3"
        },
    ];

    //getting enseignants

    useEffect(() => {
        axios.get('http://localhost:5000/api/enseignant')
            .then(function (response) {
                let t = [];


                response.data.enseignants.map(x => {
                    t.push({ value: x._id, label: x.nom + " " + x.prenom })
                })
                console.log(t);
                setprofsOptions(t)
                setprofsLoaded(true);
                

            })
            .catch(function (error) {


            })
    }, []);

    //getting stages 


    useEffect(() => {

        axios.get('http://localhost:5000/api/stages')
            .then(function (response) {
                let t = [];


                response.data.stages.map(x => {
                    t.push({ value: x._id, label: x.description })
                })
                console.log(t);
                setsujetOptions(t)
                setsujetsLoaded(true);

            })
            .catch(function (error) {


            })
    }, []);
    useEffect(() => {
        setsalleOptions(sallesOptions);
        setsallesLoaded(true);
    }, []);
    return <div>
        <div className="header">Nouveau Planning</div>
        <div className="container">
            <Form.Group className="planningForm">
                <Form.Row className="row">
                    <Form.Label column="lg" lg={2} className="label">Jour : </Form.Label>
                    <Col xs={2}>
                        <DatePicker className="picker"
                            selected={jour}
                            onChange={(date) => handleChange(date)}
                            name="jour"
                            dateFormat="MM/dd/yyyy"
                        />
                    </Col>
                </Form.Row>
                <br />
                <Form.Row className="row" inline>
                    <Form.Label column="lg" lg={2} className="label">Heure: </Form.Label>

                    <Form.Label column="lg" lg={2} className="from">De: </Form.Label>
                    <Col xs={2}>
                        <DatePicker className="picker picckerTime"
                            selected={heureDebut}
                            onChange={(date) => handleHeureDebutChange(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            name="heureDebut"
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                        />
                    </Col>
                    <Form.Label column="lg" lg={2} className="to">A: </Form.Label>
                    <Col xs={2}>
                        <DatePicker className="picker picckerTime"
                            selected={heureFin}
                            onChange={(date) => handleHeureFinChange(date)}
                            showTimeSelect
                            showTimeSelectOnly
                            name="heureFin"
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                        />
                    </Col>
                </Form.Row>
                <br />

                <Form.Row className="row">
                    <Form.Label column="lg" lg={2} className="label">Jury :</Form.Label>
                    <Col xs={7}>
                        {profsLoaded ? <MultiSelect
                            className="select"
                            options={profsOptions}
                            value={selectedProfs}
                            name="jury"
                            onChange={(selects) => setSelectedProfs(selects)}
                            labelledBy={"Select"} /> : ""}
                    </Col>
                </Form.Row>
                <br />
                <Form.Row className="row">
                    <Form.Label column="lg" lg={2} className="label">Sujet :</Form.Label>
                    <Col xs={7}>
                        {sujetsLoaded ? <Select
                            className="select"
                            options={sujetOptions}
                            name="sujet"
                            value={selectedSujet}
                            onChange={(selects) => setSelectedSujet(selects)}
                            labelledBy={"Select"} /> : ""}
                    </Col>
                </Form.Row>
                <br />
                <Form.Row className="row">
                    <Form.Label column="lg" lg={2} className="label">Salle :</Form.Label>
                    <Col xs={7}>
                        {sujetsLoaded ? <Select
                            className="select"
                            options={salleOptions}
                            value={selectedSalle}
                            name="salle"
                            onChange={(selects) => setselectedSalle(selects)}
                            labelledBy={"Select"} /> : ""}
                    </Col>
                </Form.Row>
                <br /><br />
                <Form.Row className="row">
                    <div className="btns">
                        <button className="btn btn-success" type="submit" onClick={(event) => submitPlannig(event)}>Valider</button>
                        <button className="btn btn-danger">Annuler</button>
                    </div>
                </Form.Row>
            </Form.Group>
        </div>
    </div>
}

export default NewPlanning;