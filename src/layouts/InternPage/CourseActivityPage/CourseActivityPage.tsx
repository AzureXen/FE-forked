
import { useParams} from "react-router-dom";

const CourseActivityPage = (() => {
    const {courseId, internId} = useParams();
    const checkedcourseId = courseId ?? '';
    const checkedInternId = internId ?? '';
    return (
        <div>
            <h1>Intern id: {checkedInternId}</h1>
            <h1>showing activity for course {checkedcourseId}</h1>
        </div>
    )
})
export default CourseActivityPage;