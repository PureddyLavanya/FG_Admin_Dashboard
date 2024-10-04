import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useUser } from 'contexts/context';
import axios from 'axios';

const JWTLogin = () => {
  const navigate = useNavigate();
  const details = [{ Username: "Adithya441", email: "adithyachalumuri733@gmail.com", password: "123456" },{ Username: "Adithya", email: "adithyachalumuri@gmail.com", password: "12345678" },{ Username: "Adithya7890", email: "adithyachalumuri7@gmail.com", password: "123456987" }];
  const [data,setData] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/users");
        
        const fetchedData = response.data;

        const transformeddata = fetchedData.users

        setData(transformeddata);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 
  console.log(data[0].image);


  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required'),
      })}
      onSubmit={(values, { setSubmitting, setErrors, resetForm }) => {
        setSubmitting(true);

        // Check if the email and password match
        data.map((item)=>{
          if (
            values.email === item.email &&
            values.password === item.password
          ) {
            setSubmitting(false);
            navigate('/app/dashboard/analytics');
            resetForm();
            localStorage.setItem('username', item.firstName);
            localStorage.setItem('link', item.image);
          } else {
            setErrors({ submit: 'Invalid credentials, please try again.' });
            setSubmitting(false);
          }

        })
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <div className="form-group mb-3" style={{ marginTop: '20px' }}>
            <label>Enter your E-Mail</label>
            <input
              className="form-control"
              label="Email Address / Username"
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              type="email"
              value={values.email}
            />
            {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
          </div>
          <div className="form-group mb-4">
            <label>Enter your Password</label>
            <input
              className="form-control"
              label="Password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
          </div>

          <div className="custom-control custom-checkbox text-start mb-4 mt-2">
            <input type="checkbox" className="custom-control-input mx-2" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">
              Save credentials.
            </label>
          </div>

          {errors.submit && (
            <Col sm={12}>
              <Alert variant="danger">{errors.submit}</Alert>
            </Col>
          )}

          <Row>
            <Col mt={2}>
              <Button
                className="btn-block mb-4"
                color="primary"
                disabled={isSubmitting}
                size="large"
                type="submit"
                variant="primary"
              >
                Signin
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
};

export default JWTLogin;