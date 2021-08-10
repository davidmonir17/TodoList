import React, { useState } from 'react'
import {gql, useQuery,useMutation} from '@apollo/client'
import {  Redirect, Route } from 'react-router-dom';
import DetailTodo from './detailesTodo';
import { render } from '@testing-library/react';
import { NetworkStatus } from '@apollo/client';

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
mutation MyMutation($completed:Boolean!,$id:ID!) {
    updateTask(data:{completed:$completed},where:{id:$id}) {
    id
    }
}
`;
const taskquery=gql`
query GetTasks {
tasks {
    title
    duedate
    completed
    description
    id
}
}`


const CompleteTask = props => {
    const{ loading, error, data,refetch, networkStatus } = useQuery( taskquery ,{
        notifyOnNetworkStatusChange: true,
    }
        );
        const [updateTodo, {}] = useMutation(Update_TODO);
        const [publishTodo, { }] = useMutation(PublishTodo);
        
        
        if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
        if(loading) return <p>Loading...</p>;
        if (error) return <p>Error :</p>;
   
    return (
        <div id="root" className="todo-app ">
         
            {data.tasks.map(({title,completed,id})=>(
                
                <>
                {
                  //mkan al false =props w ta7t fl update mkan al ay 7aga un props
                completed ===true  && 
                <div  >
                <div id={id} className={completed ? 'todo-row-ended complete' : 'todo-row'}>
                <div className="dsa" style= {{cursor: "pointer" }} onClick={()=>{
                props.history.push('/details',{myprops:id})
                }}>
                <div  key={id}> {title}
                </div>
                </div>
                <input type="checkbox" value={id} onChange={ e=>{updateTodo({variables:{completed:false,id:id}}); document.getElementById(e.target.value).style.display = "none"; publishTodo();
                refetch();
          }} />            
                  </div>
                  </div>
                }
                </>
            ))}
        </div>
        
    )
}

export default CompleteTask
