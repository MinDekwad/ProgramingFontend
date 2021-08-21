import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function Auth({ children, ...rest }) {
 
  let isCheck = false;
  const tokenJWT = JSON.parse(localStorage.getItem("cachData"));
  if (tokenJWT) {
    isCheck = true;
  } 
  return (
    <Route
      {...rest}
      render={({ location }) =>
      isCheck ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
