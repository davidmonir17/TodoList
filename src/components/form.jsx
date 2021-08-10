import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import AddTodo from './addTodo'
const Form = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    function submitForm() {
        setIsSubmitted(true);
      }
    return (
        <>
        <div className='form-container'>

         {!isSubmitted ? (
            <AddTodo  submitForm={submitForm} />
        ) : (
            <Redirect to="/" />
        )} 
        {/* <AddTodo  submitForm={submitForm}/> */}
       

        </div>
    </>
    )
}

export default Form
