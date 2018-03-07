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

export function fetchGetGroup(eb_id,user_id) {
  return dispatch => {
    RestfulAdapter.indexFetch("events").then(eventData => {
      let event=eventData.filter(e => e.eventbrite_id===eb_id)
      RestfulAdapter.showFetch("events",event[0].id).then(eventDetails => {
        let group = eventDetails.event.user_groups.filter(g => g.user_id===user_id)[0].group_id
        RestfulAdapter.showFetch("groups", group).then( groupDetails =>{
          dispatch({type:"ADD_GROUP_DETAILS", payload: groupDetails })
        })
        //eventDetails.event.user_groups.filter(g => g.group_id===group)
      })
    })
  }
}

export function updateEventsAttending(body) {
  return dispatch => {
    RestfulAdapter.createFetch("events", body).then(eventData => {
      dispatch({type:"UPDATE_EVENTS_ATTENDING", payload: eventData.eventbrite_id})
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
    })
  }
}

export function updateRsvps(eb_id) {
  return dispatch => {
    dispatch({type: "UPDATE_RSVPS", payload: parseInt(eb_id)})
  }
}
