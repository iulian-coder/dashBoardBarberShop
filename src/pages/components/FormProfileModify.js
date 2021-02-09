import React from "react";
import { useForm } from "react-hook-form";
import axios from "../../api/axios";
import apiRoute from "../../api/apiRoute";
import _ from "lodash/fp";

function FormProfileModify({ clientData }) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (formData) => {
    let updateData = {
      clientId: clientData.clientId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNo: formData.phoneNo,
    };
    updateClient(updateData).then((res) => {
      if (res) {
        window.location.reload();
      } else {
        console.log("error");
      }
    });
  };

  return (
    <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group row">
        <label htmlFor="inputFirstName" className="col-sm-2 col-form-label">
          First Name
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="inputFirstName"
            defaultValue={clientData.firstName}
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
      </div>
      <div className="form-group row">
        <label htmlFor="inputLastName" className="col-sm-2 col-form-label">
          Last Name
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="inputLastName"
            placeholder="Last Name"
            defaultValue={clientData.lastName}
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
      </div>
      <div className="form-group row">
        <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
          Email
        </label>
        <div className="col-sm-10">
          <input
            type="email"
            className="form-control"
            name="email"
            id="inputEmail"
            placeholder="Email"
            defaultValue={clientData.email}
            ref={register({ required: true })}
          />
          {_.get("email.type", errors) === "required" && (
            <p>This field is required</p>
          )}
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputPhoneNo" className="col-sm-2 col-form-label">
          Phone
        </label>
        <div className="col-sm-10">
          <input
            type="number"
            className="form-control"
            id="inputPhoneNo"
            placeholder="Phone"
            name="phoneNo"
            defaultValue={clientData.phoneNo}
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
      <div className="form-group row">
        <div className="offset-sm-2 col-sm-10">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormProfileModify;

async function updateClient(updateData) {
  try {
    const dataResponse = await axios.put(apiRoute.clients, updateData);
    return dataResponse.data;
  } catch (error) {
    console.log(error);
  }
}
