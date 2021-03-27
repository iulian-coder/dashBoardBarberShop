import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "../api/axios";
import { UsePut } from "../api/apiUtil";
import apiRoute from "../api/apiRoutes";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function FormProfileModify({ clientId }) {
  const { register, handleSubmit, control, errors, reset } = useForm({
    defaultValues: { phoneNo: "" },
  });

  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(apiRoute.clients + `/${clientId}`)
        .then((res) => {
          reset(res.data);
        })
        .catch((error) => {
          if (error.response) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Something went wrong ! Client Profile");
            toast.error(error.message);
          }
        });
    }
    fetchData();
  }, [reset, clientId]);

  const onSubmit = (formData) => {
    let updateData = {
      clientId: clientId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNo: formData.phoneNo,
    };

    UsePut({ url: apiRoute.clients, params: updateData })
      .then((res) => {
        localStorage.setItem("message", `${res.message}`);
        history.go(0);
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong ! Modify Client Profile");
          toast.error(error.message);
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
            <small className="text-danger">{errors.firstName.message}</small>
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
            ref={register({
              required: { message: "This field is required", value: false },
            })}
          />
          {errors.email && (
            <small className="text-danger">{errors.email.message}</small>
          )}
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputPhoneNo" className="col-sm-2 col-form-label">
          Phone
        </label>
        <div className="col-sm-10">
          {errors.phoneNo && (
            <small className="text-danger">Please write the phone !</small>
          )}

          <Controller
            name="phoneNo"
            control={control}
            render={({ onChange, value }) => (
              <PhoneInput
                placeholder="Enter phone number"
                country="ro"
                onlyCountries={["ro"]}
                countryCodeEditable={false}
                onChange={onChange}
                value={value}
              />
            )}
            rules={{
              validate: (data) => {
                // Regex Phone Romania country
                const regex = new RegExp(
                  /^(\+?4?0)\s?7\d{2}(\/|\s|\.|-)?\d{3}(\s|\.|-)?\d{3}$/
                );

                return regex.test(data);
              },
            }}
          />
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
