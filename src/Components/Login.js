import React, { Component } from "react";
import axios from "axios";
import { notify } from 'react-notify-toast';
import "./login.css";
const number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

class Login extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    typeOfMember: "",
    password: "",
    confirmPassword: "",
    validateNumber: false
  }

  inputChangeHandler(e, key) {
    if (key === "mobileNumber") {
      if (e.target.value !== "") {
        if (number.includes(parseInt(e.target.value % 10))) {
          this.setState({ [key]: parseInt(e.target.value), validateNumber: false })
        } else {
          this.setState({ validateNumber: true })
        }
      } else {
        this.setState({ [key]: "", validateNumber: false })
      }
    } else {
      this.setState({ [key]: e.target.value })
    }
  }

  submitHandler = (e) => {
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword && this.state.password.length > 8 && this.state.typeOfMember !== "") {
      let params = {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        type_of_member: this.state.typeOfMember,
        mobile_number: this.state.mobileNumber,
        password: this.state.password,
        confirm_password: this.state.confirmPassword
      }
      axios
        .post("http://localhost:5000/", params)
        .then(res => {
          if (res.data.account_created) {
            let message = res.data.msg[0];
            let type = "success";
            notify.show(message, type);
            this.setState({ firstName: "", lastName: "", email: "", typeOfMember: "", mobileNumber: "", password: "", confirmPassword: "", validateNumber: false })
          } else {
            for (var i = 0; i < res.data.msg.length; i++) {
              let message = res.data.msg[i];
              let type = "error";
              notify.show(message, type)
            }
          }
        })
        .catch(err => err);
    } else {
      if (this.state.password !== this.state.confirmPassword) {
        let message = "Password not matched";
        let type = "error";
        notify.show(message, type)
      } else {
        if (this.state.typeOfMember === "") {
          let message = "Type of member required";
          let type = "error";
          notify.show(message, type)

        } else {
          let message = "Password need to be more than 8 characters long";
          let type = "error";
          notify.show(message, type)
        }
      }
    }
  }

  render() {
    return (
      <div className="d-flex justify-content-center animated bounceInDown delay-1s">
        <div className="col-md-4 registrationForm mt-5">
          <form onSubmit={(e) => this.submitHandler(e)}>
            <h3 className="text-center mb-4 mt-2">Registration</h3>
            <div className="d-flex justify-content-between">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" className="form-control font-weight-bold" placeholder="Enter First Name"
                  onChange={(e) => this.inputChangeHandler(e, "firstName")} value={this.state.firstName} required />
              </div>
              <div className="form-group ml-2">
                <label>Last Name</label>
                <input type="text" className="form-control font-weight-bold" placeholder="Enter Last Name"
                  onChange={(e) => this.inputChangeHandler(e, "lastName")} value={this.state.lastName} required />
              </div>
            </div>
            <div className="form-group">
              <div >
                <label>Email</label>
                <input type="email" className="form-control font-weight-bold" placeholder="Enter Email"
                  onChange={(e) => this.inputChangeHandler(e, "email")} value={this.state.email} required />
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="form-group">
                <label >Type of Member</label>
                <select className="form-control font-weight-bold" onChange={(e) => this.inputChangeHandler(e, "typeOfMember")} value={this.state.typeOfMember} >
                  <option>Type of Member</option>
                  <option>Entrepreneur</option>
                  <option>Investor</option>
                  <option>Incubator</option>
                </select>
              </div>
              <div className="form-group ml-2">
                <label>Mobile Number</label>
                <input className="form-control font-weight-bold" type="tel" placeholder="Enter Mobile Number"
                  onChange={(e) => this.inputChangeHandler(e, "mobileNumber")} value={this.state.mobileNumber} required />
                <p className="mt-2 font-weight-bold" style={{ color: "red" }}>{this.state.validateNumber ? <span>No alphabet </span> : ""}</p>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control font-weight-bold" placeholder="Enter password"
                  onChange={(e) => this.inputChangeHandler(e, "password")} value={this.state.password} required />
                <p className="mt-2 font-weight-bold">{this.state.password.length > 0 ? this.state.password.length <= 8 ? <span style={{ color: "red" }}>Invalid</span> : <span style={{ color: "green" }}>Valid</span> : ""}</p>
              </div>
              <div className="form-group ml-2">
                <label>Confirm Password</label>
                <input type="password" className="form-control font-weight-bold" placeholder="Enter password"
                  onChange={(e) => this.inputChangeHandler(e, "confirmPassword")} value={this.state.confirmPassword} required />
                <p className="mt-2 font-weight-bold">{this.state.confirmPassword.length > 0 ? this.state.password === this.state.confirmPassword ? <span style={{ color: "green" }}>Password matched</span> : <span style={{ color: "red" }}>Password not matched</span> : ""}</p>
              </div>
            </div>
            <p>Password need to be more than 8 characters long</p>
            <div className="d-flex justify-content-center mb-3">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div >
    )
  }
}
export default Login;