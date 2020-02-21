import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import {navigate, submitSignUp, Pages} from '../actions';
import {useDispatch} from "react-redux";
import '../style/index.css';

function IAmA() {

  const dispatch = useDispatch();
  const [creator, setCreator] = useState(false);
  const [brand, setBrand] = useState(false);

  function clickCreator() {
    setCreator(true);
    setBrand(false);
  }

  function clickBrand() {
    setBrand(true);
    setCreator(false);
  }

  return (
    <div className='content' style={{width: '80%'}}>
      <h2 style={{textAlign:'center'}}>I am a...</h2>
      <Button className='square-button-big' onClick={() => clickCreator()}>
        <h6><strong>Creator</strong></h6>
        <p>I want to work with brands on marketing campaigns</p>
      </Button>
      <Button className='square-button-big' onClick={() => clickBrand()}>
        <h6><strong>Brand</strong></h6>
        <p>I want to promote my product or service</p>
      </Button>
      <Button
        style={{width: '50%'}}
        variant='primary'
        onClick={() => {
          if (creator) {
            dispatch(navigate(Pages.BRAND_SETUP));
            dispatch(submitSignUp({'creator_or_brand': 'creator'}));
          } else if (brand) {
            dispatch(navigate(Pages.BRAND_SETUP));
            dispatch(submitSignUp({'creator_or_brand': 'brand'}));
          } else {
            //don't do anything-- give a notice that they must pick one or the other
          }

        }}
      >
        Select
      </Button>
    </div>
  )
}

export default IAmA;