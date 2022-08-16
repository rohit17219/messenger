import React, {useState} from "react";
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux';
import { userRegister } from "../store/actions/authActions";
const Register = () =>{
    const dispatch = useDispatch();

    const [state,setState] = useState({
        userName:'',
        email:'',
        password:'',
        confirmPassword:'',
        image:'',
    });

    const [loadImage,setLoadImage] = useState('');

    const inputHandle = (e) =>{
        setState({
            ...state,
            [e.target.name] : e.target.value,
        })
    }
    
    const fileHandle = (e) =>{
        if(e.target.files.length !== 0){
            setState({
                ...state,
                [e.target.name]:e.target.files[0]
            })

            const reader = new FileReader();
            reader.onload = () =>{
                setLoadImage(reader.result);
            }
            reader.readAsDataURL(e.target.files[0]);
        }
        
    }

    const register = (e) => {
        e.preventDefault();
        const {userName, email, password, confirmPassword, image} = state;
        //console.log(state);
        const formData = new FormData();
        formData.append('userName',userName);
        formData.append('email',email);
        formData.append('password',password);
        formData.append('confirmPassword',confirmPassword);
        formData.append('image',image);
        dispatch(userRegister(formData));
    }
    return (
        <div className='register'>
            <div className='card'>
                <div className='card-header'>
                    <h3>Register</h3>
                </div>

                <div className='card-body'>
                    <form onSubmit={register}>
                        <div className='form-group'>
                            <label htmlFor='username'>User Name</label>
                            <input type="text" className='form-control' name="userName" placeholder='User Name' id='username' value={state.userName} onChange={inputHandle} /> 
                        </div>

                        <div className='form-group'>
                            <label htmlFor='email'>Email</label>
                            <input type="email" className='form-control' name="email" placeholder='Email' id='email' value={state.email} onChange={inputHandle}/> 
                        </div>

                        <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <input type="password" className='form-control' name="password" placeholder='Password' id='password' value={state.password} onChange={inputHandle}/> 
                        </div>


                        <div className='form-group'>
                            <label htmlFor='confirmPassword'>Confirm Password</label>
                            <input type="password" className='form-control' name="confirmPassword" placeholder='Confirm Password' id='confirmPassword' value={state.confirmPassword} onChange={inputHandle}/> 
                        </div>

                        <div className='form-group'>
                            <div className='file-image'>
                                <div className='image'>
                                { loadImage ? <img src={loadImage} alt="LoadedImage"/> : ''} 
                                </div>
                                <div className='file'>
                                    <label htmlFor='image'>Select Image</label>
                                    <input type="file" className='form-control' id='image' name="image" onChange={fileHandle}/>
                                </div>

                            </div>
                        </div>

                        <div className='form-group'>
                            <input type="submit" value="Register" className='btn' />
                        </div>


                        <div className='form-group'>
                            <span>
                                <Link to="/messenger/login"> Login Your Account </Link>
                            </span>
                        </div>  
                    </form> 
                </div>
            </div> 

        </div>
    );
}
export default Register;