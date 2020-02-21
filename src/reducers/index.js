// import your reducers
import navigatorReducer from './navigator';
import submitSignUpReducer from './submitSignUp';
import submitCampaignReducer from './submitCampaign';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  navigator: navigatorReducer,
  submitSignUp: submitSignUpReducer,
  submitCampaign: submitCampaignReducer
});

export default rootReducer;