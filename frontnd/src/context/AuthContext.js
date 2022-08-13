import React from "react";

export const AuthContext = React.createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { user: action.payload };
    case "logout":
      return { user: null };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, {
    user: null,
  });
  
  // 畫面載入時，會去讀取 localStorage 有沒有 user 登入過的資料
  React.useEffect(() => {
    // localStorage's data is string, need to parse it
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch({ type: 'login', payload: user })
    }
  }, [])

  console.log("AuthContext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
