import React from 'react';
import Signup from './Signup';
import IAmA from './IAmA';
import BrandSetup from "./BrandSetup";
import Review from './Review';
import {useSelector} from "react-redux";
import {Pages} from '../actions';
import ProductOverview from "./ProductOverview";
import AudienceTargets from './AudienceTarget';
import AdRequirements from "./AdRequirements";
import Budget from "./Budget";
import Submitted from "./Submitted";


function App() {
  const current_form = useSelector(state => state.navigator);

  return (
    <div className="App">
      {current_form === Pages.SIGN_UP ? <Signup/> : ''}
      {current_form === Pages.I_AM_A ? <IAmA/> : ''}
      {current_form === Pages.BRAND_SETUP ? <BrandSetup/> : ''}
      {current_form === Pages.PRODUCT_OVERVIEW ? <ProductOverview/> : ''}
      {current_form === Pages.AUDIENCE_TARGET ? <AudienceTargets/> : ''}
      {current_form === Pages.AD_REQ ? <AdRequirements/> : ''}
      {current_form === Pages.BUDGET ? <Budget/> : ''}
      {current_form === Pages.REVIEW ? <Review/> : ''}
      {current_form === Pages.SUBMITTED ? <Submitted/> : ''}
    </div>
  );
}

export default App;
