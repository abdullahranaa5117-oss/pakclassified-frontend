import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";

function Signup({ show, handleClose }) {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ mode: 'onChange' });
      const dispatch = useDispatch();
    const onSubmit = async (signdata) => {
        try {
            const formData = new FormData();
            formData.append('Name', signdata.Name);
            formData.append('Email', signdata.Email);
            formData.append('Password', signdata.Password);
            formData.append('ContactNumber', signdata.ContactNumber);
            formData.append('BirthDate', signdata.BirthDate);
            formData.append('SecurityQuestion', signdata.SecurityQuestion);
            formData.append('SecurityAnswer', signdata.SecurityAnswer);
            formData.append('ApiKey', signdata.ApiKey);
            formData.append('LoginId', signdata.LoginId);


            if (signdata.Image && signdata.Image.length > 0) {
                formData.append('Image', signdata.Image[0]);
            }

            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/user/signup`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || "Signup failed");
                return;
            }
            dispatch(
                setUser({
                    user: data.user,
                    token: data.token,
                })
            );
            localStorage.setItem("pendingEmail", signdata.Email);

            reset();
            handleClose();
            navigate("/verify-otp");
            toast.success("Signup Successful!");
        } catch (error) {
            console.error(error);
            toast.error("No Internet Connection");
        }

    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body>
                    <Form.Group className="mb-2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            {...register('Name', { required: 'Name is required' })}
                        />
                        {errors.Name && <Form.Text className="text-danger">{errors.Name.message}</Form.Text>}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            {...register('Email', { required: 'Email is required' })}
                        />
                        {errors.Email && <Form.Text className="text-danger">{errors.Email.message}</Form.Text>}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Password</Form.Label>

                        <div className="position-relative">
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                {...register("Password", {
                                    required: "Password required",
                                    minLength: { value: 6, message: "Min 6 characters" },
                                })}
                                style={{ paddingRight: "40px" }}
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    right: "12px",
                                    transform: "translateY(-50%)",
                                    cursor: "pointer",
                                    color: "#6c757d",
                                }}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        {errors.Password && (
                            <Form.Text className="text-danger">
                                {errors.Password.message}
                            </Form.Text>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                            {...register('ContactNumber', { required: 'Contact required' })}
                        />
                        {errors.ContactNumber && <Form.Text className="text-danger">{errors.ContactNumber.message}</Form.Text>}
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Birth Date</Form.Label>
                        <Form.Control
                            type="date"
                            {...register('BirthDate', { required: 'Birth date required' })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Security Question</Form.Label>
                        <Form.Control
                            {...register('SecurityQuestion', { required: 'Required' })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Security Answer</Form.Label>
                        <Form.Control
                            {...register('SecurityAnswer', { required: 'Required' })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>API Key</Form.Label>
                        <Form.Control
                            {...register('ApiKey', { required: 'API Key required' })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Login ID</Form.Label>
                        <Form.Control
                            {...register('LoginId', { required: 'Login ID required' })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Profile Image</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            {...register('Image', { required: 'Image required' })}
                        />
                        {errors.Image && <Form.Text className="text-danger">{errors.Image.message}</Form.Text>}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" type="submit" disabled={isSubmitting}>
                        Signup
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default Signup;