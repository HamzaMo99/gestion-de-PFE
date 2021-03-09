import React from "react";
import { Button, Form } from 'react-bootstrap';
const Input = (props) => {
  const formControlStyle = {
    marginLeft: "0px",
    position: "relative",
    left : "10px",
    width: "500px",
    display: "inline-block",
    marginBottom: "2px"
  }
  const formLabel = {
    display: "inline-block",
    width: "190px",
    paddingLeft : "20px"
  }
  return (
    <Form.Group controlId={props.id} >
      <Form.Label style={formLabel} size="lg">
        {props.label}</Form.Label>
      <Form.Control style={formControlStyle} type={props.type} placeholder={props.placeHolder} size="lg" readonly={props.readonly} />
    </Form.Group>
  );
}
export default Input;
