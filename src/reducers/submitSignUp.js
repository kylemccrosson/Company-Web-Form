const submitSignUpReducer = (state = {}, action) => {
  switch(action.type) {
    case 'SUBMIT_SIGN_UP':
      let new_state = {};
      let new_data = action.data;
      console.log('NEW DATA:', new_data);
      for (let key in state) {
        new_state[key] = state[key];
      }
      for (let key in new_data) {
        new_state[key] = new_data[key];
      }
      return new_state;
    default:
      return state;
  }
};

export default submitSignUpReducer;