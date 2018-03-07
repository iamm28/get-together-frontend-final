export function eventsReducer(state = {events_attending: [], eventDetails: [], loading: false, groupDetails: {}, rsvps:[], user_info:{}, user_id: undefined}, action) {
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
    case "RSVPS_LOAD":
      return {
        ...state,
        rsvps: [...action.payload]
      };
    case "UPDATE_RSVPS":
      return {
        ...state,
        rsvps: [...state.rsvps, action.payload],
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
    case "ADD_GROUP_DETAILS":
    let newGroupDetail = {}
    newGroupDetail[action.payload.eb_id] = action.payload.members
      return {
        ...state,
        groupDetails: {...state.groupDetails, ...newGroupDetail}
      }
    default:
      return state;
  }
}

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
