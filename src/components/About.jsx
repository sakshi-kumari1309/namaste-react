import React from "react";
import User from "./User";
import UserClass from "./UserClass";

const About = () => {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is the About page.</p>
      <User name={"Sakshi (function)"} location={"Bangalore"} />
      <UserClass name={"Sakshi (class)"} location={"Bangalore"} />
    </div>
  );
};
export default About;
