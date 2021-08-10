import React, { useState }  from 'react'
import { Redirect } from 'react-router-dom';
import UdatateTodo from './udatateTodo';


const FormUp = props => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    function submitForm() {
        setIsSubmitted(true);
      }
    return (
        <>
            <div className='form-container'>
            
            {!isSubmitted?(
            <UdatateTodo  idd={props.location.state.myprops} submitForm={submitForm} />
        ) : (
            <Redirect to="/" />
        )} 
            </div>
        </>
    )
}

export default FormUp
