import React from "react";

const FormField = ({ formdata, id, change }) => {
  const showerror = () => {
    let errormessage = (
      <div className="error_label">
        {formdata.validation && !formdata.valid
          ? formdata.validationmessage
          : null}
      </div>
    );
    return errormessage;
  };

  const rendertemplate = () => {
    let formtemplate = null;

    switch (formdata.element) {
      case "input":
        formtemplate = (
          <div>
            <input
              {...formdata.config}
              value={formdata.value}
              onChange={event => {
                change({ event, id });
              }}
            />
            {showerror()}
          </div>
        );
        break;
      default:
        formtemplate = null;
    }
    return formtemplate;
  };

  return <div>{rendertemplate()}</div>;
};
export default FormField;
