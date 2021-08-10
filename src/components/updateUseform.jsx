import React from 'react'
import { useState, useEffect } from 'react';
import { gql, useMutation ,useQuery} from '@apollo/client';
const taskquery=gql`
query GetTasks ($id:ID!) {
    task(where: {id:$id}) {
    duedate
    title
    description
    
}
}`;
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
const Update_TODO = gql`
mutation MyMutation($title: String!,$description:String!,$duedate:Date!,$id:ID!) {
    updateTask(data:{title: $title,description:$description,duedate: $duedate},where:{id:$id}) {
    id
    title
    description
    duedate
    completed
    }
}
`;


const UpdateUseform = (callback,validate,{idd}) => {
    const { data } = useQuery(taskquery, {
        variables: { id:idd },
        
        
    });
   
   
    const [values, setValues] = useState({
        title: '',
        description: '',
    });
   
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [updateTodo, {}] = useMutation(Update_TODO);
    const [publishTodo, { }] = useMutation(PublishTodo);
    const[selectedDate,setSelectedDate]=useState(null);
    
    
    

    const handleChange = e => {
       
        const { name, value } = e.target;

        setValues({
          ...values,
          [name]: value
        });
      };

      ////////////////////////
      const handleSubmit = e => {
        
        
        e.preventDefault();
        setErrors(validate(values));
        setIsSubmitting(true);
        if(Object.keys(errors).length === 0){
          //console.log(errors);
          updateTodo(
            {variables:
                { title:(values.title==="")?data.task.title:values.title
                ,description:(values.description==="")?data.task.description:values.description
                ,duedate:(selectedDate===null)?data.task.duedate:selectedDate 
                ,id:idd
            }});
            //console.log(data);
            publishTodo(
                );
               // refetch();
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


      return { handleChange,selectedDate,setSelectedDate , values,handleSubmit,errors};

}

export default UpdateUseform
