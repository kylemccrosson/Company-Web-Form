import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import {useSelector, useDispatch} from "react-redux";
import {submitCampaign, Pages, navigate} from "../actions";
import Button from 'react-bootstrap/Button';
import api from "../api/api";

function Budget () {

  const dispatch = useDispatch();
  const campaignInfo = useSelector(state => state.submitCampaign);

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
            <li
              onClick={() => {
                dispatch(navigate(Pages.AUDIENCE_TARGET));
              }}
              className='completedSection'>2. Audience Targets</li>
            <li
              onClick={() => {
                dispatch(navigate(Pages.AD_REQ));
              }}
              className='completedSection'>3. Ad Requirements</li>
            <li className='currentSection'>4. Budget</li>
            <li>5. Review</li>
          </ul>
        </Col>
        <Col xs={9}>
          <div className='brand-content'>
            <Row>
              <label className='form-label'>Duration</label>
              <Form.Text className='text-muted' style={{width:'100%'}}>The length of the campaign</Form.Text>
            </Row>
            <Row>
              <Col xs={6}>
                <label className='form-label'>Start date</label>
                <Form.Control
                  type='date'
                  value={campaignInfo.start_date || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    dispatch(submitCampaign({start_date: val}));
                  }}
                />
              </Col>
              <Col xs={6}>
                <label className='form-label'>End date</label>
                <Form.Control
                  type='date'
                  value={campaignInfo.end_date || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    dispatch(submitCampaign({end_date: val}));
                  }}
                />
              </Col>
            </Row>
            <Row>
              <label className='form-label'>Total Budget</label>
              <Form.Text className='text-muted'>Your maximum budget for this campaign</Form.Text>
              <Form.Control
                value={campaignInfo.total_budget || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  dispatch(submitCampaign({total_budget: val}));
                }}
              />
            </Row>
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
                        dispatch(navigate(Pages.REVIEW));
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

export default Budget;