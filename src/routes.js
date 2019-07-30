import React from "react";
import Layout from "./Hoc/layout.js";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import Signin from "./Components/signin";

const Routes = props => {
  return (
    <Layout>
      <Switch>
        <Route exact component={Signin} path="/sign_in" />
        <Route exact component={Home} path="/" />
      </Switch>
    </Layout>
  );
};
export default Routes;
