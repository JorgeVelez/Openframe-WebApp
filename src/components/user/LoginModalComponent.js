'use strict';

import React, { PropTypes } from 'react';
import Modal from 'react-modal';
import {reduxForm} from 'redux-form';

require('styles/user/LoginModal.scss');

class LoginModalComponent extends React.Component {
  afterOpenModal() {
    this.refs.username.focus();
  }

  _close() {
    this.props.updateVisibleModal(null);
  }

  _gotoCreate() {
    this.props.updateVisibleModal('create-account');
  }

  _gotoPasswordReset() {
    this.props.updateVisibleModal('request-password-reset');
  }

  render() {
    const {fields: {username, password}, handleSubmit, updateVisibleModal, modalError, isOpen} = this.props;
    let errorClasses = 'row-errors ';
    errorClasses += modalError ? 'show' : 'hide';
    return (
      <Modal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={true}
        onAfterOpen={::this.afterOpenModal}
        onRequestClose={::this._close}
        className="of-modal modal-dialog"
        overlayClassName="modal-backdrop"
        closeTimeoutMS={500}
        >

        <form onSubmit={handleSubmit}>
          <div className="modal-content">
            <div className="modal-header">
              <button className="close" onClick={::this._close} type=
              "button">&times;</button>
              <h3 className="modal-title">Log In</h3>
            </div>
            <div className="modal-body">
              <div className={errorClasses}>
                <div className="alert alert-danger" role="alert">
                  {modalError}
                </div>
              </div>
              <div className="form-group">
                  <label htmlFor="Username">Username</label>
                  <input type="text" ref={username.name} className="form-control" placeholder="username" autoFocus={true} autoCapitalize="off" {...username}/>
              </div>
              <div className="form-group">
                  <label htmlFor="Password">Password</label>
                  <input type="password" className="form-control" autoCapitalize="off" placeholder="password" {...password}/>
              </div>
            </div>
            <div className="modal-footer">
              <div className="form-group">
                  <button type="submit" className="btn btn-default btn-fw">Log In</button>
              </div>
              <div className="switch-text">
                  <p>
                    <span className="anchor" onClick={() => updateVisibleModal('create-account')}>Create an account</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="anchor" onClick={() => updateVisibleModal('request-password-reset')}>Reset password</span>
                  </p>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    );
  }
}

LoginModalComponent = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'login',                           // a unique name for this form
  fields: ['username', 'password'] // all the fields in your form
})(LoginModalComponent);

LoginModalComponent.displayName = 'CommonLoginModalComponent';

// Uncomment properties you need
LoginModalComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
// LoginModalComponent.defaultProps = {};

export default LoginModalComponent;
