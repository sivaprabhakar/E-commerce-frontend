import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('* First Name Required'),
  lastName: Yup.string().required('* Last Name Required'),
  email: Yup.string().email('Invalid email').required('* Email Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('* Password Required'),
});

function Signup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post('/user/signup', values);
      if (response.status === 201) {
        toast.success('Signup successful! Please sign in.');
        navigate('/signin');
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card card-custom">
            <div className="card-header d-flex justify-content-center"><h4>Create Account</h4></div>
            <div className="card-body">
              <Formik
                initialValues={{
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                  handleSubmit(values);
                }}
              >
                <Form>
                  <div className="row mb-3">
                    <div className="col">
                      <label htmlFor="firstName" className="form-label">First Name</label>
                      <Field type="text" name="firstName" id="firstName" className="form-control" placeholder="First Name" />
                      <ErrorMessage name="firstName" component="div" className="text-danger" />
                    </div>
                    <div className="col">
                      <label htmlFor="lastName" className="form-label">Last Name</label>
                      <Field type="text" name="lastName" id="lastName" className="form-control" placeholder="Last Name" />
                      <ErrorMessage name="lastName" component="div" className="text-danger" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <Field type="email" name="email" id="email" className="form-control" placeholder="Enter email" />
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <Field type="password" name="password" id="password" className="form-control" placeholder="Password" />
                    <ErrorMessage name="password" component="div" className="text-danger" />
                  </div>
                  <button type="submit" className="button" disabled={loading}>{loading ? 'Signing up...' : 'Sign Up'}</button>
                </Form>
              </Formik>
              <div className="mt-3">
                Already have an account? <Link to="/signin">Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer />
    </>
  );
}

export default Signup;
