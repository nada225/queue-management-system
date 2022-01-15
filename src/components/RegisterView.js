import React, { useState } from 'react'
import axiosInstance from './Axios'
import { useHistory } from 'react-router-dom'
import '../styles/login.css'

export default function RegisterView() {

    const history = useHistory()
    const initialFormData = Object.freeze({
        email: '',
        full_name: '',
        password: '',
        password2: ''
    })
    const initialFormErrors = Object.freeze({
        email: '',
        full_name: '',
        password: '',
        password2: ''
    });

    const [formData, updateFormData] = useState(initialFormData)
    const [formErrors, updateFormErrors] = useState(initialFormErrors)

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axiosInstance.post(`users/register/`, {
            email: formData.email,
            full_name: formData.full_name,
            password: formData.password,
            password2: formData.password2,
        })
        .then((res) => {
            history.push({
                pathname: '/login',
                state: { message: res.data }
            });
        })
        .catch((error) => {
            if (error.response.data.detail) {
                alert(error.response.data.detail);
            }

            updateFormErrors({
                email: error.response.data.email,
                full_name: error.response.data.full_name,
                password: error.response.data.password,
                password2: error.response.data.password
            });
        });
    }

    return (
        <div className="login">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-8 col-lg-6 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Sign Up</h5>
                                <form className="form-signin">
                                    <div className="form-label-group ">
                                        <input type="text" id="TextField" name="full_name" onChange={handleChange} className="form-control btn-shape" placeholder="TextField" required autoFocus/>
                                        <label htmlFor="TextField">Name</label>
                                        <span className="text-danger">{formErrors.full_name}</span>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="email" id="inputEmail" name="email" onChange={handleChange} className="form-control btn-shape" placeholder="Email address" required/>
                                        <label htmlFor="inputEmail">Email address</label>
                                        <span className="text-danger">{formErrors.email}</span>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="password" id="inputPassword" name="password" onChange={handleChange} className="form-control btn-shape" placeholder="Password" required/>
                                        <label htmlFor="inputPassword">Password</label>
                                        <span className="text-danger">{formErrors.password}</span>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="password" id="inputconfirmPassword" name="password2" onChange={handleChange} className="form-control btn-shape" placeholder="Password" required/>
                                        <label htmlFor="inputconfirmPassword">Confirm Password</label>
                                        <span className="text-danger">{formErrors.password2}</span>
                                    </div>
                                    <button 
                                    className="btn btn-lg btn-primary btn-block text-uppercase mt-2 btn-shape" 
                                    type="submit"
                                    onClick={handleSubmit}
                                    >Sign up</button>
                                    <hr className="my-4" />
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

