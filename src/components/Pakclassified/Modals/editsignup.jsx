import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function EditSignup({ show, handleClose, user, onUserUpdated }) {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        mode: 'onChange',
    });
    const onSubmit = async (signdata) => {
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/user/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(signdata),
            });

            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message || "Update failed");
                return;
            }

            if (typeof onUserUpdated === "function") {
                onUserUpdated(data);
            }

            reset();
            handleClose();
            toast.success("User updated successfully!");
        } catch (error) {
            console.error(error);
            toast.error("No Internet Connection");
        }
    };

    useEffect(() => {
        if (user) {
            reset({
                Name: user.Name,
                Email: user.Email,
                ContactNumber: user.ContactNumber,
                BirthDate: user.BirthDate,
            });
        }
    }, [user, reset]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" type="submit" disabled={isSubmitting}>
                        Update
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default EditSignup;
