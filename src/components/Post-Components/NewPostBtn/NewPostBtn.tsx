import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function NewPostBtn() {
    const navigate = useNavigate()
    return <button className="btn-primary" style={{width:'max-content',alignSelf:'center'}} onClick={()=> navigate('/create-post')}> <FontAwesomeIcon icon={faPlus}/> New Post</button>;
}
