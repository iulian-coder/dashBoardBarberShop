import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import apiRoute from "../api/apiRoutes";
import { useHistory } from "react-router-dom";
import useRequest from "../api/apiUtil";
import LoadingSpinner from "./common/LoadingSpinner";

function Search() {
  const history = useHistory();
  const { apiData } = useRequest({ url: apiRoute.clients + `/search-client` });

  const handleOnSelect = (item) => {
    // the item selected
    history.push(`/clients/${item.id}`);
  };

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="container-fluid">
          <h2 className="text-center display-4">Search</h2>
          <div className="row">
            <div className="col-md-8 offset-md-2">
              {!apiData && LoadingSpinner()}
              {apiData && (
                <ReactSearchAutocomplete
                  items={apiData}
                  fuseOptions={{ keys: ["firstName", "lastName", "phoneNo"] }}
                  resultStringKeyName="nameAndPhone"
                  placeholder="Type Name or Phone"
                  onSelect={handleOnSelect}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Search;
