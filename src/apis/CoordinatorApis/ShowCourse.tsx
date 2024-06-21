// src/apis/ShowCourse.js

import axios from "axios";
import CourseShow from "../../model/CourseShow";

export const FetchShowCoordiantorCourse = async (courseId: number): Promise<CourseShow | null> => {
    try {
        const response = await axios.get(`http://localhost:8080/internbridge/coordinator/course/${courseId}`);
        const data = response.data;
        return new CourseShow(
            data.mentor.id,
            data.mentor.fullName,
            data.company.id,
            data.company.companyName,
            data.courseDescription
        );
    } catch (error) {
        console.error("Error fetching course data", error);
        return null;
    }
};

export default FetchShowCoordiantorCourse;