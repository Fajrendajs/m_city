import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import FormField from "../../ui/formfields";
import { firebasepromotions } from "../../../firebase";
import { validate } from "../../ui/misc";

class Enroll extends Component {
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

  resetformsuccess(type) {
    const newformdata = { ...this.state.formdata };
    for (let key in newformdata) {
      newformdata[key].value = "";
      newformdata[key].valid = false;
      newformdata[key].validationmessage = "";
    }

    this.setState({
      formerror: false,
      formdata: newformdata,
      formsuccess: type ? "Congratulations" : "Already in the database"
    });

    this.successmessage();
  }

  successmessage() {
    setTimeout(() => {
      this.setState({
        formsuccess: ""
      });
    }, 2000);
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
      firebasepromotions
        .orderByChild("email")
        .equalTo(datatosubmit.email)
        .once("value")
        .then(snapshot => {
          if (snapshot.val() === null) {
            firebasepromotions.push(datatosubmit);
            this.resetformsuccess(true);
          } else {
            this.resetformsuccess(false);
          }
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
      <Fade>
        <div className="enroll_wrapper">
          <form onSubmit={event => this.submitform(event)}>
            <div className="enroll_title">Enter your email</div>
            <div className="enroll_input">
              <FormField
                id={"email"}
                formdata={this.state.formdata.email}
                change={element => {
                  this.updateform(element);
                }}
              />
              {this.state.formerror ? (
                <div className="error_label">Something is wong. Try again</div>
              ) : null}
              <div className="success_label">{this.state.formsuccess}</div>
              <button onClick={event => this.submitform(event)}>enroll</button>
              <div className="enroll_discl">Lorem Ipsum</div>
            </div>
          </form>
        </div>
      </Fade>
    );
  }
}
export default Enroll;
