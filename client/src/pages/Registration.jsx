import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Registration.css';

function Registration() {
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    const navigate = useNavigate();

    const initialValues = {
        username: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(20).required('You must input a username'),
        password: Yup.string().min(6).max(20).required('You must input a password'),
    });

    const onSubmit = (data, { setSubmitting, resetForm }) => {
        axios.post('http://localhost:3000/auth', data)
            .then((response) => {
                console.log(response);
                setAlert({ show: true, message: 'Registration successful!', type: 'success' });
                resetForm();
                setTimeout(() => navigate('/login'), 2000);
            })
            .catch((error) => {
                setAlert({ show: true, message: error.response?.data?.error || 'Registration failed. Please try again.', type: 'error' });
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    useEffect(() => {
        if (alert.show) {
            const timer = setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [alert]);

    return (
        <div className="registration-container">
            <h2>Register</h2>
            {alert.show && (
                <div className={`alert ${alert.type}`}>
                    {alert.message}
                </div>
            )}
            <Formik 
                initialValues={initialValues} 
                onSubmit={onSubmit} 
                validationSchema={validationSchema}
            >
                {({ isSubmitting }) => (
                    <Form className='form-container'>
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <Field 
                                id="username"
                                name="username" 
                                placeholder="e.g., john_doe"
                            />
                            <ErrorMessage name="username" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <Field 
                                id="password"
                                type="password" 
                                name="password" 
                                placeholder="Enter your password"
                            />
                            <ErrorMessage name="password" component="div" className="error-message" />
                        </div>

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Registering...' : 'Register'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Registration;
