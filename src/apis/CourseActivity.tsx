import axios from 'axios';

const fetchActivityCourseIntern = async (courseId: string) =>{
    try{
        const response =
            await axios.get('http://localhost:8080/....')
        return response.data;
    }catch(error){
        console.error("Error while fetching activity course", error);
        throw error;
    }
}
export default fetchActivityCourseIntern;