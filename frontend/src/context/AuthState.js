import React from "react";
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
const AuthState = () => {
  const [loginState, setLoginState] = useState({
    loggedIn: false,
    data: {},
  });

  // useEffect(()=>{
  //     if(localStorage.getItem('user')){
  //         const stateData= JSON.parse(localStorage.getItem('user'));
  //         if(stateData.token){
  //             set
  //         }
  //     }
  // })

  return <div></div>;
};

export default AuthState;
