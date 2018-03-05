import { RestfulAdapter } from "../adapters";
import {EB_KEY} from '../secrets'

export function addUser(body) {
  return dispatch => {
    dispatch({ type: "ACCOUNT_LOADING" });
    RestfulAdapter.createFetch("users", body).then(data => {
      dispatch({type:"ADD_USER", payload: data})
      dispatch({type:"EVENTS_LOAD", payload: data.user.events.map(e => {return e.eventbrite_id})})
      dispatch({type:"RSVPS_LOAD", payload: data.user.Rsvps.map(rsvp => {return rsvp.eventbrite_id})})
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
    RestfulAdapter.createFetch("events", body).then(eventData => {
      dispatch({type:"UPDATE_EVENTS_ATTENDING", payload: eventData.eventbrite_id})
      // dispatch({type: "UPDATE_USER_EVENTS", payload: eventData.eventbrite_id})
    })
  }
}

export function updateEventsDetails(eb_id) {
  return dispatch => {
    fetch(`https://www.eventbriteapi.com/v3/events/${eb_id}/?token=${EB_KEY}&expand=venue`)
      .then(res => res.json())
      .then(jsonData => { dispatch({type:"UPDATE_EVENT_DETAILS", payload: jsonData})})
  }
}

export function createRsvp(body) {
  return dispatch => {
    RestfulAdapter.createFetch("rsvps", body).then(rsvpData => {
      dispatch({type: "UPDATE_RSVPS", payload: rsvpData.eventbrite_id})
      // dispatch({type: "UPDATE_USER_RSVPS", payload: rsvpData.eventbrite_id})
    })
  }
}

export function updateRsvps(eb_id) {
  return dispatch => {
    dispatch({type: "UPDATE_RSVPS", payload: parseInt(eb_id)})
  }
}
