// export default function usersReducer(state = { email: null }, action) {
//   switch (action.type) {
//     case "SET_CURRENT_USER":
//       localStorage.setItem('jwt', action.payload.jwt)
//       console.log({...state, email: action.payload.email});
//       return {...state, username: action.payload.email}
//     default:
//       return state
//   }
// }
//addtional actions - CREATE_USER, VIEW_USER, UPDATE_USER, DELETE_USER, LOGOUT_USER
//add other current user info and be able to edit current user info, delete account etc
//navbar, login, sign up, profile

//42509915301
export function eventsReducer(state = {events_attending: [], eventDetails: [], loading: false, eventFilters: {location: "", categories: [], date: undefined}}, action) {
  switch (action.type) {
    case "EVENTS_LOADING":
      return {
        ...state,
        loading: true
      };
    case "EVENTS_LOAD":
      return {
        ...state,
        loading: false,
        events_attending: action.payload
      };
    case "UPDATE_FORM":
      return {
        ...state,
        eventFilters: {...state.eventFilters, [action.payload.name]: action.payload.value }
      }
    case "EVENT_DETAILS":
      return {
        ...state,
        eventDetails: [...state.eventDetails, action.payload]
      }
    default:
      return state;
  }
}

// case "EVENTS_ATTENDING":
//   return {
//     ...state,
//     events_attending: action.payload//[42509915301, 16981112966, 42722367752] //fetch instead
//   }

// export default function eventsReducer( //event im viewing, events that fit filter, filters, events im going to, events no to
//   state = { events: [], selectedEvent: null, loading: false, eventFilterForm: {location: "", categories: [], date: null} },
//   action
// ) {
//   switch (action.type) {
//
//     case "ATTEND_EVENT":
//       return {
//         ...state,
//         events: [...state.events, action.payload], //add event to list of events
//         selectedEvent: null //set next eventbrite id to show next event info
//       };
//     case "NOT_ATTEND_EVENT":
//       return {
//         ...state,
//         events: [...state.events, action.payload], //add event to list of events not attending
//         selectedEvent: null //set next eventbrite id to show next event info
//       };
//     case "UPDATE_FORM":
//       return {
//         ...state,
//         eventFilterForm: {...state.eventFilterForm, ...action.payload}
//       };
//     default:
//       return state;
//   }
// }


// first make constinitialState={} with fetch info, and replace state={} with initialState variable
//initialState fetch to set up state with user, their groups, their events, said no to events, empty formFilter and empty rsvp
//then update form filter and respond to rsvp with adding to events or no to events
//need a way to have a current event to display as well


//initial state all empty then call on reducer stuff to fill it in one thing at a time
//user info
//user group info
//user event info
//user filters
//set filters
//get more events
//display an event
//update events attending or not attending
