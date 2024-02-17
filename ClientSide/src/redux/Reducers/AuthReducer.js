import {
  SIGNIN,
  SIGNOUT,
  SIGNUP,
  NOTIFICATION_READ,
  UPDATE_COUNTER,
  GET_INDICATOR,
} from '../Constants';

const initialState = {
  user: null,
};

export default function AuthReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNIN:
      state = {
        ...state,
        user: action.payload,
      };
      break;
    case SIGNUP:
      state = {
        ...state,
        user: action.payload,
      };
      break;

    case SIGNOUT:
      state = {
        ...state,
        user: null,
      };
      break;
    case NOTIFICATION_READ:
      state = {
        ...state,
        isNotificationRead: action.payload,
      };
      break;
    case UPDATE_COUNTER:
      state = {
        ...state,
        counter: action.payload,
      };
      break;

    case GET_INDICATOR:
      state = {
        ...state,
        messageCount: action.payload.messageCount,
        bookingCount: action.payload.bookingCount,
      };
      break;

    default:
      break;
  }
  return state;
}
