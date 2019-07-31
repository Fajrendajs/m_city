import React, { Component } from "react";
import FormField from "../ui/formfields";
import { validate } from "../ui/misc";
import { firebase } from "../../firebase";

class Signin extends Component {
  state = {
    formerror: false,
    formsuccess: "",
    formdata: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        validationmessage: ""
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter your password"
        },
        validation: {
          required: true
        },
        valid: false,
        validationmessage: ""
      }
    }
  };

  updateform(element) {
    const newformdata = { ...this.state.formdata };
    const newelement = { ...newformdata[element.id] };
    newelement.value = element.event.target.value;

    let validdata = validate(newelement);

    newelement.valid = validdata[0];
    newelement.validationmessage = validdata[1];
    newformdata[element.id] = newelement;

    this.setState({
      formerror: false,
      formdata: newformdata
    });
  }
  submitform(event) {
    event.preventDefault();

    let datatosubmit = {};
    let formisvalid = true;

    for (let key in this.state.formdata) {
      datatosubmit[key] = this.state.formdata[key].value;
      formisvalid = this.state.formdata[key].valid && formisvalid;
    }

    if (formisvalid) {
      firebase
        .auth()
        .signInWithEmailAndPassword(datatosubmit.email, datatosubmit.password)
        .then(() => {
          this.props.history.push("/dashboard");
        })
        .catch(error => {
          this.setState({
            formerror: true
          });
        });
      //this.resetformsuccess();
    } else {
      this.setState({
        formerror: true
      });
    }
  }

  render() {
    return (
      <>
        <div>Sign in</div>
        <div className="container">
          2{" "}
          <div className="signin_wrapper" style={{ margin: "100px" }}>
            <form onSubmit={event => this.submitform(event)}>
              <h2>Please Log In</h2>
              <FormField
                id={"email"}
                formdata={this.state.formdata.email}
                change={element => {
                  this.updateform(element);
                }}
              />
              <FormField
                id={"password"}
                formdata={this.state.formdata.password}
                change={element => {
                  this.updateform(element);
                }}
              />
              {this.state.formerror ? (
                <div className="error_label">Something is wong. Try again</div>
              ) : null}
              <button onClick={event => this.submitform(event)}>Log In</button>
            </form>
          </div>
        </div>
      </>
    );
  }
}
export default Signin;
