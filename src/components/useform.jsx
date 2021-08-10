import { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
const PublishTodo=gql`
mutation MyMutation {
  publishManyTasksConnection {
    edges {
      node {
        id
      }
    }
  }
}
`;
const ADD_TODO = gql`
mutation MyMutation($title: String!,$description:String!,$duedate:Date!,$completed:Boolean!) {
    createTask(data:{title: $title,description:$description,duedate: $duedate,completed:$completed}) {
    id
    title
    description
    duedate
    completed
    }
}
`;
const useForm = (callback,validate) => {
    const[selectedDate,setSelectedDate]=useState(null);
    const [values, setValues] = useState({
        title: '',
        description: ''
        
    });
    const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
    const [addTodo,{data}] = useMutation(ADD_TODO);
    const [publishTodo, { }] = useMutation(PublishTodo);
    
    // if (loading) return 'Submitting...';
    // if (error) return `Submission error! ${error.message}`;
    
  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    var com=false;
    var da=new Date();
    if(da>selectedDate)
    {
        com=true;
    }
    setErrors(validate(values));
    setIsSubmitting(true);
    if(Object.keys(errors).length === 0){
      console.log(errors);
    addTodo(
        {variables:
            { title:values.title
            ,description:values.description
            ,duedate:selectedDate
            ,completed:com
        }});
        
        publishTodo();
    }
  };
  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
      }
    },
    [errors]
  );

  
  return { handleChange,  values,handleSubmit,setSelectedDate,selectedDate,errors};
};

export default useForm;