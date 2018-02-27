import { RestfulAdapter } from "../adapters";
import {EB_KEY} from '../secrets'
//using thunk, we return are returning a function here instead of
//a plain object.  Thunk intercepts this returned value, and if it is a
//function, cancels the normal event of calling our reducers, and
//instead, passes in 'dispatch' as an argument to the function.
//the fetch request was extracted out to our adapter, but still functions the same
 export function fetchGetEvents() {
  return dispatch => {
    dispatch({ type: "EVENTS_LOADING" });
    RestfulAdapter.indexFetch("events").then(data => {
      dispatch({ type: "EVENTS_LOAD", payload: data });
    });
  };
}

export function fetchGetEventDetails(eb_id) {
  return dispatch => {
    https://www.eventbriteapi.com/v3/events/42509915301/?token=5H7WYZBWI4CMG3ZF7Y6T
    fetch(`https://www.eventbriteapi.com/v3/events/${eb_id}/?token=${EB_KEY}&expand=venue`)
      .then(res => res.json())
      .then(jsonData => { dispatch({type:"EVENT_DETAILS", payload: jsonData})})
  }
}

export function updateForm(eventFilters) {
  //console.log(eventFilters)
  return {type: "UPDATE_FORM", payload: eventFilters}
}







// export function updateForm({ location, category, date}) {
//   return dispatch => {
//     RestfulAdapter.editFetch("events", id, {
//       hobbit: { name, title, key_skill }
//     }).then(data => {
//       dispatch(setHobbit(data));
//     });
//   };
// }

// export function updateForm(eventFilterForm) {
//   return { type: "UPDATE_FORM", payload: eventFilterForm};
// }
