import {useEffect, useState} from "react";
import Intern from "../../../../model/Intern/Intern"
import fetchInternOfCourse from "../../../../apis/MentorApis/GetInternOfCourse";
import {useParams} from "react-router-dom";
import "../../../../css/Mentor/ViewAllInternsByTable.css"
import SendFeedbackToIntern from "../../../../apis/MentorApis/SendFeedbackToIntern";
const MentorFeedbackInternPage = () =>{
    // FEEDBACK COOLDOWN
    const [cooldown,setCooldown] = useState(false);
    const [cooldownMessage, setCooldownMessage] = useState("");
    // ---------- FEEDBACK ERRORS ----------//
    const [feedbackContentError, setFeedbackContentError] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
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
        if (checkedMentorId && checkedCourseId) fetchData();
    },[checkedMentorId]);

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
        setFeedbackContentError("");
        setSuccessMessage("");
    }
    const exitModal = ()=>{
        resetContent()
        closeFeedbackModal();
    }
    const sendFeedback = () => {
        if (cooldown) {
            setCooldownMessage("Send feedback is on cooldown...(10 seconds after a successful send.)");
            setTimeout(()=>{
                setCooldownMessage("");
            },5000)
            return;
        }

        if(feedbackContent==="") {
            setFeedbackContentError("Feedback Content must not be empty!");
        }
        else{
            SendFeedbackToIntern(feedbackContent, checkedMentorId, selectedInternId.toString())
                .then();
            setSuccessMessage("Feedback sent.");
            setCooldown(true);
            setTimeout(()=>{
                setCooldown(false);
            }, 10000)
        }
    }

    return(
        <div>
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
                            setFeedbackContentError("");
                        }}
                        placeholder = "Enter feedback content here."
                        />
                        <p className="error-message">{feedbackContentError}</p>
                        <p className="success-message">{successMessage}</p>
                        <p className="cooldown-message">{cooldownMessage}</p>
                        <button onClick={sendFeedback}>Send feedback</button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default MentorFeedbackInternPage;