import TaskForm from "../components/TaskForm";

const EditTask = (props) => {
    return <div>
        <h1>Редактировать задачу</h1>
        <TaskForm history={props.history} postId={props.match.params.postId}/>
    </div>
}

export default EditTask;