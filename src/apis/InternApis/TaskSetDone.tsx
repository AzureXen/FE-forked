import axios from 'axios';

const TaskSetDone = async (internId:string, taskId:string ) =>{
    try{
        axios.put(`http://localhost:8080/internbridge/intern/course/task/done/${taskId}&${internId}`)
            .then(res => console.log("updated successfully"));
        return true;
    }catch(error){
        console.log("Error at TaskSetDone api: ",error);
    }
}

export default TaskSetDone