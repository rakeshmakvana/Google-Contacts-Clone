import { useState } from 'react';
import './Signin.css'
import logo from './logo.png';
import { FcGoogle } from "react-icons/fc";
import { GoogleloginAsync, loginAsync } from '../../services/Action/AuthAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const Signin = () => {

    const [input, setInput] = useState({
        email: '',
        password: ''
    });

    const { error, isLoading } = useSelector(state => state.AuthReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInput({ ...input, [name]: value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginAsync(input));
        setInput({
            email: '',
            password: ''
        });
    }

    const handleBtn = () => {
        navigate('/register')
    }

    const handleGoogle = () => {
        dispatch(GoogleloginAsync());
    }

    return (
        <>
            <div className="d-flex flex-wrap col-8 signin-box p-5">
                <div className="col-6 p-5">
                    <div className='sg-img mb-2'>
                        <img src={logo} alt="logo" width={80} />
                    </div>
                    <div className='sg-h1 mb-4'>
                        <h1>
                            Sign In
                        </h1>
                    </div>
                    <div className='sg-h4'>
                        <h4>
                            Use your Google Account
                        </h4>
                    </div>
                </div>
                <div className="col-6 py-5">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div class="mb-4 sg-inp">
                            <input type="email" class="form-control p-4" placeholder="Email" name="email" value={input.email} onChange={(e) => handleChange(e)} required />
                        </div>
                        <div class="mb-4 sg-inp">
                            <input type="password" class="form-control p-4" placeholder="Password" name="password" value={input.password} onChange={(e) => handleChange(e)} required />
                        </div>
                        <div class="mb-4 sg-btn">
                            <button className='btn1 mr-4 w-100' type='submit'>
                                {isLoading == true ? <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner> : 'Sign In'}
                            </button>
                        </div>
                        {error ? <div class="mb-4 sg-btn text-center">
                            <span className='span2 mr-1 text-danger'>
                                {error}
                            </span>
                        </div> : ''}
                        <div class="mb-4 sg-btn text-center">
                            <span className='span1 mr-1'>I Don't Have An Acount ?</span>
                            <button className='btn2' onClick={handleBtn}>Create Account</button>
                        </div>
                        <div className="sg-line mb-4">
                            <div>

                            </div>
                        </div>
                        <div class="sg-btn text-center">
                            <button className='btn3 mr-4 w-100' onClick={handleGoogle}><span className='span2 mr-1'><FcGoogle /></span> Sign In With Google</button>
                        </div>
                    </form>
                </div >
            </div >
        </>
    )

}

export default Signin