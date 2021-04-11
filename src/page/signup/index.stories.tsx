import React from "react";
import SignUpPage from './SignUpPage';
import { SignUpRequest } from "../../services/user.service";
import {
    Route,
  } from "react-router-dom";
  import {
    BrowserRouter as Router,
  } from 'react-router-dom';
export default { title: 'SignUp' };

export function basic() {
  
      async function handleSignUp(request: SignUpRequest) {
      }
    
    const test = async (request : SignUpRequest) => {
       return null;
      };
  return (
    <Router><Route><SignUpPage handleSubmit={handleSignUp} /></Route></Router>
    
  );
};

// export function companyCodeFilled() {
//   return (
//     <SignUp companyCode="APPL" />
//   );
// };
