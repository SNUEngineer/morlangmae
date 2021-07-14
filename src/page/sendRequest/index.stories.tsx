import React from "react";
import SendRequesterPage from "./SendRequesterPage";
import { SendRequesterData } from "../../services/task.service";
import { Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
export default { title: "SendRequester" };

export function basic() {
  async function handleSendRequester(request: SendRequesterData) {}

  const test = async (request: SendRequesterData) => {
    return null;
  };
  return (
    <Router>
      <Route>
        <SendRequesterPage handleSubmit={handleSendRequester} />
      </Route>
    </Router>
  );
}

// export function companyCodeFilled() {
//   return (
//     <SendRequester companyCode="APPL" />
//   );
// };
