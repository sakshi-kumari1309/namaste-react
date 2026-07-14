import React, { Component } from "react";
import User from "./User";
import UserClass from "./UserClass";

class About extends Component {
  constructor(props) {
    super(props);
    console.log("Parent constructor");
  }

  componentDidMount() {
    console.log("Parent componentDidMount");
  }

  render() {
    console.log("Parent render");
    return (
      <div>
        <h1>About Us</h1>
        <p>This is the About page.</p>
        <User name={"Sakshi (function)"} location={"Bangalore"} />
        <UserClass name={"Sakshi (class)"} location={"Bangalore"} />
      </div>
    );
  }
}

export default About;
