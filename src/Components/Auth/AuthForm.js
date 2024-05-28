


import React, { Component } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { Auth } from '../../Components/redux/AuthActionCreatior'; // Ensure the file path is correct
import { Navigate } from 'react-router-dom';
import Spinner from '../../Components/Spinner/Sppiner'; // Ensure the file path is correct

const mapStateToProps = state => {
    return {
        authLoading: state.authLoading,
        authError: state.authError,
        token: state.token
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, mode) => dispatch(Auth(email, password, mode))
    };
};

class AuthForm extends Component {
    state = {
        mode: "Sign Up"
    }

    switchModeHandler = () => {
        this.setState({ mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up" });
    }

    render() {
        let authRedirect = null;
        if (this.props.token) {
            authRedirect = <Navigate to="/" />;
        }

        return (
            <div>
                {authRedirect}
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        passwordConfirm: '',
                    }}
                    onSubmit={(values) => {
                        this.props.onAuth(values.email, values.password, this.state.mode);
                    }}
                    validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) { //!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            errors.email = 'Invalid email address';
                        }
                        if (!values.password) {
                            errors.password = 'Required';
                        } else if (values.password.length < 6) {
                            errors.password = 'At least 6 characters';
                        }
                        if (this.state.mode === "Sign Up") {
                            if (!values.passwordConfirm) {
                                errors.passwordConfirm = 'Required';
                            } else if (values.password !== values.passwordConfirm) {
                                errors.passwordConfirm = "Passwords don't match";
                            }
                        }
                        return errors;
                    }}
                >
                    {({ values, handleChange, handleSubmit, errors, touched, handleBlur }) => (
                        <div
                            style={{
                                border: '1px solid grey',
                                padding: '20px',
                                borderRadius: '10px',
                                width: '300px',
                                margin: '0 auto',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                backgroundColor: '#f9f9f9'
                            }}
                        >
                            <button 
                                style={{ width: "100%", color: "white", backgroundColor: "#D70564" }} 
                                className='btn btn-lg' 
                                onClick={this.switchModeHandler}
                            >
                                Switch to {this.state.mode === "Sign Up" ? "Login" : "Sign Up"}
                            </button>
                            <br />
                            <br />
                            {this.props.authLoading ? <Spinner /> : (
                                <form onSubmit={handleSubmit}>
                                    <div style={{ marginBottom: '15px' }}>
                                        <input
                                            name="email"
                                            placeholder="Enter your Email"
                                            className="form"
                                            style={{
                                                width: '100%',
                                                padding: '10px',
                                                marginBottom: '5px',
                                                borderRadius: '5px',
                                                border: '1px solid #ccc',
                                                boxSizing: 'border-box'
                                            }}
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.email && touched.email && (
                                            <div style={{ color: 'red', marginTop: '5px', textAlign: 'left', fontWeight: "400" }}>{errors.email}</div>
                                        )}
                                    </div>

                                    <div style={{ marginBottom: '15px' }}>
                                        <input
                                            name="password"
                                            placeholder="Password"
                                            className="form"
                                            type="password"
                                            style={{
                                                width: '100%',
                                                padding: '10px',
                                                marginBottom: '5px',
                                                borderRadius: '5px',
                                                border: '1px solid #ccc',
                                                boxSizing: 'border-box'
                                            }}
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.password && touched.password && (
                                            <div style={{ color: 'red', marginTop: '5px', textAlign: 'left', fontWeight: "400" }}>{errors.password}</div>
                                        )}
                                    </div>

                                    {this.state.mode === "Sign Up" && (
                                        <div style={{ marginBottom: '15px' }}>
                                            <input
                                                name="passwordConfirm"
                                                placeholder="Confirm Your Password"
                                                className="form"
                                                type="password"
                                                style={{
                                                    width: '100%',
                                                    padding: '10px',
                                                    marginBottom: '5px',
                                                    borderRadius: '5px',
                                                    border: '1px solid #ccc',
                                                    boxSizing: 'border-box'
                                                }}
                                                value={values.passwordConfirm}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.passwordConfirm && touched.passwordConfirm && (
                                                <div style={{ color: 'red', marginTop: '5px', textAlign: 'left', fontWeight: "400" }}>{errors.passwordConfirm}</div>
                                            )}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                        style={{
                                            padding: '10px 15px',
                                            borderRadius: '5px',
                                            backgroundColor: '#28a745',
                                            color: '#fff',
                                            border: 'none',
                                            cursor: 'pointer',
                                            width: '100%',
                                            boxSizing: 'border-box'
                                        }}
                                    >
                                        {this.state.mode === "Sign Up" ? "Sign Up" : "Login"}
                                    </button>
                                </form>
                            )}
                            {this.props.authError && <p style={{ color: 'red' }}>{this.props.authError.message}</p>}
                        </div>
                    )}
                </Formik>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
