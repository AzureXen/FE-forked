import {useEffect, useState} from "react";
import InternFeedback from "../../../model/Intern/InternFeedback"
import fetchAllFeedbacks from "../../../apis/InternApis/AllFeedbacks";
import "../../../css/Intern/FeedbackPage.css"
import {HeaderWorkplace} from "../../HeaderAndFooter/HeaderWorkplace";
import {Footer} from "../../HeaderAndFooter/Footer";
import NavbarIntern from "../NavbarIntern/NavbarIntern";
import useAuth from "../../../context/useAuth";
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
        console.log("FeedbackPages: found an error while fetching feedback: ",error);
    }
    //  PAGINATION
    const maxMessages = 10;
    const [pageAmount, setPageAmount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const handlePaginationClick = (event:string) => {
        if (event==="toLeft"){
            if((currentPage-1)>0){
                setCurrentPage(currentPage - 1);
            }
        }
        else if (event==="toRight"){
            if((currentPage+1)<pageAmount+1){
                setCurrentPage(currentPage + 1);
            }
        }
        else if (event==="leftMost"){
            setCurrentPage(1);
        }
        else if(event==="rightMost"){
            setCurrentPage(pageAmount);
        }
    }
    useEffect(
        ()=>{
            setPageAmount(Math.ceil(feedbackList.length/maxMessages));
        }
    ,[feedbackList])
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

            <div className="feedback-background">
                <div style={{margin: "1rem 1rem 1rem 3rem"}}>
                    <p className="highlight1">All feedbacks: </p>
                </div>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <div className="feedback-container">
                        <table>
                            <thead>
                            <tr className="table-header">
                                <th>Sender</th>
                                <th>Feedback content</th>
                            </tr>
                            </thead>
                            <tbody>
                            {feedbackList.slice(maxMessages * currentPage - maxMessages, maxMessages * currentPage).map((feedback, index) => (
                                <tr key={index}>
                                    <td>{feedback.senderName}</td>
                                    <td>{feedback.content}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="pagination-items">
                            <button onClick={() => handlePaginationClick("leftMost")}
                                    className="pagination-button">&lt;&lt;</button>
                            <button onClick={() => handlePaginationClick("toLeft")}
                                    className="pagination-button">&lt;</button>
                            <p className="pagination-page">{currentPage}/{pageAmount}</p>
                            <button onClick={() => handlePaginationClick("toRight")}
                                    className="pagination-button">&gt;</button>
                            <button onClick={() => handlePaginationClick("rightMost")}
                                    className="pagination-button">&gt;&gt;</button>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <Footer/>
            </div>
        </>
    )
}
export default FeedbackPage;