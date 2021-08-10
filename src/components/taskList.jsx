import React, { useEffect, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { NetworkStatus } from "@apollo/client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PublishTodo = gql`
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
  mutation MyMutation($completed: Boolean!, $id: ID!) {
    updateTask(data: { completed: $completed }, where: { id: $id }) {
      id
    }
  }
`;

const taskquery = gql`
  query GetTasks {
    tasks {
      title
      duedate
      completed
      description
      id
    }
  }
`;
const notify = (title) => {
  toast.info(title);
};

const cheakFun = (values) => {
  let da = new Date()
 da= da.toISOString().split('T')[0];  
 var min=null;
  values.tasks.map(({title,duedate})=>{
    min=Date.parse (duedate)-Date.parse(da);
    console.log(min);
   min=(min / (1000*60*60*24));
   console.log(min);
   if(min<=1){
    
    notify(title);
   }
   return;
  })

  
};
toast.configure();
const TaskList = (props) => {
  const { loading, error, data, refetch, networkStatus } = useQuery(taskquery, {
    notifyOnNetworkStatusChange: true});
  const [updateTodo, {}] = useMutation(Update_TODO);
  const [publishTodo, {}] = useMutation(PublishTodo);
  const [val, setvalues] = useState({});

  useEffect(()=>{
    if(data){
    // setvalues(data);
    // console.log(val);
    
    setTimeout(cheakFun(data),86400000);
    
    }
  },[data]);
  
  if (networkStatus === NetworkStatus.refetch) return "Refetching!";
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;
  return (
     
    <div id="root" className="todo-app ">
      {data.tasks.map(({ title, completed, id }) => (
        <>
          {
            //mkan al false =props w ta7t fl update mkan al ay 7aga un props
            completed === false && (
              <div>
                <div
                  id={id}
                  className={completed ? "todo-row-ended complete" : "todo-row"}
                >
                  <div
                    className="dsa"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      props.history.push("/details", { myprops: id });
                    }}
                  >
                    <div key={id}> {title}</div>
                  </div>
                  <input
                    type="checkbox"
                    value={id}
                    onChange={(e) => {
                      updateTodo({ variables: { completed: true, id: id } });
                      publishTodo();
                      refetch();
                      document.getElementById(e.target.value).style.display =
                        "none";
                    }}
                  />
                </div>
              </div>
            )
          }
        </>
      ))}
      
      
    </div>
  );
};

export default TaskList;
