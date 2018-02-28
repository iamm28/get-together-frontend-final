import { RestfulAdapter } from "../adapters";
import {EB_KEY} from '../secrets'

export function addUser(body) {
  return dispatch => {
    dispatch({ type: "ACCOUNT_LOADING" });
    RestfulAdapter.createFetch("users", body).then(data => {
      dispatch({type:"ADD_USER", payload: data.user.id}) //data should be id
      dispatch({type:"EVENTS_LOAD", payload: data.user.events.map(e => {return e.eventbrite_id})}) //data should be arr eb ids
    })
  }
}

export function fetchGetEventDetails(eb_id) {
  return dispatch => {
    fetch(`https://www.eventbriteapi.com/v3/events/${eb_id}/?token=${EB_KEY}&expand=venue`)
      .then(res => res.json())
      .then(jsonData => { dispatch({type:"EVENT_DETAILS", payload: jsonData})})
  }
}
