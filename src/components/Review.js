import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import {useSelector, useDispatch} from "react-redux";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {submitCampaign, navigate, Pages} from "../actions";
import api from '../api/api';

function Review() {

  const dispatch = useDispatch();
  const campaignInfo = useSelector(state => state.submitCampaign);
  const EMPTY = 'N/A';
  let audienceGender = 'Male, Female';

  if (campaignInfo.audience_gender) {
    if (campaignInfo.audience_gender.length === 1) {
      audienceGender = campaignInfo.audience_gender[0];
    } else if (campaignInfo.audience_gender.length === 2) {
      audienceGender = campaignInfo.audience_gender[0] + ", " + campaignInfo.audience_gender[1];
    } else {
      audienceGender = 'N/A'
    }
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
            <li
              onClick={() => {
                dispatch(navigate(Pages.BUDGET));
              }}
              className='completedSection'>4. Budget</li>
            <li className='currentSection'>5. Review</li>
          </ul>
        </Col>
        <Col xs={9}>
          <div className='brand-content' style={{textAlign: 'left'}}>
            <Card>
              <Card.Header>Product Overview</Card.Header>
              <Card.Body>
                <label className='form-label'>CAMPAIGN TITLE</label>
                <p>{campaignInfo.campaign_title || EMPTY}</p>

                <label className='form-label'>PRODUCT DESCRIPTION</label>
                <p>{campaignInfo.product_description || EMPTY}</p>

                {campaignInfo.product_pictures.map((pic, index) => {
                  return <img alt="Product" key={index} src={pic} className='brand-logo'/>
                })}

                <label className='form-label'>CATEGORIES</label>
                <p>{campaignInfo.campaign_categories || EMPTY}</p>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>Target Audience</Card.Header>
              <Card.Body>
                <label className='form-label'>Age Range</label>
                <p>{campaignInfo.audience_min_age || 0} to {campaignInfo.audience_max_age || 0}</p>

                <label className='form-label'>Location</label>
                <p>{campaignInfo.audience_location || EMPTY}</p>

                <label className='form-label'>Gender</label>
                <p>{audienceGender}</p>

                <label className='form-label'>Interests</label>
                <p>{campaignInfo.audience_interests || EMPTY}</p>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>Ad Requirements</Card.Header>
              <Card.Body>
                <label className='form-label'>INSTAGRAM POST DESCRIPTION</label>
                <p>{campaignInfo.instagram_post_description || EMPTY}</p>

                <label className='form-label'>TASKS</label>
                <p>Instagram Posts: {campaignInfo.instagram_posts || 0}</p>
                <p>Instagram Stories: {campaignInfo.instagram_stories || 0}</p>
                <p>Instagram Videos: {campaignInfo.instagram_videos || 0}</p>

                <label className='form-label'>YOUTUBE POST DESCRIPTION</label>
                <p>{campaignInfo.youtube_post_description || EMPTY}</p>

                <label className='form-label'>TASKS</label>
                <p>Youtube Videos: {campaignInfo.youtube_videos || 0}</p>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <label className='form-label'>PAYMENT METHOD</label>
                <Form.Text className='text-muted'>Credit card number</Form.Text>
                <Form.Control
                  id='card-number'
                  value={campaignInfo.card_number || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    dispatch(submitCampaign({card_number: val}));
                  }}
                />
              </Card.Body>
            </Card>
          </div>
          <Button
            style={{marginTop: '1em', width: '50%'}}
            onClick={() => {
              api.validatePayment(campaignInfo.card_number).then(response => {
                if (response.status === 'payment_complete') {
                  dispatch(navigate(Pages.SUBMITTED));
                }
              }).catch(err => {
                // handle card error
                document.getElementById('card-number').style.border = '1px solid red';
              })
            }}
          >
            Deposit $500
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Review;