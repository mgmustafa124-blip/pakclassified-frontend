import { useEffect, useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Signup from "./Signup";
import { UserContext } from "../context/User.context";

function Login({ show, handleClose }) {

    const user = useContext(UserContext);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            Email: '',
            Password: ''
        }
    });

    const onSubmit = async (data) => {
        try {
            const payload = {
                Email: data.Email,
                Password: data.Password
            };
            const loginfetch = await fetch("http://localhost:3000/User/Login", {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const jsondata = await loginfetch.json();

            if (!loginfetch.ok) {
                toast.error('Data is not matched');
                return;
            }
            if (loginfetch.ok) {
                toast.success('User is logined');
            }

            localStorage.setItem("auth", JSON.stringify(jsondata));
            console.log(jsondata.data);
            user.setuser(jsondata.data);
            
            reset();
            handleClose();
        } catch (error) {
            console.error('Failed:', error);
        }
    };

    const [signup, setsignup] = useState(false);

    return (
        <>
            <Toaster position="top-right" />
            
            {/* Custom CSS overrides for Responsiveness and Visibility */}
            <style>{`
                .modal-backdrop {
                    background-color: rgba(0, 0, 0, 0.85) !important;
                }

                .premium-login-modal .modal-content {
                    background-color: #0b0b0b;
                    border: 1px solid rgba(220, 53, 69, 0.2);
                    color: #ffffff;
                    position: relative;
                    padding: 30px 20px;
                }

                /* Responsive Padding for Small Screens */
                @media (max-width: 576px) {
                    .premium-login-modal .modal-content {
                        padding: 20px 10px;
                    }
                }

                /* Large Geometric Red Corner Accents */
                .premium-login-modal .modal-content::before {
                    content: '';
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    width: 40px;
                    height: 40px;
                    border-top: 4px solid #dc3545;
                    border-left: 4px solid #dc3545;
                    pointer-events: none;
                }

                .premium-login-modal .modal-content::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    right: -2px;
                    width: 40px;
                    height: 40px;
                    border-bottom: 4px solid #dc3545;
                    border-right: 4px solid #dc3545;
                    pointer-events: none;
                }

                /* Custom Input fields */
                .premium-login-modal .form-control {
                    background-color: #141414 !important;
                    border: 1px solid #2d2d2d !important;
                    color: #ffffff !important;
                    letter-spacing: 0.5px;
                }

                /* High Visibility Placeholders */
                .premium-login-modal .form-control::placeholder {
                    color: #a0a0a0 !important;
                    opacity: 1 !important;
                }

                /* Normal Focus State (Red Glow) */
                .premium-login-modal .form-control:focus {
                    border-color: #dc3545 !important;
                    box-shadow: 0 0 8px rgba(220, 53, 69, 0.4) !important;
                }

                /* Error Focus State Override */
                .premium-login-modal .form-control.is-invalid:focus {
                    box-shadow: 0 0 8px rgba(220, 53, 69, 0.6) !important;
                }

                .premium-login-modal .btn-close {
                    filter: invert(1) sepia(1) saturate(5) hue-rotate(330deg);
                    opacity: 0.8;
                }
                .premium-login-modal .btn-close:hover {
                    opacity: 1;
                }

                .btn-custom-submit {
                    background-color: transparent;
                    color: #dc3545;
                    border: 2px solid #dc3545;
                    transition: all 0.3s ease;
                }
                .btn-custom-submit:hover:not(:disabled) {
                    background-color: #dc3545;
                    color: #000000;
                    box-shadow: 0 0 15px rgba(220, 53, 69, 0.4);
                }
            `}</style>

            <Modal
                show={show}
                onHide={handleClose}
                centered
                className='premium-login-modal'
                contentClassName="rounded-0"
                dialogClassName="mx-3 mx-sm-auto" /* Adds margin on mobile screens */
            >
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="w-100 text-center mt-2">
                        <h2 className="fw-black text-uppercase tracking-wider m-0 fs-3 fs-sm-2">
                            <span style={{ color: '#dc3545' }}>Login</span> Access
                        </h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-4">
                    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Form.Group className="mb-3" controlId="loginEmail">
                            <Form.Label className="text-uppercase text-light opacity-75 small fw-bold tracking-wide">
                                Email
                            </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="driver@performance.com"
                                className="rounded-0 py-2"
                                isInvalid={!!errors.Email}
                                {...register('Email', {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Invalid email format"
                                    }
                                })}
                            />
                            <Form.Control.Feedback type="invalid" className="text-danger fw-semibold mt-1">
                                {errors.Email?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="loginPassword">
                            <div className="d-flex justify-content-between align-items-center">
                                <Form.Label className="text-uppercase text-light opacity-75 small fw-bold tracking-wide mb-1">
                                    Password
                                </Form.Label>
                                <a href="#forgot" className="text-decoration-none small" style={{ color: '#dc3545', fontSize: '0.85rem' }}>
                                    Forgot Password?
                                </a>
                            </div>
                            <Form.Control
                                type="password"
                                placeholder="••••••••"
                                className="rounded-0 py-2"
                                isInvalid={!!errors.Password}
                                {...register('Password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters'
                                    }
                                })}
                            />
                            <Form.Control.Feedback type="invalid" className="text-danger fw-semibold mt-1">
                                {errors.Password?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div className="d-flex flex-column gap-2 mt-4">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-custom-submit fw-bold py-2 rounded-0 text-uppercase tracking-wider"
                            >
                                {isSubmitting ? 'Authenticating...' : 'Login'}
                            </Button>

                            <div className="text-center mt-3">
                                <span className="text-muted small">Don't have an account? </span>
                                <a href="#register" onClick={(e) => {
                                    e.preventDefault();
                                    setsignup(true);
                                    handleClose();
                                }} className="text-decoration-none small fw-medium" style={{ color: '#ffffff' }}>
                                    Create account
                                </a>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            <Signup show={signup} handleClose={() => setsignup(false)} />
        </>
    );
}

export default Login;