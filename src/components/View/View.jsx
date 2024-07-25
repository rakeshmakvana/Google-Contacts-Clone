import { IoArrowBack } from "react-icons/io5"
import { RiDeleteBinLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegCalendar } from "react-icons/fa";
import { MdChatBubbleOutline } from "react-icons/md";
import { GoDeviceCameraVideo } from "react-icons/go";
import { MdOutlinePhone } from "react-icons/md";
import { BsCake } from "react-icons/bs";
import './View.css'
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletAsync } from "../../services/Action/NumAction";

const View = () => {

    const { number } = useSelector(state => state.NumReducer);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const location = useLocation();

    const { id } = location.state;

    let filterNum = number.filter((num) => {
        if (id === num.id) {
            return num
        }
    })

    let viewData = filterNum[0];

    const handleBtn = () => {
        navigate('/');
    }

    const handleEdit = (id) => {
        navigate('/edit', { state: { id } })
    }

    const handleDelet = (id) => {
        dispatch(deletAsync(id))
        navigate('/');
    }

    return (
        <>
            <div className="col-12 pt-3 d-flex flex-wrap align-items-center">
                <div className="col-1 vw-btn">
                    <button onClick={handleBtn}>
                        <IoArrowBack />
                    </button>
                </div>
                <div className="col-9 text-right vw-btn2">
                    <button onClick={() => handleEdit(id)}>
                        Edit
                    </button>
                </div>
                <div className="col-1 vw-btn">
                    <button onClick={() => handleDelet(id)}>
                        <RiDeleteBinLine />
                    </button>
                </div>
            </div>
            <div className="col-12 p-4 d-flex flex-wrap align-items-center">
                <div className="col-2 ad-img">
                    {viewData.imageUrl ? <img src={viewData.imageUrl} alt="img" /> : <img src='https://frappecloud.com/files/user.png' alt="img" />}
                </div>
                <div className="col-5 text-left vw-h2">
                    <h2>
                        {viewData.fname} {viewData.lname}
                    </h2>
                </div>
            </div>
            <div className="col-12 p-3 pl-5 d-flex flex-wrap align-items-center">
                <div className="vw-btn3 pr-4">
                    <button>
                        <MdOutlineEmail />
                    </button>
                </div>
                <div className="vw-btn3 pr-4">
                    <button>
                        <FaRegCalendar />
                    </button>
                </div>
                <div className="vw-btn3 pr-4">
                    <button>
                        <MdChatBubbleOutline />
                    </button>
                </div>
                <div className="vw-btn3 pr-4">
                    <button>
                        <GoDeviceCameraVideo />
                    </button>
                </div>
                <div className="col-8 vw-line p-0">
                    <div>

                    </div>
                </div>
            </div>
            <div className="col-12 p-3 pl-5">
                <div className="col-6 vw-box p-4">
                    <h2>
                        Contact details
                    </h2>
                    <div className="vw-btn4">
                        <button>
                            <MdOutlineEmail /> <span>{viewData.email}</span>
                        </button>
                    </div>
                    <div className="vw-btn4">
                        <button>
                            <MdOutlinePhone /> <span>{viewData.phone}</span>
                        </button>
                    </div>
                    <div className="vw-btn4">
                        <button>
                            <BsCake /> <span>{viewData.dob}</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )

}

export default View