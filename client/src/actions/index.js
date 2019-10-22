import axios from "axios";
import { FETCH_USER, CHANGE_AUTH } from "./types";

export const changeLogin = shouldBeLoggedIn => {
  return {
    type: CHANGE_AUTH,
    payload: shouldBeLoggedIn
  };
};

export const fetchUser = () => async dispatch => {
  dispatch({
    type: FETCH_USER,
    payload: await axios.get("/api/current_user")
  });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = values => async dispatch => {
  const res = await axios.post("/api/surveys", values);

  dispatch({ type: FETCH_USER, payload: res.data });
};
