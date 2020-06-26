import React from "react";
// import { ThemeProvider } from "styled-components";
import { themes, Button, WindowContent, Divider, TextField } from "react95";

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.props.handleLoginSubmit(this.state);
  //   this.setState({ username: "", password: "" });
  // };

  render() {
    return (
      <WindowContent>
        <h1>Welcome Please Login</h1>
        <Divider style={{ marginBottom: 15 }} />
        <form>
          <label htmlFor="username">Username</label>
          <TextField
            className="not-draggable"
            shadow={false}
            onChange={this.handleChange}
            type="text"
            name="username"
            value={this.state.username}
          />
          <label htmlFor="password">Password</label>
          <TextField
            className="not-draggable"
            shadow={false}
            onChange={this.handleChange}
            type="password"
            name="password"
            autoComplete="password"
            value={this.state.password}
          />
          <Divider style={{ marginTop: 15 }} />
          <Button style={{ marginTop: 35 }} onClick={this.handleSubmit}>
            Submit
          </Button>
        </form>
      </WindowContent>
    );
  }
}

export default Login;