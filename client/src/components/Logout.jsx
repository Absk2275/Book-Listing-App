import { useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
const Logout = () =>{
    const Navigate=useNavigate()
    const handlelog=()=>{
        localStorage.removeItem("authToken");
        localStorage.removeItem("userEmail");
        
        Navigate('/login')
    }
    return(
        <div onClick={handlelog}>
           <div className="btn bg-white text-success mx-2"><BiLogOutCircle className='mb-1 '/>Logout</div>
        </div>
    )
}
export default Logout;