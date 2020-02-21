import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import {useSelector, useDispatch} from "react-redux";
import {submitCampaign, Pages, navigate} from "../actions";
import Button from 'react-bootstrap/Button';
import api from "../api/api";

function AdRequirements () {

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
            <li className='currentSection'>3. Ad Requirements</li>
            <li>4. Budget</li>
            <li>5. Review</li>
          </ul>
        </Col>
        <Col xs={9}>
          <div className='brand-content'>
            <Accordion>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey='0' style={{float: 'left'}}>
                  <label className='form-label'>Instagram</label>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='0'>
                  <Card.Body>
                    <Form.Group>
                      <label className='form-label'>Posts</label>
                      <Form.Control
                        type='number'
                        value={campaignInfo.instagram_posts || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          dispatch(submitCampaign({instagram_posts: val}));
                        }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <label className='form-label'>Stories</label>
                      <Form.Control
                        type='number'
                        value={campaignInfo.instagram_stories || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          dispatch(submitCampaign({instagram_stories: val}));
                        }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <label className='form-label'>Videos</label>
                      <Form.Control
                        type='number'
                        value={campaignInfo.instagram_videos || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          dispatch(submitCampaign({instagram_videos: val}));
                        }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <label className='form-label'>Post Description</label>
                      <Form.Text className='text-muted'>Describe the style of the content and any additional details for the creators</Form.Text>
                      <Form.Control
                        as='textarea'
                        rows={5}
                        value={campaignInfo.instagram_post_description || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          dispatch(submitCampaign({instagram_post_description: val}));
                        }}
                      />
                    </Form.Group>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            <Accordion>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey='1' style={{float: 'left'}}>
                  <label className='form-label'>Youtube</label>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='1'>
                  <Card.Body>
                    <Form.Group>
                      <label className='form-label'>Videos</label>
                      <Form.Control
                        type='number'
                        value={campaignInfo.youtube_videos || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          dispatch(submitCampaign({youtube_videos: val}));
                        }}
                      />
                    </Form.Group>
                    <Form.Group>
                      <label className='form-label'>Post Description</label>
                      <Form.Text className='text-muted'>Describe the style of the content and any additional details for the creators</Form.Text>
                      <Form.Control
                        as='textarea'
                        rows={5}
                        value={campaignInfo.youtube_post_description || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          dispatch(submitCampaign({youtube_post_description: val}));
                        }}
                      />
                    </Form.Group>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            <Form.Group>
              <label className='form-label'>Payout Structure</label>
              <Form.Text className='text-muted'>Choose one or a combination of payouts</Form.Text>
            </Form.Group><br/>
            <div className='brand-content'>
              <Form.Group>
                <label className='form-label'>Free Product or Service</label>
                <Form.Text className='text-muted'>The item or service the creator is promoting</Form.Text>
                <Form.Control
                  value={campaignInfo.product_or_service || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    dispatch(submitCampaign({product_or_service: val}));
                  }}
                />
              </Form.Group>
              <Form.Group>
                <label className='form-label'>Fixed Rate</label>
                <Form.Control
                  value={campaignInfo.fixed_rate || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    dispatch(submitCampaign({fixed_rate: val}));
                  }}
                />
              </Form.Group>
              <Form.Group>
                <label className='form-label'>Performance</label>
                <Form.Text className='text-muted'>Payment for every click and 1,000 views</Form.Text>
                <Form.Control
                  value={campaignInfo.performance_payment || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    dispatch(submitCampaign({performance_payment: val}));
                  }}
                />
              </Form.Group>
            </div>
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
                        dispatch(navigate(Pages.BUDGET));
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

export default AdRequirements;