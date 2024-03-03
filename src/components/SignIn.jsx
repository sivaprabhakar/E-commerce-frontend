import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function SignIn() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card card-custom">
            <div className="card-header d-flex justify-content-center"><h4>Sign In</h4></div>
            <div className="card-body">
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={Yup.object({
                  email: Yup.string().email('*Invalid email address').required('*Email is required'),
                  password: Yup.string().required('*Password is required').min(6, '*Password must be at least 6 characters'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
                }}
              >
                <Form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <Field type="email" className="form-control" id="email" name="email" />
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <Field type="password" className="form-control" id="password" name="password" />
                    <ErrorMessage name="password" component="div" className="text-danger" />
                  </div>
                  <button type="submit" className="button">Sign In</button>
                </Form>
              </Formik>
              <div className="mt-3">
                Don't have an account? <Link to="/signup">Create Account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
