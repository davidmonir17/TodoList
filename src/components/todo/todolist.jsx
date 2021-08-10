import React, { useState } from 'react';
import TaskList from '../taskList';
import { useHistory } from "react-router-dom";
import CompleteTask from '../completeTask';


const TODO = props=>{

      
    const history = useHistory();
    //const [addTodo, { data, loading, error }] = useMutation(ADD_TODO);
    const[onelist,setanylist]=useState(false);
    return( <div className='todo-app'>
        <div>
        <h1>what squedual list</h1>
        <select className="select-opt" onChange={e=>{setanylist(e.target.value); }}>
            <option value="false">UnCompleted List</option>
            <option value="true">Completed List</option>
        </select>
        </div>
        {console.log(onelist)}
        {onelist==="false"||onelist===false?(
        <TaskList  {...props}/>
        ):(
            <CompleteTask {...props}/>
        )
        }
        <button className='todo-button ' onClick={ ()=>{history.push('/addtodo')}}>Add</button>
        <button className='todo-button ' onClick={ ()=>{history.push('/paginat')}}>Completed Task Paginated</button> 
        </div>
        )
    
};
//()=>{updateTodo({variables:{ title:"createMission",description:"create mission that create multi tasks",duedate:"2021-08-08",completed:false,id:"cks2eeuhkmzyw0c47o4gpveeg"} })}}
export default TODO;