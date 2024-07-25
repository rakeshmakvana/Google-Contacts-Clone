import './Sidebar.css'
import logo from './logo.png'
import { FaPlus } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { RiFolderDownloadFill } from "react-icons/ri";
import { MdDesignServices } from "react-icons/md";
import { LuDownload } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosMenu } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

    const navigate = useNavigate();

    const handleBtn = () => {
        navigate('/add');
    }

    return (
        <>
            <div className="col-2 sidebar d-flex flex-wrap p-3">
                <div className='col-12 d-flex flex-wrap'>
                    <button className="sd-img col-2 p-0">
                        <h1><IoIosMenu /></h1>
                    </button>
                    <button className="sd-img col-3 p-0">
                        <img src={logo} alt="logo" />
                    </button>
                    <button className='sd-img col-7 p-0'>
                        <h1>Contacts</h1>
                    </button>
                </div>
                <div className="col-12 mt-4">
                    <button className="d-flex align-items-center sd-btn p-3 w-100" type="button" onClick={handleBtn}>
                        <FaPlus />&nbsp;&nbsp;Creat Contacts
                    </button>
                </div>
                <div className='col-12 d-flex flex-wrap mt-4'>
                    <button className="w-100 d-flex align-items-center sd-btn-2 p-2 active" >
                        &nbsp;&nbsp;<FaUser />&nbsp;&nbsp;Contacts
                    </button>
                    <button className="w-100 d-flex align-items-center sd-btn-2 p-2 mt-2">
                        &nbsp;&nbsp;<FaHistory />&nbsp;&nbsp;Frequent
                    </button>
                    <button className="w-100 d-flex align-items-center sd-btn-2 p-2 mt-2">
                        &nbsp;&nbsp;<RiFolderDownloadFill />&nbsp;&nbsp;Other contacts
                    </button>
                    <div className="col-12 mt-1 d-flex align-items-center sd-ct py-4">
                        <h3>
                            Fix and Manage
                        </h3>
                    </div>
                    <button className="w-100 d-flex align-items-center sd-btn-2 p-2">
                        &nbsp;&nbsp;<MdDesignServices />&nbsp;&nbsp;Merge and Fix
                    </button>
                    <button className="w-100 d-flex align-items-center sd-btn-2 p-2 mt-2">
                        &nbsp;&nbsp;<LuDownload />&nbsp;&nbsp;Import
                    </button>
                    <button className="w-100 d-flex align-items-center sd-btn-2 p-2 mt-2">
                        &nbsp;&nbsp;<RiDeleteBin6Line />&nbsp;&nbsp;Bin
                    </button>
                    <div className="col-12 mt-1 d-flex align-items-center sd-ct py-4">
                        <h3>
                            Labels&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<FaPlus />
                        </h3>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Sidebar