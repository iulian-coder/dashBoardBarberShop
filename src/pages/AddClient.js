import React from "react";
import axios from "../api/axios";
import apiRoute from "../api/apiRoute";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

function AddClient() {
  const { register, handleSubmit } = useForm();
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
                ref={register({ required: true })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputlastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputlastName"
                placeholder="Last Name"
                name="lastName"
                ref={register({ required: true })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputemail">Email</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputemail"
                placeholder="Email"
                name="email"
                ref={register({ required: true })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputphone">Phone</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPhoneNo"
                placeholder="Phone"
                name="phoneNo"
                ref={register({ required: true })}
              />
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
