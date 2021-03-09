import React from "react";
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from "../constants/index";
import { useForm } from "react-hook-form";
import { UsePost } from "../api/apiUtil";
import apiRoute from "../api/apiRoute";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

function Signup() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    console.log(data);
    UsePost({ url: apiRoute.signup, params: data })
      .then((res) => {
        toast.success(res.message);
        history.push("/login");
      })
      .catch((error) => {
        if (error.response.data.message) {
          toast.error(error.response.data.message);
          toast.error(error.response.data.details.join(" | "));
        } else {
          history.push({
            pathname: "/error",
            state: { detail: error.message },
          });
        }
      });
  };
  return (
    <div className="content-wrapper">
      <div>
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <a href="/" className="h1">
              <b>Admin</b>LTE
            </a>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Register a new membership</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-3">
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Full name"
                  ref={register({
                    required: {
                      message: "This field is mandatory",
                      value: true,
                    },

                    minLength: {
                      message: "This field cannot be less then 3 characters",
                      value: 3,
                    },
                    maxLength: {
                      message: "This field cannot exceed 50 characters",
                      value: 50,
                    },
                    pattern: {
                      message: "Full name",
                      value: /^[a-z ,.'-]+$/i,
                    },
                  })}
                />
                {errors.name && (
                  <small className="text-danger">{errors.name.message}</small>
                )}
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  ref={register({
                    required: {
                      message: "This field is mandatory",
                      value: true,
                    },
                    pattern: {
                      message: "E-mail address",
                      value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                    },
                  })}
                />
                {errors.email && (
                  <small className="text-danger">{errors.email.message}</small>
                )}
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  ref={register({
                    required: {
                      message: "This filed is mandatory",
                      value: true,
                    },
                    minLength: {
                      message: "The password bust have more than 4 characters",
                      value: 4,
                    },
                    maxLength: {
                      message: "The password bust be less than 10 characters",
                      value: 10,
                    },
                  })}
                />
                {errors.password && (
                  <small className="text-danger">
                    {errors.password.message}
                  </small>
                )}
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <button type="submit" className="btn btn-primary btn-block">
                    Register
                  </button>
                </div>
              </div>
            </form>
            <div className="social-auth-links text-center">
              <a href={FACEBOOK_AUTH_URL} className="btn btn-block btn-primary">
                <i className="fab fa-facebook mr-2" />
                Sign up using Facebook
              </a>
              <a href={GOOGLE_AUTH_URL} className="btn btn-block btn-danger">
                <i className="fab fa-google mr-2" />
                Sign up using Google
              </a>
            </div>
            <a href="/login" className="text-center">
              I already have a membership
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
