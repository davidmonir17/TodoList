import React from 'react';
import "./Form.css";
import validate from "./validateInfo";
import DatePicker from "react-datepicker";
import UpdateUseform from './updateUseform';
import {gql, useQuery} from '@apollo/client'

const taskquery=gql`
query GetTasks ($id:ID!) {
    task(where: {id:$id}) {
    title
    duedate
    completed
    description
    
}
}`;

const UdatateTodo = ({ idd,submitForm }) => { 
  
    const { loading, error, data } = useQuery(taskquery, {
    variables: { id:idd },
    
});
if (loading) return null;
if (error) return `Error! ${error}`;

const{handleChange,values,handleSubmit,errors,selectedDate,setSelectedDate}=UpdateUseform(submitForm, validate,idd={idd});
// setid(idd);
    return(

        <div className="form-content-right">
            {console.log(idd)}
            <form className="form" onSubmit={handleSubmit}>
            <h1>
         Update your Task by filling out the
          information below.
        </h1>
        <div className="form-inputs">
        
        <label className="form-label">Title</label>
        <input
            placeholder="Add a Title"
            name="title"
            type="text"
            className="form-input"
            value={values?.title||data.task.title}
            onChange={handleChange}
           
            />
          {errors.title && <p>{errors.title}</p>}
            </div>
            <div className="form-inputs">
          <label className="form-label">Description</label>
          <input
            placeholder="Add a description"
            name="description"
            className="form-input"
            type="text"
            value={values?.description||data.task.description}
            onChange={handleChange}
            
        />
        {errors.description && <p>{errors.description}</p>}
        </div>
        <DatePicker
            name="duedate"
            value={selectedDate||data.task.duedate}
             selected={selectedDate}
             onChange={(date) => setSelectedDate(date)}

            dateFormat="yyyy/MM/dd"
          />
          <button className="form-input-btn" type="submit">
          save
        </button>
            </form>
        </div>
       
    );
}

export default UdatateTodo
