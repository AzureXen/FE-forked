import {useEffect, useState} from "react";
import InternDetail from "../../model/Intern/InternDetail";
import fetchInternDetail from "../../apis/InternApis/GetInternDetail";
import "../../css/ProfilePage.css"
import {HeaderWorkplace} from "./HeaderWorkplace";
import {Footer} from "./Footer";

const ViewProfilePage = () =>{
    // check user---------------
    const [user, setUser]
        = useState<{ user_id: number, username:string, email:string, role:string, fullName:string, company_id:number } | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // get user data---------------
    const [userId, setUserId] = useState<number>(0);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [fullName, setFullName] = useState("");
    const [companyId, setCompanyId] = useState<number>()

    // FOR INTERN: intern detail
    const [internDetail, setInternDetail] = useState<InternDetail>();
    const getInternDetail = async()=>{
        if(userId!==0){
            try{
                console.log("starting fetching interndetail with id: ", userId);
                const InternData = await fetchInternDetail(userId.toString());
                setInternDetail(InternData);
            }
            catch(error){
                console.log("GetInternDetail error:", error);
            }
        }

    }
    useEffect(()=>{
        if(user){
            setUserId(user?.user_id);
            setUsername(user?.username);
            setEmail(user?.email);
            setRole(user?.role);
            setFullName(user?.fullName);
            setCompanyId(user?.company_id);
        }
    },[user])
    useEffect(()=>{
        if(role==="ROLE_INTERN"){
            try{
                getInternDetail();
            }catch(error){
                console.log(error);
            }
        }
    },[role]);
    console.log(role);



    if (!user) {
        return <p>Loading...</p>;
    }

    if(role==="ROLE_INTERN"){
        return(
            <>
                <HeaderWorkplace/>
                {/*Background*/}
                <div style={{background: "radial-gradient(circle at center, #c3d6f5, #a3c7f2)"}}>
                    <h2 className="highlight1">USER PROFILE</h2>
                    <hr style={{height: '4px', backgroundColor: 'aliceblue', border: 'none'}}/>
                    <div className="info-background">
                        {/*Divide into two sections*/}
                        {/*Section 1: profile picture and username*/}
                        <div className="pfp-container">
                            {/*profile pic container*/}
                            <div className="profile-pic"></div>
                            <p className="user-name">{username}</p>
                        </div>
                        {/*Section 2: user info*/}
                        <div className="user-info-container">
                            <p className="field-name">Role: <p className="field-value">{role}</p></p>
                            <br/>
                            <p className="field-name">Full name: <p className="field-value">{fullName}</p></p>
                            <br/>
                            <p className="field-name">Email: <p className="field-value">{email}</p></p>
                            <br/>
                            <p className="field-name">Work history: <p
                                className="field-value">{internDetail?.work_history}</p></p>
                            <br/>
                            <p className="field-name">Education background: <p
                                className="field-value">{internDetail?.education_background}</p></p>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
    if (role !== "") {
        return (
            <>
                <HeaderWorkplace/>
                {/*Background*/}
                <div style={{background: "radial-gradient(circle at center, #c3d6f5, #a3c7f2)"}}>
                    <h2 className="highlight1">USER PROFILE</h2>
                    <hr style={{height: '4px', backgroundColor: 'aliceblue', border: 'none'}}/>
                    <div className="info-background">
                        {/*Divide into two sections*/}
                        {/*Section 1: profile picture and username*/}
                        <div className="pfp-container">
                            {/*profile pic container*/}
                            <div className="profile-pic"></div>
                            <p className="user-name">{username}</p>
                        </div>
                        {/*Section 2: user info*/}
                        <div className="user-info-container">
                            <p className="field-name">Role: <p className="field-value">{role}</p></p>
                            <br/>
                            <p className="field-name">Full name: <p className="field-value">{fullName}</p></p>
                            <br/>
                            <p className="field-name">Email: <p className="field-value">{email}</p></p>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        )
    }
    return (
        <h2>ERROR: Cannot find role!</h2>
    )
}
export default ViewProfilePage;