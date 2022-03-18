import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useMoralis } from "react-moralis";
import { Button } from "@chakra-ui/button";
import { Heading, Container, Box } from "@chakra-ui/layout";

import { BurbsDashboard } from "./containers/BurbsDashboard";

function App() {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
  } = useMoralis();

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user!.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const logOut = async () => {
    await logout();
    console.log("logged out");
  };

  const headerJSX = () => {
    return (
      <Box>
        <Heading textAlign='center'>Burb Rarity Link Generator</Heading>
        <Button isLoading={isAuthenticating} onClick={login}>
          Metamask Login
        </Button>
        <Button onClick={logOut} disabled={isAuthenticating}>
          Logout
        </Button>
      </Box>
    )
  }

  if (isAuthenticated) {
    return (
      <Container maxW="container.md">
        {headerJSX()}
        <BurbsDashboard />
      </Container>
    );
  }
  return (
    <Container maxW="container.md">
      {headerJSX()}
    </Container>
  );
}

export default App;
