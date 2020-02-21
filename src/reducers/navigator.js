import {Pages} from '../actions';

const navigatorReducer = (state = Pages.SIGN_UP, action) => {
  switch (action.type) {
    case 'NAV':
      return action.destination;
    default:
      return state;
  }
};

export default navigatorReducer;