import React from 'react';
import Form from 'react-bootstrap/Form';

function MyTextInput(props) {
  return (
    <Form.Control
      value={props.object[props.key]}
      onChange={(e) => {
        const val = e.target.value;
        props.func(prevState => {
          return {...prevState, [props.key]: val};
        });
      }}
    />
  )
}

export default MyTextInput;