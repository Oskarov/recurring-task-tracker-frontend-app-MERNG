import React from 'react';
import PostForm from "../components/PostForm";

function NewTask(props) {

    return (
        <div>
            <h1>Создать задачу</h1>
            <PostForm/>
        </div>
    );
}

export default NewTask;