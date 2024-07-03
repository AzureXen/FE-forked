import {useEffect, useState} from "react";
import Intern from "../../../../model/Intern/Intern"
import fetchInternOfCourse from "../../../../apis/MentorApis/GetInternOfCourse";
import {useNavigate, useParams} from "react-router-dom";
import "../../../../css/Mentor/ViewAllInternsByTable.css"
import SendFeedbackToIntern from "../../../../apis/MentorApis/SendFeedbackToIntern";
import {HeaderWorkplace} from "../../../HeaderAndFooter/HeaderWorkplace";
import {Footer} from "../../../HeaderAndFooter/Footer";
import {NavbarMentor} from "../../../HeaderAndFooter/Navbar/NavbarMentor";
import { useToast } from "../../../../context/ToastContext"
import MentorCourseVerify from "../../../../apis/MentorApis/MentorCourseVerify";
const MentorFeedbackInternPage = () =>{
    //----verify if mentor is in that course
    const navigate = useNavigate();
    const [isInCourse, setIsInCourse] = useState<boolean>(true);
    const [verifiedCourse, setVerifiedCourse] = useState<boolean>(false);
    // USE TOAST
    const { showToast } = useToast();

    // FEEDBACK COOLDOWN
    const [cooldown,setCooldown] = useState(false);

    // --------- FEEDBACK DATA -------
    const [selectedInternId, setSelectedInternId] = useState(0);
    const [selectedInternName, setSelectedInternName] = useState<string>("");
    const [feedbackContent, setFeedbackContent] = useState<string>("");

    //initialize feedback modal
    const [feedbackModal, setFeedbackModal] = useState(false);
    const openFeedbackModal = ()=>{
        setFeedbackModal(true);
    }
    const closeFeedbackModal = ()=>{
        setFeedbackModal(false);
    }

    //get course id
    const {courseId} = useParams()
    const checkedCourseId = courseId ? courseId : ""; //prevents from being undefined

    // check user---------------
    const [user, setUser] = useState<{ user_id: number } | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    const StringMentorId = user?.user_id.toString(); // Convert to string
    const checkedMentorId = StringMentorId ?? ""; // prevent from being unidentified
    //---------------------

    // Get intern list -----------
    const [internList, setInternList] = useState<Intern[]>([]);
    useEffect(()=>{
        const fetchData = async () => {
            const data = await fetchInternOfCourse(checkedMentorId, checkedCourseId);
            setInternList(data);
        }
        if (checkedMentorId && checkedCourseId && verifiedCourse) fetchData();
    },[checkedMentorId,verifiedCourse]);

    // VERIFY IF MENTOR IS IN COURSE FUNCTIONS
    const verifyInternCourse = async ()=>{
        try{
            const courseVerifyData = await MentorCourseVerify(checkedMentorId,checkedCourseId);
            if(courseVerifyData.toString()==="false"){
                setIsInCourse(false);
            }
            setVerifiedCourse(true);
        }catch(error){
            console.error("CourseActivityPage error: ",error);
        }
    }
    useEffect(()=>{
        if(checkedCourseId&&checkedMentorId){
            console.log("checking if Mentor is in that course...");
            verifyInternCourse();
        }
    },[checkedCourseId,checkedMentorId])

    useEffect(()=>{
        if(!isInCourse){
            showToast("You are not/no longer in this course!","error");
            navigate("/mentor/feedback");
        }
    },[isInCourse])

    if (!user) {
        return <p>Loading...</p>;
    }

    // RESPONSIVE FUNCTIONS (functions that executes because of user's interactions)
    const selectIntern = (internId: number, internName:string) => {
        setSelectedInternId(internId);
        setSelectedInternName(internName);
        openFeedbackModal()
    }
    const resetContent = () =>{
        setFeedbackContent("");
        setSelectedInternId(0);
        setSelectedInternName("");
    }
    const exitModal = ()=>{
        resetContent()
        closeFeedbackModal();
    }



    const sendFeedback = () => {
        if (cooldown) {
            showToast("Send feedback is on cooldown(10 seconds after a successful send.)", 'warn');
            return;
        }

        if(feedbackContent==="") {
            showToast("Feedback Content must not be empty!", 'warn');
        }
        else{
            SendFeedbackToIntern(feedbackContent, checkedMentorId, selectedInternId.toString())
                .then();
            showToast("Feedback sent.", 'success');
            setCooldown(true);
            setTimeout(()=>{
                setCooldown(false);
            }, 10000)
            exitModal();
        }
    }



    return(
        <>
            <HeaderWorkplace/>
            <NavbarMentor/>
            <div>
                <p style={{marginLeft:"3rem", marginTop:"1rem"
                    , fontSize:"2rem", color:"#3A5AC6", fontWeight:"bold"}}>Send Feedback to Intern</p>
            </div>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Intern Id</th>
                        <th>Intern Name</th>
                        <th>Intern Email</th>
                    </tr>
                </thead>
                <tbody>
                {internList.map((intern) => (
                    <tr key={intern.user_id}>
                        <td onClick={() =>selectIntern(intern.user_id, intern.name)}>{intern.user_id}</td>
                        <td onClick={() =>selectIntern(intern.user_id, intern.name)}>{intern.name}</td>
                        <td onClick={() =>selectIntern(intern.user_id, intern.name)}>{intern.email}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {feedbackModal && (
                <div className="feedback-modal" onClick={exitModal}>
                    <div className="feedback-box" onClick={(e) => e.stopPropagation()}>
                        <p>Send feedback</p>
                        <p>Intern Id: {selectedInternId}</p>
                        <p>Intern Name: {selectedInternName}</p>
                        <textarea
                        className="feedback-input"
                        value={feedbackContent}
                        onChange={(e) => {
                            setFeedbackContent(e.target.value);
                        }}
                        placeholder = "Enter feedback content here."
                        />
                        <button onClick={sendFeedback}>Send feedback</button>
                    </div>
                </div>
            )}
        </div>
            <Footer/>
        </>
    )
}
export default MentorFeedbackInternPage;