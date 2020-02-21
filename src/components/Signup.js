import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import {navigate, submitSignUp, Pages} from '../actions';
import {useDispatch} from "react-redux";
import svgLogo from '../images/logo.svg';

function Signup () {

  const dispatch = useDispatch();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <div className='content'>
      <img id='logo' alt='Corcus logo' src={svgLogo} />
        <InputGroup className='input'>
          <FormControl
            placeholder="Full Name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
          />
        </InputGroup>
        <InputGroup className='input'>
          <FormControl
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </InputGroup>
        <InputGroup className='input'>
          <FormControl
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </InputGroup>

        <Button
          style={{width: '100%'}}
          variant='primary'
          onClick={() => {
            dispatch(navigate(Pages.I_AM_A));
            dispatch(submitSignUp({
              'full_name': fullName,
              'email': email,
              'password': password
            }));
          }}
        >
          Signup
        </Button>
    </div>
  )
}

export default Signup;