import React from "react";
import loginImg from "./login.svg";
import { login } from './UserFunctions'




export default class Login extends React.Component {
  

  constructor(props) {
    super(props);
    this.state={
      username:"",
      password:""
    }
  }
  handleChangeAll=(event)=>{
    this.setState({
      [event.target.name]:event.target.value
    })

  }
  checkName=()=>{
    console.log(this.state)
  }
  handleSubmit = evt => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    const user = {
      email: this.state.username,
      password: this.state.password
    }

    login(user).then(res => {
      if (res) {
        alert("valid");
      }
    })
    
  };

  canBeSubmitted() {
    const { username, password } = this.state;
    return username.length > 0 && password.length > 0;
  }

  render() {
   const isEnabled= this.canBeSubmitted()
    
    return (
      
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username"  onChange={this.handleChangeAll}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" onChange={this.handleChangeAll} />
            </div>
          </div>
          <div className="footer">
          <button disabled={!isEnabled} onClick={this.handleSubmit} type="button" className="btn btn-success ">
            LogIn
          </button>
        </div>
        </div>
        
      </div>
      
    );
  }
}