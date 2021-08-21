import React from "react";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Programming from "./components/Programming";
import Home from "./components/Home";
import Createprogramming from "./components/Createprogramming";
import Editprogramming from "./components/Editprogramming";
import Login from "./components/Login";
import Auth from "./guard/Auth";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function App() {
  //const cachData = localStorage.getItem("cachData");
  return (
    <div>
      <Router>
      
        <Switch> 
        {/* {!cachData ? "" : [<Header />, <Menu />]} */}
          <Route path="/" exact component={() => <Login />} />
          <Auth exact path="/Home">
            <Header />
            <Menu />
            <Home />
            <Footer />
          </Auth>
          <Auth exact path="/Programming">
            <Header />
            <Menu />
            <Programming />
            <Footer />
          </Auth>
          <Auth exact path="/Createprogramming">
            <Header />
            <Menu />
            <Createprogramming />
            <Footer />
          </Auth>
          <Auth exact path="/Editprogramming">
            <Header />
            <Menu />
            <Editprogramming />
            <Footer />
          </Auth>
        </Switch>
        {/* {!cachData ? "" : <Footer />} */}
        {/* <Auth path="/Programming" exact component={() => <Programming />} />
            <Auth path="/Createprogramming" exact component={() => <Createprogramming/>} />
            <Auth path="/Editprogramming" exact component={() => <Editprogramming/>} /> */}
      </Router>
    </div>
  );
}
