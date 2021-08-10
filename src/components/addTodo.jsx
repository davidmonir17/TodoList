import React from "react";
import DatePicker from "react-datepicker";
import useForm from "./useform";
import validate from "./validateInfo";
import "./Form.css";

const AddTodo = ({ submitForm }) => {
  const {
    handleChange,
    values,
    handleSubmit,
    selectedDate,
    setSelectedDate,
    errors,
  } = useForm(submitForm, validate);

  return (
    <div className="form-content-right">
      <form className="form" onSubmit={handleSubmit}>
        <h1>
          Get started with us today! Create your account by filling out the
          information below.
        </h1>
        <div className="form-inputs">
          <label className="form-label">Title</label>
          <input
            placeholder="Add a Title"
            name="title"
            type="text"
            className="form-input"
            value={values?.title}
            onChange={handleChange}
          />
          {errors.title && <p>{errors.title}</p>}
        </div>

        <div className="form-inputs">
          <label className="form-label">Description</label>
          <input
            placeholder="Add a description"
            name="description"
            className="form-input   "
            value={values?.description}
            onChange={handleChange}
          />
          {errors.description && <p>{errors.description}</p>}
        </div>
        <div className="form-inputs">
          <DatePicker
            name="duedate"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy/MM/dd"
          />
          {/* <input type="date" name="duedate" onChange={(date) => setSelectedDate(date)} /> */}
        </div>
        <button className="form-input-btn" type="submit">
          create task
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
