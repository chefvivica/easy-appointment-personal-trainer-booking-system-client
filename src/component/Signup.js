  
import React from "react";
import { themes, Button, WindowContent, Divider, TextField } from "react95";

class Signup extends React.Component {
  state = {
    username: "",
    email: "",
    image: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleSignUpSubmit(this.state);
  };

  render() {
    return (
      <WindowContent style={{ marginTop: -15 }}>
        <h2>Please Signup</h2>
        <Divider style={{ marginBottom: 10 }} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <TextField
            className="not-draggable"
            shadow={false}
            onChange={this.handleChange}
            type="text"
            name="username"
            value={this.state.username}
          />
          <label htmlFor="email">Email</label>
          <TextField
            className="not-draggable"
            shadow={false}
            onChange={this.handleChange}
            type="email"
            name="email"
            value={this.state.email}
          />
          <label htmlFor="image">Profile Image Url</label>
          <TextField
            className="not-draggable"
            shadow={false}
            onChange={this.handleChange}
            type="text"
            name="image"
            value={this.state.image}
          />
          <label htmlFor="password">Password</label>
          <TextField
            className="not-draggable"
            shadow={false}
            onChange={this.handleChange}
            type="password"
            name="password"
            value={this.state.password}
          />
          <Button style={{ marginTop: 5 }} type="submit">
            Submit
          </Button>
        </form>
      </WindowContent>
    );
  }
}

export default Signup;