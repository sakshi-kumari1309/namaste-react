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
      <div className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="mb-3 text-4xl font-bold text-white">About Us</h1>

        <p className="mb-8 text-lg text-gray-400">This is the About page.</p>

        <div className="space-y-6">
          <User name={"Sakshi (function)"} location={"Bangalore"} />

          <UserClass name={"Sakshi (class)"} location={"Bangalore"} />
        </div>
      </div>
    );
  }
}

export default About;
