import React from "react";
import apiRoute from "../api/apiRoute";
import { UsePost } from "../api/apiUtil";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";

function AddClient() {
  const { register, handleSubmit, control, errors } = useForm();
  const history = useHistory();
  const onSubmit = (data) => {
    UsePost({ url: apiRoute.clients, params: data })
      .then((res) => {
        toast.success(`Add Client ${res.firstName} !`);
        history.push(`/clients/${res.clientId}`);
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
          toast.error(error.response.data.details.join(" | "));
        } else {
          toast.error("Something went wrong ! Add Client");
          toast.error(error.message);
        }
      });
  };

  return (
    <div className="content-wrapper">
      <div className="card card-primary">
        <div className="card-header">
          <h3 className="card-title">Add Client</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="exampleInputfirstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputfirstName"
                placeholder="First Name"
                name="firstName"
                ref={register({
                  required: { message: "This field is required", value: true },
                  maxLength: {
                    message: "This field cannot exceed 20 characters",
                    value: 20,
                  },
                  minLength: {
                    message: "This field cannot be less then 3 characters",
                    value: 3,
                  },
                  pattern: {
                    message: "Alphabetical characters only",
                    value: /^[A-Za-z]+$/i,
                  },
                })}
              />
              {errors.firstName && (
                <small className="text-danger">
                  {errors.firstName.message}
                </small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputlastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputlastName"
                placeholder="Last Name"
                name="lastName"
                ref={register({
                  required: { message: "This field is required", value: true },
                  maxLength: {
                    message: "This field cannot exceed 20 characters",
                    value: 20,
                  },
                  minLength: {
                    message: "This field cannot be less then 3 characters",
                    value: 3,
                  },
                  pattern: {
                    message: "Alphabetical characters only",
                    value: /^[A-Za-z]+$/i,
                  },
                })}
              />
              {errors.lastName && (
                <small className="text-danger">{errors.lastName.message}</small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputemail">Email (optional)</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputemail"
                placeholder="Email"
                name="email"
                ref={register({
                  required: { message: "This field is required", value: false },
                  pattern: {
                    message: "E-mail address",
                    value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                  },
                })}
              />
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputphone">Phone</label>
              <Controller
                name="phoneNo"
                control={control}
                defaultValue={false}
                render={({ onChange }) => (
                  <PhoneInput
                    placeholder="Enter phone number"
                    country="ro"
                    onlyCountries={["ro"]}
                    countryCodeEditable={false}
                    onChange={onChange}
                  />
                )}
                rules={{
                  validate: (data) => {
                    // Regex Romania country
                    const regex = new RegExp(
                      /^(\+?4?0)\s?7\d{2}(\/|\s|\.|-)?\d{3}(\s|\.|-)?\d{3}$/
                    );

                    return regex.test(data);
                  },
                }}
              />
              {errors.phoneNo && (
                <small className="text-danger">
                  Please write phone number !
                </small>
              )}
            </div>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddClient;
