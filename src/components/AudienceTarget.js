import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import InputGroup from 'react-bootstrap/InputGroup';
import {useSelector, useDispatch} from "react-redux";
import {submitCampaign, Pages, navigate} from "../actions";
import Button from 'react-bootstrap/Button';
import api from "../api/api";

function AudienceTargets() {

  const campaignInfo = useSelector(state => state.submitCampaign);
  const dispatch = useDispatch();

  return (
    <div>
      <Navbar fixed='top'>
        <Navbar.Text>Account Setup</Navbar.Text>
        <Navbar.Text className='navbar-blue'>> Create Campaign</Navbar.Text>
      </Navbar>
      <Row>
        <Col xs={3}>
          <ul id='sideNav'>
            <li
              onClick={() => {
                dispatch(navigate(Pages.PRODUCT_OVERVIEW));
              }}
              className='completedSection'>1. Product Overview</li>
            <li className='currentSection'>2. Audience Targets</li>
            <li>3. Ad Requirements</li>
            <li>4. Budget</li>
            <li>5. Review</li>
          </ul>
        </Col>
        <Col xs={9}>
          <div className='brand-content'>
            <Form.Group>
              <label className='form-label'>Age</label>
              <Form.Text className='text-muted'>The age range of your audience</Form.Text>
              <InputGroup>
                <Form.Control
                  style={{marginLeft: '1em', marginRight: '1em'}}
                  type='number'
                  value={campaignInfo.audience_min_age || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    dispatch(submitCampaign({audience_min_age: val}));
                  }}
                />
                <label> - </label>
                <Form.Control
                  style={{marginLeft: '1em', marginRight: '1em'}}
                  type='number'
                  value={campaignInfo.audience_max_age || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    dispatch(submitCampaign({audience_max_age: val}));
                  }}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group>
              <label className='form-label'>Location</label>
              <Form.Text className='text-muted'>The location of the audience</Form.Text>
              <Form.Control
                value={campaignInfo.audience_location || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  dispatch(submitCampaign({audience_location: val}));
                }}
              />
            </Form.Group>
            <Form.Group>
              <label className='form-label'>Gender</label>
              <Form.Text
                className='text-muted'
                style={{width: '100%'}}
              >
                Unselect if you want to specify male or female
              </Form.Text>
              <ToggleButtonGroup
                type='checkbox'
                name='genders'
                // value={campaignInfo.audience_gender}
                defaultValue={['Male','Female']}
                onChange={(e) => {
                  dispatch(submitCampaign({audience_gender: e}));
                }}
              >
                <ToggleButton
                  className='square-button-small'
                  value='Male'
                >
                  Male
                </ToggleButton>
                <ToggleButton
                  className='square-button-small'
                  value='Female'
                >
                  Female
                </ToggleButton>
              </ToggleButtonGroup>
            </Form.Group>
            <Form.Group>
              <label className='form-label'>Interest</label>
              <Form.Text className='text-muted'>Define your audience's interest</Form.Text>
              <Form.Control
                value={campaignInfo.audience_interests || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  dispatch(submitCampaign({audience_interests: val}));
                }}
              />
            </Form.Group>
          </div>
          <Row style={{float: 'right'}}>
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
                        dispatch(navigate(Pages.AD_REQ));
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

export default AudienceTargets;

