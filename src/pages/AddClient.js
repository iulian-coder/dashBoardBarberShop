import React from "react";
import axios from "../api/axios";
import apiRoute from "../api/apiRoute";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function AddClient() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    addClient(data)
      .then((res) => {
        toast.success(`Add Client+${res.firstName} !`);
        history.push(`/clients/${res.clientId}`);
      })
      .catch((error) => {
        toast.error("Something went wrong! Add Client");
        history.push({
          pathname: "/error",
          state: { detail: error.message },
        });
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
              <label htmlFor="exampleInputemail">Email</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputemail"
                placeholder="Email"
                name="email"
                ref={register({
                  required: { message: "This field is required", value: true },
                })}
              />
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputphone">Phone</label>
              <input
                type="number"
                className="form-control"
                id="exampleInputPhoneNo"
                placeholder="Phone"
                name="phoneNo"
                ref={register({
                  required: { message: "This field is required", value: true },
                  minLength: {
                    message: "This field cannot be less then 4 digits",
                    value: 4,
                  },
                  maxLength: {
                    message: "This field cannot exceed 15 characters",
                    value: 15,
                  },
                })}
              />
              {errors.phoneNo && (
                <small className="text-danger">{errors.phoneNo.message}</small>
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

async function addClient(data) {
  const response = await axios.post(apiRoute.clients, data);

  return response.data;
}
