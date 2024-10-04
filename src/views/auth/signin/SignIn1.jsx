import React from 'react';
import { NavLink, Link } from 'react-router-dom';

// react-bootstrap
import { Card, Button, Alert } from 'react-bootstrap';

// third party
import { CopyToClipboard } from 'react-copy-to-clipboard';

// project import
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import AuthLogin from './JWTLogin';

// assets
import logoDark from '../../../assets/images/logo-dark.png';

// ==============================|| SIGN IN 1 ||============================== //

const Signin1 = () => {
  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless text-center" style={{backgroundColor:'aqua'}}>
            <Card.Body>
            <img id="main-logo" src='https://fluentgrid.com/wp-content/uploads/2019/09/Fluentgrid-logo-white.png' alt="" className="logo" style={{ width: '200px', height: '75px' }} />
              <AuthLogin />
              <p className="mb-2 text-muted">
                Forgot password?{' '}
                <NavLink to="/auth/reset-password-1" className="f-w-400">
                  Reset
                </NavLink>
              </p>
            </Card.Body>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signin1;
