import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

function Signup({ show, handleClose }) {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            Name: '',
            Email: '',
            Password: '',
            ConfirmPassword: '',
            Image: ''
        }
    });

    const onSubmit = async (data) => {
        try {
            if (data.Password !== data.ConfirmPassword) {
                toast.error('Passwords do not match');
                return;
            }

            const formdata = new FormData();
            formdata.append("Name", data.Name);
            formdata.append("Email", data.Email);
            formdata.append("Password", data.Password);
            formdata.append("Image", data.Image[0]);

            const signupfetch = await fetch('http://localhost:3000/User/create', {
                method: "POST",
                body: formdata,
            });

            if (!signupfetch.ok) {
                toast.error("There is some error during signup");
                return;
            }

            toast.success('User is Signed up successfully!');
            reset();
            handleClose();
        } catch (error) {
            console.error('Failed:', error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <>
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

                /* Mobile View Dynamic Padding */
                @media (max-width: 576px) {
                    .premium-login-modal .modal-content {
                        padding: 20px 15px;
                    }
                }

                .premium-login-modal .modal-content::before {
                    content: ''; position: absolute; top: -2px; left: -2px; width: 40px; height: 40px; border-top: 4px solid #dc3545; border-left: 4px solid #dc3545; pointer-events: none;
                }

                .premium-login-modal .modal-content::after {
                    content: ''; position: absolute; bottom: -2px; right: -2px; width: 40px; height: 40px; border-bottom: 4px solid #dc3545; border-right: 4px solid #dc3545; pointer-events: none;
                }

                .premium-login-modal .form-control {
                    background-color: #141414 !important;
                    border: 1px solid #2d2d2d !important;
                    color: #ffffff !important;
                    letter-spacing: 0.5px;
                }

                .premium-login-modal .form-control:focus {
                    border-color: #dc3545 !important;
                    box-shadow: 0 0 8px rgba(220, 53, 69, 0.4) !important;
                }

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
                size="md"
                className='premium-login-modal'
                contentClassName="rounded-0"
                dialogClassName="mx-2 mx-sm-auto" /* Mobile par gaps maintain rakhne k liye */
            >
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="w-100 text-center mt-2">
                        <h2 className="fw-black text-uppercase tracking-wider m-0 fs-3 fs-sm-2">
                            <span style={{ color: '#dc3545' }}>Signup</span> Access
                        </h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-4">
                    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                        
                        {/* Name Field */}
                        <Form.Group className="mb-3" controlId="signupName">
                            <Form.Label className="text-uppercase text-light opacity-75 small fw-bold tracking-wide">
                                Name
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your Name"
                                className="rounded-0 py-2.5"
                                isInvalid={!!errors.Name}
                                {...register('Name', {
                                    required: "Name is required",
                                    minLength: {
                                        value: 3,
                                        message: 'Name must be at least 3 characters'
                                    }
                                })}
                            />
                            <Form.Control.Feedback type="invalid" className="text-danger fw-semibold mt-1">
                                {errors.Name?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Email Field */}
                        <Form.Group className="mb-3" controlId="signupEmail">
                            <Form.Label className="text-uppercase text-light opacity-75 small fw-bold tracking-wide">
                                Email
                            </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="driver@performance.com"
                                className="rounded-0 py-2.5"
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

                        {/* Password Grid (Responsive Flex Replacement) */}
                        <div className="row g-3 mb-3">
                            <Form.Group className="col-sm-6 col-12" controlId="signupPassword">
                                <Form.Label className="text-uppercase text-light opacity-75 small fw-bold tracking-wide mb-1">
                                    Password
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="••••••••"
                                    className="rounded-0 py-2.5"
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

                            <Form.Group className="col-sm-6 col-12" controlId="signupConfirmPassword">
                                <Form.Label className="text-uppercase text-light opacity-75 small fw-bold tracking-wide mb-1">
                                    Confirm Password
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="••••••••"
                                    className="rounded-0 py-2.5"
                                    isInvalid={!!errors.ConfirmPassword}
                                    {...register('ConfirmPassword', {
                                        required: 'Confirm password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Must be at least 6 characters'
                                        }
                                    })}
                                />
                                <Form.Control.Feedback type="invalid" className="text-danger fw-semibold mt-1">
                                    {errors.ConfirmPassword?.message}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        {/* Image Field */}
                        <Form.Group className="mb-4" controlId="signupImage">
                            <Form.Label className="text-uppercase text-light opacity-75 small fw-bold tracking-wide mb-1">
                                Image
                            </Form.Label>
                            <Form.Control
                                type="file"
                                className="rounded-0 py-2.5"
                                isInvalid={!!errors.Image}
                                {...register('Image', {
                                    required: 'Image is required',
                                })}
                            />
                            <Form.Control.Feedback type="invalid" className="text-danger fw-semibold mt-1">
                                {errors.Image?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Submit Button */}
                        <div className="d-flex flex-column gap-2 mt-4">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn-custom-submit fw-bold py-2.5 rounded-0 text-uppercase tracking-wider"
                            >
                                {isSubmitting ? 'Authenticating...' : 'Signup'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            <Toaster position="top-right" />
        </>
    );
}

export default Signup;