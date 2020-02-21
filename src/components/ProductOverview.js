import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useSelector, useDispatch} from "react-redux";
import {submitCampaign, navigate, Pages} from "../actions";
import api from '../api/api';
import Dropzone from "react-dropzone";

function ProductOverview() {

  const dispatch = useDispatch();
  const campaignInfo = useSelector(state => state.submitCampaign);
  if(!campaignInfo.product_pictures) {
    campaignInfo.product_pictures = [];
  }


  return (
    <div>
      <Navbar fixed='top'>
        <Navbar.Text>Account Setup</Navbar.Text>
        <Navbar.Text className='navbar-blue'>> Create Campaign</Navbar.Text>
      </Navbar>
      <Row>
        <Col xs={3}>
          <ul id='sideNav'>
            <li className='currentSection'>1. Product Overview</li>
            <li>2. Audience Targets</li>
            <li>3. Ad Requirements</li>
            <li>4. Budget</li>
            <li>5. Review</li>
          </ul>
        </Col>
        <Col xs={9}>
          <div className='brand-content'>
            <Form.Group>
              <label className='form-label'>Campaign Title</label>
              <Form.Control
                value={campaignInfo.campaign_title || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  dispatch(submitCampaign({campaign_title: val}));
                }}
              />
            </Form.Group>
            <Form.Group>
              <label className='form-label'>Product Description</label>
              <Form.Text className='text-muted'>What is the product and how creators will create content for it.</Form.Text>
              <Form.Control
                as='textarea'
                rows={5}
                value={campaignInfo.product_description || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  dispatch(submitCampaign({product_description: val}));
                }}
              />
            </Form.Group>
            <Form.Group>
              <label className='form-label'>Product Images</label>
              <Form.Text className='text-muted'>What the product looks like and the content style the brand is looking for.</Form.Text>
              <br/><br/><br/>
              <Dropzone
                onDrop={acceptedFiles => {
                  if (acceptedFiles) {
                    acceptedFiles.forEach(file => {
                      const reader = new FileReader();
                      reader.onload = e => {
                        console.log(e);
                        dispatch(submitCampaign({product_pictures: [...campaignInfo.product_pictures, e.target.result]}))
                      };
                      reader.readAsDataURL(file);
                    });
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
              {campaignInfo.product_pictures.map((pic, index) => {
                return <img alt="Product" key={index} src={pic} className='brand-logo'/>
              })}
            </Form.Group>
            <Form.Group>
              <label className='form-label'>Categories</label>
              <Form.Control
                value={campaignInfo.campaign_categories || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  dispatch(submitCampaign({campaign_categories: val}));
                }}
              />
            </Form.Group>
          </div>
          <Row style={{float:'right'}}>
            <Button
              className='bottom-button'
              variant='outline-primary'
              onClick={() => {
                api.verifyCampaign(campaignInfo).then(response => {
                  if (response.isValid) {
                    api.sendCampaignToDB(campaignInfo).then(response => {
                      if (response.status === 'success') {
                        dispatch(submitCampaign({campaign_id: response.campaign_id}));
                      }
                    })
                  } else {
                    // handle how to display invalid data
                  }
                })
              }}
            >
              Save
            </Button>
            <Button
              className='bottom-button'
              onClick={() => {
                api.verifyCampaign(campaignInfo).then(response => {
                  if (response.isValid) {
                    api.sendCampaignToDB(campaignInfo).then(response => {
                      if (response.status === 'success') {
                        dispatch(submitCampaign({campaign_id: response.campaign_id}));
                        dispatch(navigate(Pages.AUDIENCE_TARGET));
                        window.scrollTo(0,0);
                      }
                    }).catch(err => {
                      // handle database error
                    })
                  } else {
                    // handle how to display invalid data
                  }
                })
              }}
            >
              Continue
            </Button>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default ProductOverview;