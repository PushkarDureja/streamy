const initialState = {
    type: "",
    text: "",
  };
  const flashMessages = (state = initialState, action = {}) => {
    switch (action.type) {
      case "ADD_FLASH_MESSAGE":
        return {
          type: action.message.type,
          text: action.message.text,
        };
      case "DELETE_FLASH_MESSAGE":
        return {
          type: "",
          text: "",
        };
  
      default:
        return state;
    }
  };
  export default flashMessages;