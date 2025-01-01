import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreatePost.css';

function CreatePost() {
    let navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const initialValues = {
        title: '',
        postText: '',
        username: '',
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('You must input a title'),
        postText: Yup.string().required('You must input a post'),
        username: Yup.string().min(3).max(20).required('You must input a username'),
    })

    const onSubmit = (data, { resetForm }) => {
        setIsSubmitting(true);
        axios.post('http://localhost:3000/posts', data)
            .then((response) => {
                resetForm();
                navigate('/');
            })
            .catch((error) => {
                console.error('Error creating post:', error);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <div className='create-post-page'>
            <h1 className="page-title">Create a New Post</h1>
            <Formik 
                initialValues={initialValues} 
                onSubmit={onSubmit} 
                validationSchema={validationSchema}>
                {({ isValid }) => (
                    <Form className='form-container'>
                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
                            <Field 
                                id="title"
                                name="title" 
                                placeholder="Enter your post title"
                                className="input-field"
                            />
                            <ErrorMessage name="title" component="span" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="postText">Post:</label>
                            <Field 
                                as="textarea"
                                id="postText"
                                name="postText" 
                                placeholder="Write your post content here"
                                className="input-field textarea"
                            />
                            <ErrorMessage name="postText" component="span" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <Field 
                                id="username"
                                name="username" 
                                placeholder="Enter your username"
                                className="input-field"
                            />
                            <ErrorMessage name="username" component="span" className="error-message" />
                        </div>

                        <button 
                            type="submit" 
                            className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                            disabled={!isValid || isSubmitting}
                        >
                            {isSubmitting ? 'Creating Post...' : 'Create Post'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CreatePost
