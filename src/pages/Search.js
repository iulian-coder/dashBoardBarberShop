import React, { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import apiRoute from "../api/apiRoute";
import axios from "../api/axios";
import { useHistory } from "react-router-dom";

function Search() {
  const [items, setItems] = useState([]);

  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(apiRoute.clients + `/search-client`)
        .then(({ data }) => {
          setItems(data);
        })
        .catch((error) => {
          history.push({
            pathname: "/error",
            state: { detail: error.message },
          });
        });
    }
    fetchData();
  }, [history]);

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
              <ReactSearchAutocomplete
                items={items}
                fuseOptions={{ keys: ["firstName", "lastName", "phoneNo"] }}
                resultStringKeyName="nameAndPhone"
                placeholder="Type Name or Phone"
                onSelect={handleOnSelect}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Search;
