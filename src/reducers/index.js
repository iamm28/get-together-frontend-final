export function eventsReducer(state = {events_attending: [], eventDetails: [], loading: false, user_info:{}, user_id: undefined}, action) {
  switch (action.type) {
    case "ACCOUNT_LOADING":
      return {
        ...state,
        loading: true
      };
    case "EVENTS_LOAD":
      return {
        ...state,
        loading: false,
        events_attending: [...action.payload]
      };
    case "UPDATE_EVENTS_ATTENDING":
      return {
        ...state,
        events_attending: [...state.events_attending, action.payload]
      }
    case "UPDATE_EVENT_DETAILS":
      return {
        ...state,
        eventDetails: [...state.eventDetails, action.payload]
      }
    case "EVENT_DETAILS":
      return {
        ...state,
        eventDetails: [...state.eventDetails, action.payload]
      }
    case 'ADD_USER':
      return {
        ...state,
        user_info: action.payload.user,
        user_id: action.payload.user.id
      }
    default:
      return state;
  }
}

// first make const initialState={} with fetch info, and replace state={} with initialState variable
//initialState fetch to set up state with user, their groups, their events, said no to events, empty formFilter and empty rsvp
//then update form filter and respond to rsvp with adding to events or no to events
//need a way to have a current event to display as well

//user group info
//user filters
//set filters
//get more events
//display an event
//update events attending or not attending

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
