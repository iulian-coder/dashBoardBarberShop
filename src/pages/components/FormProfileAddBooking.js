import React from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "../../api/axios";
import apiRoute from "../../api/apiRoute";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function FormProfileAddBooking({ clientId }) {
  const { handleSubmit, control, register } = useForm();

  const onSubmit = (data) => {
    let BookingDTO = {
      clientId: clientId,
      bookingDate: data.bookingDate,
      bookingNotes: data.bookingNotes,
    };
    addBooking(BookingDTO)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group row">
        <label htmlFor="bookingDate" className="col-sm-2 col-form-label">
          Date
        </label>
        <div className="col-sm-10">
          <Controller
            name="bookingDate"
            defaultValue={new Date()}
            control={control}
            render={({ onChange, value }) => (
              <DatePicker
                selected={value}
                onChange={onChange}
                minDate={new Date()}
                showDisabledMonthNavigation
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Click to select date"
              />
            )}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="inputBookingNotes" className="col-sm-2 col-form-label">
          Notes
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="inputSpecialRequest"
            placeholder="Notes"
            name="bookingNotes"
            ref={register()}
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="offset-sm-2 col-sm-10">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormProfileAddBooking;

async function addBooking(data) {
  try {
    let responseData = await axios.post(apiRoute.bookings, data);
    return responseData.data;
  } catch (error) {
    console.log(error);
  }
}
