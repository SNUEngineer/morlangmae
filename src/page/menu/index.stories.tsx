import React from "react";
import MenuPage from "./MenuPage";

import { Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
export default { title: "Menu" };

export function basic() {
  return (
    <Router>
      <Route>
        <MenuPage />
      </Route>
    </Router>
  );
}

// export function companyCodeFilled() {
//   return (
//     <Menu companyCode="APPL" />
//   );
// };
