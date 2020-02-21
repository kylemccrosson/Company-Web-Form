

export const navigate = (dest) => {
  return {
    type: 'NAV',
    destination: dest
  }
};

export const submitSignUp = (data) => {
  return {
    type: 'SUBMIT_SIGN_UP',
    data: data
  }
};

export const Pages = {
  SIGN_UP: 'SIGN_UP',
  I_AM_A: 'I_AM_A',
  BRAND_SETUP: 'BRAND_SETUP',
  PRODUCT_OVERVIEW: 'PRODUCT_OVERVIEW',
  AUDIENCE_TARGET: 'AUDIENCE_TARGET',
  AD_REQ: 'AD_REQ',
  BUDGET: 'BUDGET',
  REVIEW: 'REVIEW',
  SUBMITTED: 'SUBMITTED'
};

export const submitCampaign = (data) => {
  return {
    type: 'SUBMIT_CAMPAIGN',
    data: data
  }
};