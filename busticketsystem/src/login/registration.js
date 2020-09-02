import React, { Component } from "react";
import loginImg from "./login.svg";
//import "./App.css";
import { register } from './UserFunctions';
import store from '../redux/store'

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: null,
      password: null,
      confirmPassword: null,
      buttonActive:null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    let flag=null;
    if (this.state.password == this.state.confirmPassword) {
      

      if (formValid(this.state)) {
        flag=true;
        this.setState({buttonActive:flag})
        console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
      }
      else{
        alert("enter all field")
      }
    } 
    else {
      alert("password mismatched")
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
    // const newUser = {
    //   first_name: this.state.firstName,
    //   last_name: this.state.lastName,
    //   email: this.state.email,
    //   password: this.state.password
    // }

    // register(newUser).then(res => {
    //   alert("user registered")
    // })
    store.dispatch({ type: "REG_DETAILS", userName: this.state.firstName,password:this.state.password })

  };
  
  

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 10 ? "minimum 10 numbers required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      
      default:
        break;
    }

    this.setState({ formErrors, [e.target.name]: e.target.value }, () => console.log(this.state));
  };
  handleSubmit = evt => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
       
  };

  canBeSubmitted() {
    const { firstName, lastName,email,password,confirmPassword} = this.state;
    return ((firstName.length > 3 && lastName.length>10)&&(password==confirmPassword));
  }

  render() {
    const { formErrors } = this.state;
    const isEnabled = this.canBeSubmitted()

    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
            <form onSubmit={this.handleSubmit} noValidate>
              <div className="form-group">
                <div className="firstName">
                  <label htmlFor="firstName">First Name</label><br></br>
                  <input
                    className={formErrors.firstName.length > 0 ? "error" : null}
                    placeholder="First Name"
                    type="text"
                    name="firstName"
                    noValidate
                    onChange={this.handleChange}
                  /><br></br>
                  {formErrors.firstName.length > 0 && (
                    <span className="errorMessage">{formErrors.firstName}</span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <div className="phoneNumber">
                  <label htmlFor="phoneNumnber">Phone Number</label><br></br>
                  <input
                    className={formErrors.lastName.length > 0 ? "error" : null}
                    placeholder="Phone Number"
                    type="number"
                    name="lastName"
                    noValidate
                    onChange={this.handleChange}
                  /><br></br>
                  {formErrors.lastName.length > 0 && (
                    <span className="errorMessage">{formErrors.lastName}</span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <div className="email">
                  <label htmlFor="email">Email</label><br></br>
                  <input
                    className={formErrors.email.length > 0 ? "error" : null}
                    placeholder="Email"
                    type="email"
                    name="email"
                    noValidate
                    onChange={this.handleChange}
                  /><br></br>
                  {formErrors.email.length > 0 && (
                    <span className="errorMessage">{formErrors.email}</span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <div className="password">
                  <label htmlFor="password">Password</label><br></br>
                  <input
                    className={formErrors.password.length > 0 ? "error" : null}
                    placeholder="Password"
                    type="password"
                    name="password"
                    noValidate
                    onChange={this.handleChange}
                  /><br></br>
                  {formErrors.password.length > 0 && (
                    <span className="errorMessage">{formErrors.password}</span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <div className="confirmPassword">
                  <label htmlFor="confirmPassword">Confirm Password</label><br></br>
                  <input
                    className={formErrors.confirmPassword == false ? "error" : null}
                    placeholder="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    noValidate
                    onChange={this.handleChange}
                  /><br></br>
                  <span>{(this.state.password == this.state.confirmPassword) ? null : "password Mismatched"}</span>
                  
                </div>
              </div>
              <div className="footer">
                <button disabled={!isEnabled} onClick={this.handleSubmit} class="btn btn-success" type="submit">Create Account</button>

              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;