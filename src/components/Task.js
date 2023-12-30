import React from "react";

const Task = ({ task, onClick }) => {
    return (
        <li onClick={() => onClick(task.id)}>
        {task.name}
        </li>
    );
};

export default Task;
