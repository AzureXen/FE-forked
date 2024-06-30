import {useEffect, useState} from "react";
import InternFeedback from "../../../model/Intern/InternFeedback"
import fetchAllFeedbacks from "../../../apis/InternApis/AllFeedbacks";
import "../../../css/Intern/FeedbackPage.css"
import {HeaderWorkplace} from "../../HeaderAndFooter/HeaderWorkplace";
import {Footer} from "../../HeaderAndFooter/Footer";
import NavbarIntern from "../NavbarIntern/NavbarIntern";
const FeedbackPage = () =>{
    // check user---------------
    const [user, setUser] = useState<{ user_id: number, email:string } | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    const StringInternId = user?.user_id.toString(); // Convert to string
    const checkedInternId = StringInternId ?? ""; // prevent from being unidentified
    //----------------------------------------------

    const [feedbackList, setFeedbackList] = useState<InternFeedback[]>([])
    try{
        useEffect(()=>{
            const fetchData = async () => {
                const data = await fetchAllFeedbacks(checkedInternId);
                setFeedbackList(data);
            }
            if (checkedInternId) fetchData();
        },[checkedInternId])
    }catch(error){
        console.log("FeedbackPage: found an error while fetching feedback: ",error);
    }
    if (!user) {
        return <p>Loading...</p>;
    }
    return(
        <>
        <div>
            <HeaderWorkplace/>
        </div>
            <div>
                <NavbarIntern internId={checkedInternId} selectedPage="Feedback"/>
            </div>
            <div style={{margin:"1rem 1rem 1rem 3rem"}}>
                <p className="highlight1">All feedbacks: </p>
            </div>
            <div className="feedback-background">
                <div className="feedback-container">
                    <table>
                        <thead>
                        <tr className="table-header">
                            <th>Sender</th>
                            <th>Feedback content</th>
                        </tr>
                        </thead>
                        <tbody>
                        {feedbackList.map((feedback, index) => (
                            <tr key={index}>
                                <td>{feedback.senderName}</td>
                                <td>{feedback.content}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <Footer/>
            </div>
        </>
    )
}
export default FeedbackPage;