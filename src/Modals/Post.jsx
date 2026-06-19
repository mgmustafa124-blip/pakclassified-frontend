import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import React, { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { UserContext } from "../context/User.context";

function Post({ show, handleClose, postId = null, onRefresh }) {

    const [category, setcategory] = useState([])
    const [city, setcity] = useState([])
    const [status, setstatus] = useState([])
    const user = useContext(UserContext)
    const url = import.meta.env.VITE_API_URL;

    const {
        register,
        handleSubmit,
        reset,
        setValue, 
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            Name: '', Price: '', Description: '', Startdate: '', Enddate: '',
            CategoryID: '', CityID: '', StatusID: '', Image: ''
        }
    });

    useEffect(() => {
        if (postId && show) {
            const fetchSinglePost = async () => {
                try {
                    const res = await fetch(`${url}/Post/read`); 
                    const allPosts = await res.json();
                    const currentPost = allPosts.find(p => (p._id || p.id) === postId);

                    if (currentPost) {
                        const formatDate = (d) => d ? new Date(d).toISOString().split('T')[0] : '';

                        setValue("Name", currentPost.Name);
                        setValue("Price", currentPost.Price);
                        setValue("Description", currentPost.Description);
                        setValue("Startdate", formatDate(currentPost.Startdate));
                        setValue("Enddate", formatDate(currentPost.Enddate));
                        setValue("CategoryID", currentPost.CategoryID?._id || currentPost.CategoryID);
                        setValue("CityID", currentPost.CityID?._id || currentPost.CityID);
                        setValue("StatusID", currentPost.StatusID?._id || currentPost.StatusID);
                    }
                } catch (err) {
                    console.error("Purana data lane mein masla aya:", err);
                }
            };
            fetchSinglePost();
        } else if (!postId && show) {
            reset(); 
        }
    }, [postId, show, setValue, reset]);

    useEffect(() => {
        const fetchDropdowns = async () => {
            try {
                const resCity = await fetch(`${url}/City/read`);
                if (resCity.status === 200) setcity(await resCity.json());

                const resCat = await fetch(`${url}/Category/read`);
                if (resCat.status === 200) setcategory(await resCat.json());

                const resStatus = await fetch(`${url}/Status/read`);
                if (resStatus.status === 200) setstatus(await resStatus.json());
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchDropdowns();
    }, []);

    const onSubmit = async (data) => {
        try {
            const formdata = new FormData();
            formdata.append("Name", data.Name);
            formdata.append("Price", data.Price);
            formdata.append("Description", data.Description);
            formdata.append("Startdate", data.Startdate);
            formdata.append("Enddate", data.Enddate);
            formdata.append("CategoryID", data.CategoryID);
            formdata.append("CityID", data.CityID);
            formdata.append("UserID", user?.user?.id || user?.user?._id);
            formdata.append("StatusID", data.StatusID);
            
            if (data.Image && data.Image[0]) {
                formdata.append("Image", data.Image[0]);
            }

            const Token = JSON.parse(localStorage.getItem("auth"));

            const url = postId 
                ? `${url}/Post/update/${postId}` 
                : `${url}/Post/create`;
            
            const method = postId ? "PUT" : "POST";

            const postfetch = await fetch(url, {
                method: method,
                body: formdata,
                headers: {
                    'Authorization': `Bearer ${Token?.token}`
                }
            });

            if (!postfetch.ok) {
                toast.error("Kuch ghalat hua. Data sahi nahi hai.");
                return;
            }

            toast.success(postId ? 'Data Updated successfully!' : 'Data Posted successfully!');
            reset();
            handleClose();
            if (onRefresh) onRefresh(); 
        } catch (error) {
            console.error('Failed:', error);
            toast.error("Kuch ghalat hua!");
        }
    };

    return (
        <>
            <Toaster position="top-right" />
            
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
                
                /* Responsive padding for small screens */
                @media (max-width: 576px) {
                    .premium-login-modal .modal-content {
                        padding: 20px 12px;
                    }
                }

                .premium-login-modal .modal-content::before { content: ''; position: absolute; top: -2px; left: -2px; width: 40px; height: 40px; border-top: 4px solid #dc3545; border-left: 4px solid #dc3545; pointer-events: none; }
                .premium-login-modal .modal-content::after { content: ''; position: absolute; bottom: -2px; right: -2px; width: 40px; height: 40px; border-bottom: 4px solid #dc3545; border-right: 4px solid #dc3545; pointer-events: none; }
                
                .premium-login-modal .form-control, .premium-login-modal .form-select { 
                    background-color: #141414 !important; 
                    border: 1px solid #2d2d2d !important; 
                    color: #ffffff !important; 
                    letter-spacing: 0.5px; 
                }
                
                /* Placeholder styling for visibility */
                .premium-login-modal .form-control::placeholder {
                    color: #9c9c9c !important;
                    opacity: 1 !important;
                }

                .premium-login-modal .form-control:focus, .premium-login-modal .form-select:focus { border-color: #dc3545 !important; box-shadow: 0 0 8px rgba(220, 53, 69, 0.4) !important; }
                .premium-login-modal .btn-close { filter: invert(1) sepia(1) saturate(5) hue-rotate(330deg); opacity: 0.8; }
                
                .btn-custom-submit { background-color: transparent; color: #dc3545; border: 2px solid #dc3545; transition: all 0.3s ease; }
                .btn-custom-submit:hover:not(:disabled) { background-color: #dc3545; color: #000000; box-shadow: 0 0 15px rgba(220, 53, 69, 0.4); }
                
                /* Fixing custom label elements */
                .premium-login-modal label.form-label {
                    text-uppercase: uppercase;
                    font-size: 0.8rem;
                    font-weight: 700;
                    letter-spacing: 0.05em;
                    color: rgba(255, 255, 255, 0.75);
                    margin-bottom: 0.4rem;
                }
            `}</style>

            <Modal 
                show={show} 
                onHide={handleClose} 
                centered 
                size="md" /* Form fields zyada hain, isliye Desktop par 'lg' size responsive lagta hai */
                className='premium-login-modal' 
                contentClassName="rounded-0"
                dialogClassName="mx-2 mx-sm-auto" /* Mobile view par margins ke liye */
            >
                <Modal.Header closeButton className="border-0 pb-0">
                    <Modal.Title className="w-100 text-center mt-2">
                        <h2 className="fw-black text-uppercase tracking-wider m-0 fs-3 fs-sm-2">
                            <span style={{ color: '#dc3545' }}>{postId ? 'Update' : 'Submission'}</span> Form
                        </h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="pt-4">
                    <Form onSubmit={handleSubmit(onSubmit)} noValidate>

                        <div className="row g-3 mb-3">
                            <Form.Group className="col-md-6">
                                <Form.Label className="form-label">Name</Form.Label>
                                <Form.Control
                                    type="text" placeholder="Enter Name" className="rounded-0 py-2"
                                    isInvalid={!!errors.Name}
                                    {...register('Name', { required: "Name is required", minLength: { value: 3, message: 'At least 3 chars' } })}
                                />
                                <Form.Control.Feedback type="invalid" className="fw-semibold">{errors.Name?.message}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="col-md-6">
                                <Form.Label className="form-label">Price</Form.Label>
                                <Form.Control
                                    type="text" placeholder="0.00" className="rounded-0 py-2"
                                    isInvalid={!!errors.Price}
                                    {...register('Price', { required: "Price is required" })}
                                />
                                <Form.Control.Feedback type="invalid" className="fw-semibold">{errors.Price?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <Form.Group className="mb-3">
                            <Form.Label className="form-label">Description</Form.Label>
                            <Form.Control
                                as="textarea" rows={3} placeholder="Enter Description" className="rounded-0 py-2"
                                isInvalid={!!errors.Description}
                                {...register('Description', { required: "Description is required" })}
                            />
                            <Form.Control.Feedback type="invalid" className="fw-semibold">{errors.Description?.message}</Form.Control.Feedback>
                        </Form.Group>

                        <div className="row g-3 mb-3">
                            <Form.Group className="col-md-6">
                                <Form.Label className="form-label">Start Date</Form.Label>
                                <Form.Control
                                    type="date" className="rounded-0 py-2" isInvalid={!!errors.Startdate}
                                    {...register('Startdate', { required: "Start date is required" })}
                                />
                                <Form.Control.Feedback type="invalid" className="fw-semibold">{errors.Startdate?.message}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="col-md-6">
                                <Form.Label className="form-label">End Date</Form.Label>
                                <Form.Control
                                    type="date" className="rounded-0 py-2" isInvalid={!!errors.Enddate}
                                    {...register('Enddate', { required: "End date is required" })}
                                />
                                <Form.Control.Feedback type="invalid" className="fw-semibold">{errors.Enddate?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        {/* Category, City, Status Columns responsive break: col-sm-4 / col-12 */}
                        <div className="row g-3 mb-3">
                            <Form.Group className="col-sm-4 col-12">
                                <Form.Label className="form-label">Category</Form.Label>
                                <Form.Select className="rounded-0 py-2" isInvalid={!!errors.CategoryID} {...register('CategoryID', { required: "Required" })}>
                                    <option value="">Select Category</option>
                                    {category.map((i) => <option value={i._id} key={i._id}>{i.Name}</option>)}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid" className="fw-semibold">{errors.CategoryID?.message}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="col-sm-4 col-12">
                                <Form.Label className="form-label">City</Form.Label>
                                <Form.Select className="rounded-0 py-2" isInvalid={!!errors.CityID} {...register('CityID', { required: "Required" })}>
                                    <option value="">Select City</option>
                                    {city.map((i) => <option value={i._id} key={i._id}>{i.Name}</option>)}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid" className="fw-semibold">{errors.CityID?.message}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="col-sm-4 col-12">
                                <Form.Label className="form-label">Status</Form.Label>
                                <Form.Select className="rounded-0 py-2" isInvalid={!!errors.StatusID} {...register('StatusID', { required: "Required" })}>
                                    <option value="">Select Status</option>
                                    {status.map((i) => <option value={i._id} key={i._id}>{i.Name}</option>)}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid" className="fw-semibold">{errors.StatusID?.message}</Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <Form.Group className="mb-4">
                            <Form.Label className="form-label">Image</Form.Label>
                            <Form.Control
                                type="file" className="rounded-0 py-2" isInvalid={!!errors.Image}
                                {...register('Image', { 
                                    required: postId ? false : 'Image is required' 
                                })}
                            />
                            <Form.Control.Feedback type="invalid" className="fw-semibold">{errors.Image?.message}</Form.Control.Feedback>
                        </Form.Group>

                        <div className="d-flex flex-column gap-2 mt-4">
                            <Button type="submit" disabled={isSubmitting} className="btn-custom-submit fw-bold py-2.5 rounded-0 text-uppercase tracking-wider">
                                {isSubmitting ? 'Processing...' : postId ? 'Update Data' : 'Submit Data'}
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Post;