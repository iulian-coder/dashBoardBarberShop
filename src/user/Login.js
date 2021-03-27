import React from "react";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { ApiRoutes } from "../routes";
import { UsePost } from "../api/apiUtil";
import {
  GOOGLE_AUTH_URL,
  FACEBOOK_AUTH_URL,
  ACCESS_TOKEN,
} from "../constants/index";
import { useHistory } from "react-router-dom";

function Login() {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    UsePost({ url: ApiRoutes.login, params: data })
      .then((res) => {
        localStorage.setItem(ACCESS_TOKEN, res.accessToken);
        history.push("/");
        history.go(0);
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
          console.log(error.response);
        } else {
          toast.error("Something went wrong ! Login");
          toast.error(error.message);
        }
      });
  };

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <h1>Login</h1>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  ref={register({
                    required: {
                      message: "This field is mandatory",
                      value: true,
                    },
                    // pattern: {
                    //   message: "E-mail address",
                    //   value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                    // },
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
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  ref={register({
                    required: {
                      message: "This filed is mandatory",
                      value: true,
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
                    Sign In
                  </button>
                </div>
              </div>
            </form>
            <div className="social-auth-links text-center mt-2 mb-3">
              <a href={FACEBOOK_AUTH_URL} className="btn btn-block btn-primary">
                <i className="fab fa-facebook mr-2" /> Sign in using Facebook
              </a>
              <a href={GOOGLE_AUTH_URL} className="btn btn-block btn-danger">
                <i className="fab fa-google mr-2" /> Sign in using Google
              </a>
            </div>
            {/* <p className="mb-1">
              <a href="/">I forgot my password</a>
            </p> */}
            <p className="mb-0">
              <a href="/signup" className="text-center">
                Register a new membership
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
