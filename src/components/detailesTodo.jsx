import React  from 'react';
import "./Form.css";
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
const DetailTodo = props => {
    const { loading, error, data } = useQuery(taskquery, {
        variables: { id:props.location.state.myprops },
      });
      var ident=props.location.state.myprops;
    
      if (loading) return null;
      if (error) return `Error! ${error}`;
    
    return (  
        <div className='form-container'>
                {/* {console.log(props.location.state.myprops)} */}
                <div className="form-content-right">
                    <div className="form">
                    <h2 className="ds">  Todo Task Details</h2>
                <div className="form-inputs">
                <label className="flabel">Title</label>
                <div className="formview">
                    {data.task.title}
                </div>
                <label className="flabel">Description</label>
                <div className="formview">
                {data.task.description}
                </div>
                <label className="flabel">Due Date</label>
                <div className="formview">
                {data.task.duedate} 
                </div>
            <label className="flabel">Is Completed</label>
            
            <div className="formview">
            {data.task.completed?("completed"):("UnCompleted")} 
            </div>
                <button className="bt" onClick={()=>{
                  props.history.push('/update',{myprops:ident})
                }} >
                update task
        </button>
                
                
                </div>
                </div>
                </div>
            </div>
        );
}

export default DetailTodo

