import React from "react";

const Task = ({ task, deleteTask, categoryId }) => {
    return (
     <div className="task">
       <input type="checkbox" checked={task.completed} />
       <span>{task.title}</span>
       <button onClick={() => deleteTask(categoryId, task.id)}>Cancella Compito</button>
     </div>
    );
   };

export default Task;
