import React from "react";
import { Route, Switch } from "react-router-dom";

import { Home } from "../pages/Home";
import { RegisterUser } from "../pages/RegisterUser";
import { ListUsers } from "../pages/ListUsers";
import { UserDetails } from "../pages/UserDetails";

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register-user" component={RegisterUser} />
      <Route path="/list-users" exact component={ListUsers} />
      <Route path="/user-details/:id" exact component={UserDetails} />
    </Switch>
  );
}
