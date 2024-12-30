import React from 'react'
import {Formik, Form, Field, ErrorMessage, } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function Registration() {




      const initialValues = {
            username: '',
            password: '',
        };
    
        const validationSchema = Yup.object().shape({
            username: Yup.string().min(3).max(20).required('You must input a username'),
            password: Yup.string().min(6).max(20).required('You must input a password'),
        })

        const onSubmit = (data) => {
            axios.post('http://localhost:3000/auth', data)
                .then((response) => {
                    console.log(response);
                })
        };
  return (
    <div>
         <Formik 
                initialValues={initialValues} 
                onSubmit= {onSubmit} 
                validationSchema={validationSchema}>
                    {()=><Form className='formContainer'>
                        <label>username:</label>
                        <ErrorMessage name="username" component="span"/>
                        <Field id="inputCreatePost"
                         name="username" 
                         placeholder="ex. name123"/>

                        <label>password:</label>
                        <ErrorMessage name="password" component="span"/>
                        <Field id="inputCreatePost"
                         type="password" 
                         name="password" 
                         placeholder="********"/>

                        <button type="submit">Register</button>
        
        
                    </Form>
        }
                </Formik>
    </div>
  )
}

export default Registration