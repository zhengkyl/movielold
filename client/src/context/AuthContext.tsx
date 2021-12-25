import React, {createContext, useReducer} from "react"

interface AuthState {
  user: {},
  authenticated: boolean,
  login: ()=>void,
  logout: ()=>void,
  register: ()=>void,
}

const initialState: AuthState = {
  user: null,
  authenticated: false,
  login: ()=>{},
  logout: ()=>{},
  register: ()=>{},
};

enum AuthAction {
  LOGIN, LOGOUT, REGISTER 
}

const AuthContext = createContext(initialState)

const reducer = (state: AuthState, action): AuthState => {
  switch (action.type) {
    case AuthAction.LOGIN:
      return {...state, user: action.user, authenticated: true};
    case AuthAction.LOGOUT:
      return {...state, user: null, authenticated: false}
    case AuthAction.REGISTER:
      return {...state} // TODO what to do on register
    default:
      throw new Error("Unsupported AuthAction");
  }
}

export const AuthContextProvider = ({children})=> {
  const [state, dispatch] = useReducer(reducer, initialState);



  const login = () => {} 
  const logout = () => {} 
  const register = () => {} 

  
  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
  
}

export default AuthContext;