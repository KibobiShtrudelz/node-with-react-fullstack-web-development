import { FETCH_USER } from "../actions/types";

export default function(state = null, action) {
  console.log("state", state);
  console.log("action", action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload.data || false;

    default:
      return state;
  }
}
