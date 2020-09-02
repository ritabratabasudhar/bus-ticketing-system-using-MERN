// import React from "react";
// //import loginImg from "./login.svg";
import './payment.css'
import history from '../history/history'
import store from '../redux/store'




// export default class Payment extends React.Component {


//   constructor(props) {
//     super(props);
//     this.state = {
//       username: "",
//       password: "",
//       cvv:"",
//       month:"",
//       year:""
//     }
//   }
//   handleChangeAll = (event) => {
//     this.setState({
//       [event.target.name]: event.target.value
//     },()=>console.log(this.state))

//   }
//   checkName = () => {
//     console.log(this.state)
//   }
//   handleSubmit = evt => {
//     if (!this.canBeSubmitted()) {
//       evt.preventDefault();
//       return;
//     }


//   };

//  canBeSubmitted() {
//    const { username, password,cvv,month,year} = this.state;
//    return ((username.length > 0 && password.length>0)&&cvv.length > 2)&&(month.length>0&&year.length>0);
//  }

//   render() {
//     const isEnabled = this.canBeSubmitted()

//     return (

//       <div className="container" id="paymentpage">
//         <div className="header">Payment</div>
//         <div className="content" id="payment">

//           <div className="form">
//             <div className="form-group">
//               <label htmlFor="username">Card Holder name</label>
//               <input type="text" name="username" placeholder="card holder name" onChange={this.handleChangeAll} />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password">Card Number</label>
//               <input type="number" name="password" placeholder="card number" onChange={this.handleChangeAll} />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password">Cvv</label>
//               <input type="password"  name="cvv" placeholder="cvv" onChange={this.handleChangeAll} id="cvvNumber" />
//             </div>
//             <div className="form-group">
//               <div className="row">
//                 <div className="col-sm-4">
//                   <h4>Expiry</h4>
//                 </div>

//                 <div className="col-sm-4">
//                   <label for="sel1"> Month</label>
//                   <select class="form-control" id="sel1" name="month" onChange={this.handleChangeAll}>
//                     <option value="jan">jan</option>
//                     <option value="jan">Feb</option>
//                     <option value="jan">Mar</ option>
//                     <option value="jan">Apr</option>
//                     <option value="jan">May</option>
//                     <option value="jan">June</option>
//                     <option value="jan">July</option>
//                     <option value="jan">Aug</option>
//                     <option value="jan">Sept</option>
//                     <option value="jan">Oct</option>
//                     <option value="jan">Nov</option>
//                     <option value="jan">Dec</option>
//                   </select>
//                 </div>
//                 <div className="col-sm-4">
//                   <label for="sel1">Date</label>
//                   <select class="form-control" id="sel1" name="year" onChange={this.handleChangeAll}>
//                     <option>2021</option>
//                     <option>2022</option>
//                     <option>2023</option>
//                     <option>2024</option>
//                   </select>
//                 </div>

//               </div>
//             </div>

//           </div>
//           <div className="footer">
//             <button disabled={!isEnabled} onClick={this.handleSubmit} type="button" className="btn btn-dark ">
//               Pay Now
//           </button>
//   <button onClick={this.handleSubmit} type="button" className="btn btn-danger ">
//     Cancel
// </button>
//           </div>
//         </div>

//       </div>

//     );
//   }
// }
import React, { Component } from "react";


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

class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      password: "",
      month: "",
      year: "",
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      }
    };
  }




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

      case "password":
        formErrors.password =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };
  handleSubmit = evt => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    history.push('/confirmationPage')
  };

  canBeSubmitted() {
    const { firstName, lastName, password, month, year } = this.state;
    return ((firstName.length > 0 && lastName.length > 0) && password.length > 2) && (month.length > 0 && year.length > 0);
  }

  render() {
    const { formErrors } = this.state;
    const isEnabled = this.canBeSubmitted()
    const storeValue=store.getState();

    return (
      <div className="container-fluid" id="mainPayment" >
        <div className="header"><h1>PAYMENT</h1></div>
        <div>
          <div className="row" style={{border:"2px solid black",backgroundColor:"rgb(151, 113, 18)"}}>
            <div className="col-sm-4" id="payment"></div>
            <div className="col-sm-4" id="formsection">
              <div className="form" >
                <form onSubmit={this.handleSubmit} noValidate>
                  <div className="form-group">
                    <div className="firstName">
                      <label htmlFor="firstName">Card Holder Name</label><br></br>
                      <input
                        className={formErrors.firstName.length > 0 ? "error" : null}
                        placeholder="CARD HOLDER NAME"
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
                      <label htmlFor="phoneNumnber">Card Number</label><br></br>
                      <input
                        className={formErrors.lastName.length > 0 ? "error" : null}
                        placeholder="Card Number"
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
                    <div className="password">
                      <label htmlFor="password">Cvv Number</label><br></br>
                      <input
                        className={formErrors.password.length == 3 ? "error" : null}
                        placeholder="Cvv Number"
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
                    <div className="row">
                      <div className="col-sm-4">
                        <h4>Expiry</h4>
                      </div>

                      <div className="col-sm-4">
                        <label for="sel1"> Month</label>
                        <select class="form-control" id="sel1" name="month" onChange={this.handleChange}>
                          <option value="jan">jan</option>
                          <option value="jan">Feb</option>
                          <option value="jan">Mar</ option>
                          <option value="jan">Apr</option>
                          <option value="jan">May</option>
                          <option value="jan">June</option>
                          <option value="jan">July</option>
                          <option value="jan">Aug</option>
                          <option value="jan">Sept</option>
                          <option value="jan">Oct</option>
                          <option value="jan">Nov</option>
                          <option value="jan">Dec</option>
                        </select>
                      </div>
                      <div className="col-sm-4">
                        <label for="sel1">Date</label>
                        <select class="form-control" id="sel1" name="year" onChange={this.handleChange}>
                          <option>2021</option>
                          <option>2022</option>
                          <option>2023</option>
                          <option>2024</option>
                        </select>
                      </div>

                    </div>
                  </div>

                  <div className="footer">
                    <button disabled={!isEnabled} onClick={this.handleSubmit} class="btn btn-dark" type="submit">submit</button>
                    <button onClick={this.handleSubmit} type="button" className="btn btn-danger">
                      Cancel
                 </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-sm-2" id="p1" style={{border:"2px red black"}}>
              <div id="priceSection">
              <h2>Total Price</h2>
                      <h3>Rs {storeValue.totalPrice}/-</h3></div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Payment;