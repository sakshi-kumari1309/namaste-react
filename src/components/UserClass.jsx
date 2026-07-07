import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      count2: 2,
    };
    
  }

  render() {
    const { name, location } = this.props;
    const { count, count2 } = this.state; 
    console.log(this.state)
    // This line is incorrect and should be removed, as name and location are props, not state.
    return (
      <div className="user-card">
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment Count
        </button>
        <h1>Count: {count}</h1>
        <h1>Count2: {count2}</h1>
        <h1>Name: {name}</h1>
        <p>Location: {location}</p>
        <h4>Contact: @Ksakshi</h4>
      </div>
    );
  }
}

export default UserClass;
