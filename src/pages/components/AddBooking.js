import React from "react";
import { useForm, Controller } from "react-hook-form";
import apiRoute from "../../api/apiRoute";
import { UsePost } from "../../api/apiUtil";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

function FormProfileAddBooking({ clientId }) {
  const { handleSubmit, control, register, errors } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    let newBooking = {
      clientId: clientId,
      bookingDate: data.bookingDate,
      bookingNotes: data.bookingNotes,
      sendSms: data.sendSms,
    };
    UsePost({ url: apiRoute.bookings, params: newBooking })
      .then((res) => {
        localStorage.setItem(
          "message",
          `New booking ID:${res.id} created  ${
            data.sendSms
              ? "SMS Developer account works only with register numbers"
              : ""
          }`
        );

        history.go(0);
      })
      .catch((error) => {
        toast.error("Something went wrong ! Add Booking");
        history.push({
          pathname: "/error",
          state: { detail: error.message },
        });
      });
  };

  return (
    <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group row">
        <label htmlFor="bookingDate" className="col-sm-2 col-form-label">
          Date
        </label>
        <div className="col-sm-10">
          {window.innerWidth <= 500 ? (
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
                  disabledKeyboardNavigation
                  closeOnScroll={false}
                  timeInputLabel="Time: "
                  showTimeInput
                  timeFormat="HH:mm"
                  dateFormat="MMMM d, yyyy HH:mm"
                  placeholderText="Click to select date"
                />
              )}
              rules={{
                validate: (data) => {
                  const dateSelected = new Date(data);
                  const dateNow = new Date();
                  return dateSelected.valueOf() >= dateNow.valueOf();
                },
              }}
            />
          ) : (
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
                  disabledKeyboardNavigation
                  closeOnScroll={false}
                  showTimeSelect
                  timeFormat="HH:mm"
                  dateFormat="MMMM d, yyyy HH:mm"
                  placeholderText="Click to select date"
                />
              )}
              rules={{
                validate: (data) => {
                  const dateSelected = new Date(data);
                  const dateNow = new Date();
                  return dateSelected.valueOf() >= dateNow.valueOf();
                },
              }}
            />
          )}
        </div>
        {errors.bookingDate && (
          <small className="text-danger">The date must be in the future!</small>
        )}
      </div>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label" htmlFor="flexCheckDefault">
          Send SMS
        </label>
        <div className="form-check">
          <input
            name="sendSms"
            ref={register}
            className="form-check-input"
            type="checkbox"
            defaultValue
            id="flexCheckDefault"
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
            ref={register({
              maxLength: {
                message: "This field cannot be longer then 70 characters",
                value: 70,
              },
            })}
          />
          {errors.bookingNotes && (
            <small className="text-danger">{errors.bookingNotes.message}</small>
          )}
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
