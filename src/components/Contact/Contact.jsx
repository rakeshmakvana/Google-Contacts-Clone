import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { FaUpload } from "react-icons/fa6";
import { FaPrint } from "react-icons/fa";
import { BiSolidShow } from "react-icons/bi";
import { RiPencilFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import './Contact.css';
import { Button, Modal, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletAsync, getAsync } from "../../services/Action/NumAction";
import { useNavigate } from "react-router-dom";

const Contact = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const { number } = useSelector(state => state.NumReducer);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate('/edit', { state: { id } })
    }

    const handleView = (id) => {
        navigate('/view', { state: { id } })
    }

    const handleDelet = (id) => {
        handleShow();
        dispatch(deletAsync(id))
    }

    useEffect(() => {
        dispatch(getAsync());
    }, [])

    return (
        <>
            <div className="col-12 ct-h1 pt-2">
                <h1>Contacts</h1>
            </div>
            <table className="col-12 mt-3">
                <thead>
                    <th className='w-25'>
                        Name
                    </th>
                    <th className='w-25'>
                        Email
                    </th>
                    <th className='w-25'>
                        Phone Number
                    </th>
                    <th className='w-25'>
                        <button>
                            <FaPrint />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<FaUpload />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<PiDotsThreeOutlineVerticalFill />
                        </button>
                    </th>
                </thead>
                {number.length > 0 ?
                    number.map((data) => {
                        return (
                            <tbody id="dataList">
                                <td className='w-25'>
                                    {data.imageUrl ? <img src={data.imageUrl} alt="img" /> : <img src='https://frappecloud.com/files/user.png' alt="img" />}
                                    &nbsp;&nbsp;&nbsp;&nbsp;{data.fname} {data.lname}
                                </td>
                                <td className='w-25'>
                                    {data.email}
                                </td>
                                <td className='w-25'>
                                    {data.phone}
                                </td>
                                <td className='w-25'>
                                    <button onClick={() => handleView(data.id)}>
                                        <BiSolidShow />
                                    </button>
                                    <button onClick={() => handleEdit(data.id)}>
                                        <RiPencilFill />
                                    </button>
                                    <button>
                                        <MdDelete onClick={() => handleDelet(data.id)} />
                                    </button>
                                </td>
                            </tbody>
                        )
                    })
                    :
                    <tbody className="err-h2 w-100 h-100 text-center">
                        <td colSpan={4}>
                            <h2 className="text-danger">
                                No Contact Found<Spinner animation="border" variant="danger" className="mb-1 ml-3" />
                            </h2>
                        </td>
                    </tbody>}
            </table>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="modal-dialog-centered d-flex">
                <Modal.Header className="pl-4">
                    <Modal.Title>Delete from contacts?</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    This contact will be permanently deleted from Your account.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default Contact