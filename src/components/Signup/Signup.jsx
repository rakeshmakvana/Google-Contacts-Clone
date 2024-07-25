import { useDispatch, useSelector } from 'react-redux';
import './../Signin/Signin.css'
import logo from './../Signin/logo.png';
import { registerAsync } from '../../services/Action/AuthAction';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const Signup = () => {

    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        contact: ''
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
        dispatch(registerAsync(input));
        setInput({
            name: '',
            email: '',
            password: '',
            contact: ''
        });
    }

    const handleBtn = () => {
        navigate('/')
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
                            Sign Up
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
                            <input type="text" class="form-control p-4" placeholder="Name" name='name' value={input.name} onChange={(e) => handleChange(e)} required />
                        </div>
                        <div class="mb-4 sg-inp">
                            <input type="number" class="form-control p-4" placeholder="Contact" name='contact' value={input.contact} onChange={(e) => handleChange(e)} required />
                        </div>
                        <div class="mb-4 sg-inp">
                            <input type="email" class="form-control p-4" placeholder="Email" name='email' value={input.email} onChange={(e) => handleChange(e)} required />
                        </div>
                        <div class="mb-4 sg-inp">
                            <input type="password" class="form-control p-4" placeholder="Password" name='password' value={input.password} onChange={(e) => handleChange(e)} required />
                        </div>
                        <div class="mb-4 sg-btn" type="submit">
                            <button className='btn1 mr-4 w-100'>
                                {isLoading == true ? <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner> : 'Sign Up'}
                            </button>
                        </div>
                        {error ? <div class="mb-4 sg-btn text-center">
                            <span className='span2 mr-1 text-danger'>
                                {error}
                            </span>
                        </div> : ''}
                        <div class="mb-4 sg-btn text-center">
                            <span className='span1 mr-1'>I Have Already An Acount ?</span>
                            <button className='btn2' onClick={handleBtn}>Login</button>
                        </div>
                    </form>
                </div >
            </div >
        </>
    )

}

export default Signup