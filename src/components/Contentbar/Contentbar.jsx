import './Contentbar.css'
import { CgMenuGridO } from "react-icons/cg";
import { TbHelpSquareRounded } from "react-icons/tb";
import { MdOutlineSettings } from "react-icons/md";
import userimg from './user.png'
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/Action/AuthAction';
import { useState } from 'react';

const Contentbar = ({ page }) => {

    const { user } = useSelector(state => state.AuthReducer);

    const dispatch = useDispatch();

    const handleBtn = () => {
        dispatch(logout());
    }

    return (
        <>
            <div className="col-10 content p-3">
                <div className="d-flex flex-wrap align-items-center w-100">
                    <div className="col-8 ct-inp p-0">
                        <input className="form-control p-4" type="search" placeholder="🔍   Search" />
                    </div>
                    <div className="col-3 ct-icn p-0 text-right">
                        <button>
                            <TbHelpSquareRounded />
                        </button>
                        <button>
                            <MdOutlineSettings />
                        </button>
                        <button>
                            <CgMenuGridO />
                        </button>
                    </div>
                    <div className="col-1 ct-img">
                        <DropdownButton id="dropdown-item-button" title={<img src={user.photoURL == null ? userimg : user.photoURL} alt="profile" className='hd-img' />}>
                            <Dropdown.ItemText>
                                <div className='d-flex flex-wrap w-100 mt-3'>
                                    <div className='col-12 text-center'>
                                        <img src={user.photoURL == null ? userimg : user.photoURL} alt="profile" className='hd-img2' />
                                    </div>
                                    <div className='dr-h4 col-12 text-center mt-2'>
                                        <h4>{user.displayName == null ? 'User' : user.displayName}</h4>
                                    </div>
                                    <div className='dr-h4 col-12 text-center'>
                                        <h5>{user.email}</h5>
                                    </div>
                                </div>
                            </Dropdown.ItemText>
                            <Dropdown.ItemText>
                                <div className='w-100 text-center dr-btn mb-3'>
                                    <button type='button' onClick={handleBtn}>Sign Out</button>
                                </div>
                            </Dropdown.ItemText>
                        </DropdownButton>
                    </div>
                </div>
                <div className="ct-bg w-100 p-4 mt-4">
                    {page}
                </div>
            </div>
        </>
    )

}

export default Contentbar