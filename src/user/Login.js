import React from "react";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from "../constants/index";

function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  // Shows notification
  if (localStorage.getItem("message")) {
    toast(localStorage.getItem("message"));
    localStorage.removeItem("message");
  }
  return (
    <div className="content-wrapper">
      <div>
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <a href="/" className="h1">
              <b>Administration </b> Board
            </a>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-3">
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  ref={register}
                />
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
                  ref={register}
                />
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
