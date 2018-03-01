import { RestfulAdapter } from "../adapters";
import {EB_KEY} from '../secrets'

export function addUser(body) {
  return dispatch => {
    dispatch({ type: "ACCOUNT_LOADING" });
    RestfulAdapter.createFetch("users", body).then(data => {
      dispatch({type:"ADD_USER", payload: data})
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

export function updateEventsAttending(body) {
  return dispatch => {
    //find or create event in backend
    RestfulAdapter.createFetch("events", body).then(eventData => {
      dispatch({type:"UPDATE_EVENTS_ATTENDING", payload: eventData.eventbrite_id})
      // RestfulAdapter.createFetch("groups", {event_id: eventData.id}).then( groupData => {
      //   RestfulAdapter.createFetch("user-groups", {group_id: groupData.id, user_id: user_id})
      // })
    })
  }
  //make needed reducers
  //check home page to see if new event shows up on list
}

export function updateEventsDetails(eb_id) {
  return dispatch => {
    fetch(`https://www.eventbriteapi.com/v3/events/${eb_id}/?token=${EB_KEY}&expand=venue`)
      .then(res => res.json())
      .then(jsonData => { dispatch({type:"UPDATE_EVENT_DETAILS", payload: jsonData})})
  }
}
