import { IoArrowBack } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdOutlineEmail } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { BsCake } from "react-icons/bs";
import { MdOutlineNote } from "react-icons/md";
import '../Add/Add.css'
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateAsync } from "../../services/Action/NumAction";

const Edit = () => {

    const [input, setInput] = useState({
        fname: '',
        lname: '',
        company: '',
        job: '',
        email: '',
        phone: '',
        dob: '',
        note: ''
    });

    const [image, setImage] = useState(null);

    const { number } = useSelector(state => state.NumReducer);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const location = useLocation();

    const { id } = location.state;

    const handleBtn = () => {
        navigate('/');
    }

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInput({ ...input, [name]: value })
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateAsync(id, input, image))
        setInput({
            fname: '',
            lname: '',
            company: '',
            job: '',
            email: '',
            phone: '',
            dob: '',
            note: ''
        });
        navigate('/');
    }

    useEffect(() => {
        let filterNum = number.filter((num) => {
            if (id === num.id) {
                return num
            }
        })
        setInput(filterNum[0]);
    }, [number])

    return (
        <>
            <div className="col-12 pt-3 d-flex flex-wrap align-items-center">
                <div className="col-1 ad-btn">
                    <button onClick={handleBtn}>
                        <IoArrowBack />
                    </button>
                </div>
            </div>
            <div className="col-12 p-4 d-flex flex-wrap align-items-center">
                <div className="col-2 ad-img">
                    {input.imageUrl ? <img src={input.imageUrl} alt="img" width={160} type="file" /> : <img src="https://frappecloud.com/files/user.png" alt="img" type="file" />}
                </div>
                <div className="col-5 text-left add-h2">
                    <input type="file" className="p-2" onChange={handleImageChange} />
                </div>
            </div>
            <div className="col-12 pb-3">
                <form onSubmit={handleSubmit}>
                    <div className="d-flex flex-wrap align-items-center w-100 mt-3">
                        <div className="col-1 text-right add-text">
                            <FaRegUser />
                        </div>
                        <div className="col-6 add-inp">
                            <input type="text" class="form-control" placeholder="First name" name="fname" value={input.fname} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="d-flex flex-wrap align-items-center w-100 mt-3">
                        <div className="col-1 text-center add-text">

                        </div>
                        <div className="col-6 add-inp">
                            <input type="text" class="form-control" placeholder="Surename" name="lname" value={input.lname} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="d-flex flex-wrap align-items-center w-100 mt-4">
                        <div className="col-1 text-right add-text">
                            <HiOutlineBuildingOffice2 />
                        </div>
                        <div className="col-6 add-inp">
                            <input type="text" class="form-control" placeholder="Company" name="company" value={input.company} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="d-flex flex-wrap align-items-center w-100 mt-3">
                        <div className="col-1 text-center add-text">

                        </div>
                        <div className="col-6 add-inp">
                            <input type="text" class="form-control" placeholder="Job title" name="job" value={input.job} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="d-flex flex-wrap align-items-center w-100 mt-4">
                        <div className="col-1 text-right add-text">
                            <MdOutlineEmail />
                        </div>
                        <div className="col-6 add-inp">
                            <input type="email" class="form-control" placeholder="Email" name="email" value={input.email} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="d-flex flex-wrap align-items-center w-100 mt-4">
                        <div className="col-1 text-right add-text">
                            <MdLocalPhone />
                        </div>
                        <div className="col-6 add-inp">
                            <input type="number" class="form-control" placeholder="Phone" name="phone" value={input.phone} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="d-flex flex-wrap align-items-center w-100 mt-4">
                        <div className="col-1 text-right add-text">
                            <BsCake />
                        </div>
                        <div className="col-6 add-inp">
                            <input type="date" class="form-control" placeholder="DD--MM-YYYY" name="dob" value={input.dob} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="d-flex flex-wrap align-items-start w-100 mt-4">
                        <div className="col-1 text-right add-text">
                            <MdOutlineNote />
                        </div>
                        <div className="col-6 add-inp">
                            <textarea type="text" class="form-control" placeholder="Notes" rows="3" name="note" value={input.note} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="col-6 text-right ad-btn2" type="submit">
                        <button>
                            Save
                        </button>
                    </div>
                    <div className="d-flex flex-wrap align-items-start w-100 mt-4">
                        <div className="col-3 text-center ad-btn3">
                            <button>
                                Show more
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )

}

export default Edit