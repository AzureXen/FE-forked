// src/components/ShowCourse.js

import React, { useState, useEffect } from "react";
import CourseShow from "../../model/CourseShow";
import { FetchShowCoordiantorCourse } from "../../apis/ShowCourse";
import { HeaderSmaller } from "../HeaderAndFooter/HeaderSmaller";
import { Footer } from "../HeaderAndFooter/Footer";

interface ShowCourseListProps {
    courseId: number;
}

export const ShowCourse = () => {
    const [course, setCourse] = useState<CourseShow | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await FetchShowCoordiantorCourse(1); // Sử dụng courseId tại đây nếu bạn muốn cứng số 1
                setCourse(data);
            } catch (error) {
                setError("Error fetching course data");
            }
        };

        fetchData();
    }, []); // Để rỗng mảng dependency để useEffect chỉ chạy một lần sau khi component được render

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <HeaderSmaller />
            <div>
                <div>Search for course</div>
                <div>Result</div>
                <h2>Course Details</h2>
                <p><strong>Course Description:</strong> {course.courseDescription}</p>
                <h3>Mentor Details</h3>
                <p><strong>Mentor Name:</strong> {course.mentorName}</p>
                <h3>Company Details</h3>
                <p><strong>Company Name:</strong> {course.companyName}</p>
            </div>
            <Footer />
        </div>
    );
};
export default ShowCourse