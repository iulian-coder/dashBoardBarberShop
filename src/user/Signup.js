import React from "react";
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL } from "../constants/index";
import { useForm } from "react-hook-form";
import { UsePost } from "../api/apiUtil";
import apiRoute from "../api/apiRoute";
function Signup() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    UsePost({ url: apiRoute.signup, params: data }).then((res) => {
      console.log(res);
    });
  };
  return (
    <div className="register-box">
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
                ref={register}
              />
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
  );
}

export default Signup;
