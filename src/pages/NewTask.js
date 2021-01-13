import React from 'react';
import TaskForm from "../components/TaskForm";

function NewTask(props) {

    return (
        <div>
            <h1>Создать задачу</h1>
            <TaskForm history={props.history}/>
        </div>
    );

}

export default NewTask;