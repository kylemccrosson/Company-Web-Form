import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import {navigate, Pages, submitSignUp, submitCampaign} from "../actions";
import api from '../api/api';
import Dropzone from 'react-dropzone';

function BrandSetup() {

  const brandData = useSelector(state => state.submitSignUp);
  const dispatch = useDispatch();


  return (
    <div>
      <Navbar fixed='top'>
        <Navbar.Text className='navbar-blue'>Account Setup ></Navbar.Text>
        <Navbar.Text>Create Campaign</Navbar.Text>
      </Navbar>
      <div className='brand-content'>
        <Container>
          <Row>
            <Col>
              <label className='form-label' htmlFor='brand-logo'>Brand Logo</label><br/>
              <Dropzone
                onDrop={acceptedFiles => {
                if (acceptedFiles && acceptedFiles[0]) {
                  const reader = new FileReader();
                  reader.onload = e => {
                    console.log(e);
                    dispatch(submitSignUp({brand_logo: e.target.result}))
                  };
                  reader.readAsDataURL(acceptedFiles[0]);
                }

                }}
              >
                {({getRootProps, getInputProps}) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>Drag 'n' drop a file here, or click to select a file</p>
                    </div>
                  </section>
                )}
              </Dropzone>
              {brandData.brand_logo ? <img alt='Brand Logo' className='brand-logo' src={brandData.brand_logo}/> : ''}
            </Col>
          </Row>
          <Row>
            <Col xs={5}>
              <label className='form-label' htmlFor='brand-name'>Brand Name</label>
              <FormControl
                id='brand-name'
                value={brandData.brand_name || ''}
                onChange={e => {
                  const val = e.target.value;
                  dispatch(submitSignUp({brand_name: val}));
                }}
              />
            </Col>
            <Col xs={7}>
              <label className='form-label' htmlFor='brand-site'>Brand Website</label>
              <FormControl
                id='brand-site'
                value={brandData.brand_site || ''}
                onChange={e => {
                  const val = e.target.value;
                  dispatch(submitSignUp({brand_site: val}));
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <label className='form-label' htmlFor='brand-description'>Tell us about your brand</label>
              <Form.Control
                as='textarea'
                rows={5}
                id='brand-description'
                value={brandData.brand_description || ''}
                onChange={e => {
                  const val = e.target.value;
                  dispatch(submitSignUp({brand_description: val}));
                }}
              />
            </Col>
          </Row>
        </Container>
        <Button
          style={{width: '80%'}}
          variant='primary'
          onClick={() => {
            api.verifyBrand(brandData).then((response) => {
              if (response.isValid) {
                api.sendBrandToDB(brandData).then((response) => {
                  if (response.status === 'success') {
                    dispatch(submitSignUp({brand_id: response.brand_id}));
                    dispatch(submitCampaign({brand_id: response.brand_id}));
                    dispatch(navigate(Pages.PRODUCT_OVERVIEW));
                    window.scrollTo(0,0);
                  }
                }).catch((err) => {
                  // handle db rejection, figure out what to show the user in order to fix this problem
                });
              }
            });
          }}
        >
          Signup
        </Button>

      </div>
    </div>
  );
}

export default BrandSetup;