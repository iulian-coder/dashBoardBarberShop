import React from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import apiRoute from "../api/apiRoute";
import useRequest, { UsePost } from "../api/apiUtil";
import LoadingSpinner from "./common/LoadingSpinner";

function MyProfile() {
  const { apiData } = useRequest({ url: apiRoute.user });
  const history = useHistory();

  const handleDeleteUser = () => {
    UsePost({ url: apiRoute.user })
      .then((res) => {
        toast.success(res);
        history.go(0);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>My Profile</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div className="card card-primary card-outline">
                {!apiData && LoadingSpinner()}
                {apiData && (
                  <div className="card-body box-profile">
                    <div className="text-center">
                      <img
                        className="profile-user-img img-fluid img-circle"
                        src={
                          apiData.imageUrl
                            ? apiData.imageUrl
                            : "../../dist/img/avatar5.png"
                        }
                        alt="User profile"
                      />
                    </div>
                    <h3 className="profile-username text-center">
                      {apiData.name}
                    </h3>
                    <ul className="list-group list-group-unbordered mb-3">
                      <li className="list-group-item">
                        <b>E-mail</b>{" "}
                        <b className="float-right"> {apiData.email}</b>
                      </li>
                      <li className="list-group-item">
                        <b>E-mail verified</b>{" "}
                        <b className="float-right">
                          {" "}
                          {apiData.emailVerified ? "Yes" : "No"}{" "}
                        </b>
                      </li>
                      <li className="list-group-item">
                        <b>Authenticated</b>{" "}
                        <b className="float-right">{apiData.provider}</b>
                      </li>
                    </ul>
                    <button
                      className="btn btn-danger btn-block"
                      onClick={() => handleDeleteUser()}
                    >
                      <b>Delete</b>
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* TAB */}
            {/* 
            <div className="col-md-9">
              <div className="card">
                <div className="card-header p-2">
                  <ul className="nav nav-pills">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        href="#settings"
                        data-toggle="tab"
                      >
                        Settings
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <div className="tab-content">
                    <div className=" active tab-pane" id="settings">
                      <form className="form-horizontal">
                        <div className="form-group row">
                          <label
                            htmlFor="inputName"
                            className="col-sm-2 col-form-label"
                          >
                            Full Name
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="email"
                              className="form-control"
                              id="inputName"
                              placeholder="Name"
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            htmlFor="inputEmail"
                            className="col-sm-2 col-form-label"
                          >
                            Email
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="email"
                              className="form-control"
                              id="inputEmail"
                              placeholder="Email"
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            htmlFor="inputSkills"
                            className="col-sm-2 col-form-label"
                          >
                            Skills
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              className="form-control"
                              id="inputSkills"
                              placeholder="Skills"
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
           */}
            {/* End TAB */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default MyProfile;
