import React from "react";
import axios from "../api/axios";
import apiRoute from "../api/apiRoute";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import _ from "lodash/fp";

function AddClient() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    addClient(data)
      .then((res) => {
        if (res.clientId >= 0) {
          history.push("/clients");
        }
      })
      .catch((error) => {
        console.log(error);
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
                  required: true,
                  minLength: 3,
                  maxLength: 20,
                  pattern: /^[A-Za-z]+$/i,
                })}
              />
              {_.get("firstName.type", errors) === "required" && (
                <p>This field is required</p>
              )}
              {_.get("firstName.type", errors) === "maxLength" && (
                <p>First name cannot exceed 20 characters</p>
              )}
              {_.get("firstName.type", errors) === "minLength" && (
                <p>First name cannot be less then 3 characters</p>
              )}
              {_.get("firstName.type", errors) === "pattern" && (
                <p>Alphabetical characters only</p>
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
                  required: true,
                  minLength: 3,
                  maxLength: 20,
                  pattern: /^[A-Za-z]+$/i,
                })}
              />
              {_.get("lastName.type", errors) === "required" && (
                <p>This field is required</p>
              )}
              {_.get("lastName.type", errors) === "maxLength" && (
                <p>Last name cannot exceed 20 characters</p>
              )}
              {_.get("lastName.type", errors) === "minLength" && (
                <p>Last name cannot be less then 3 characters</p>
              )}
              {_.get("lastName.type", errors) === "pattern" && (
                <p>Alphabetical characters only</p>
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
                  required: true,
                })}
              />
              {_.get("email.type", errors) === "required" && (
                <p>This field is required</p>
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
                ref={register({ required: true, minLength: 4, maxLength: 15 })}
              />
              {_.get("phoneNo.type", errors) === "required" && (
                <p>This field is required</p>
              )}
              {_.get("phoneNo.type", errors) === "minLength" && (
                <p>This number must be more then 4 digits</p>
              )}
              {_.get("phoneNo.type", errors) === "maxLength" && (
                <p>This number cannot exceed 15 digits</p>
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
  try {
    let dataResponse = await axios.post(apiRoute.clients, data);
    return dataResponse.data;
  } catch (error) {
    console.log(error);
  }
}
