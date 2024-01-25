import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";


const Auth = JSON.parse(localStorage.getItem("auth"));

// define initial state
const initialState = {
    user: Auth ? Auth.user : null,
    logout: {
      type: "LOGOUT",
      userdata: null
    }
  };

// create slice
const slice = createSlice({
    name:'app',
    initialState,
    reducers:{
        //Toggle sidebar
        S(state,action){
            state.sidebar.open = !state.sidebar.open
        },
        updateSidebarType(state, action){
            state.sidebar.type = action.payload.type;
        },
        LoggedUser(state, action) {
            state.user = Auth.user ? Auth.user : null;
          },
        logout(state, action){
            state.user = null;
        }
        
    }
});

// export reducer
export default slice.reducer;

//thunk functions - perform async operations
export function ToggleSidebar (){
    return async () =>{
        dispatch(slice.actions.toggleSidebar());
    }
}

export function LoggedUser (){
    return async () =>{
        dispatch(slice.actions.LoggedUser());
    }
}

export function SetLogout() {
  return async () => {
    // Clear user data from local storage
    localStorage.removeItem("auth");

    // Dispatch the logout action
    dispatch(slice.actions.logout());
  };
}


export function UpdateSidebarType (type){
    return async () =>{
        dispatch(slice.actions.updateSidebarType({
            type
        }))
    }
}