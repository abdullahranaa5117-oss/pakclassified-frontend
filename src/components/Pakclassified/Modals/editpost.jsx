import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function EditPostAdForm({ show, handleClose, ad, onAdUpdated }) {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
    const [categories, setCategories] = useState([]);
    const [cityAreas, setCityAreas] = useState([]);

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/AdvertisementCategory`);
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message);
                return;
            }
            setCategories(data);
        } catch {
            toast.error("Categories fetching failed");
        }
    };

    const fetchCityAreas = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/CityArea`);
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message);
                return;
            }
            setCityAreas(data);
        } catch {
            toast.error("Cityarea fetching failed");
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchCityAreas();
    }, []);

    const onSubmit = async (formData) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Please login first");
                return;
            }
            const payload = new FormData();
            payload.append("Name", formData.Name);
            payload.append("Description", formData.Description);
            payload.append("Category", formData.Category);
            payload.append("CityArea", formData.CityArea);
            payload.append("Price", formData.Price);
            payload.append("StartsOn", formData.StartsOn);
            payload.append("EndsOn", formData.EndsOn);
            if (formData.Images && formData.Images.length > 0) {
                payload.append("Images", formData.Images[0]);
            }

            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/Advertisement/${ad._id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: payload,
            });
            const data = await res.json();
            if (!res.ok) {
                toast.error(data.message);
                return;
            }

            if (onAdUpdated) onAdUpdated(data);
            reset();
            handleClose();
            toast.success("Advertisement updated successfully!");
        } catch (err) {
            toast.error("No internet connection");
        }
    };

    useEffect(() => {
        if (ad) {
            reset({
                Name: ad.Name,
                Description: ad.Description,
                Category: ad.Category?._id,
                CityArea: ad.CityArea?._id,
                Price: ad.Price,
                StartsOn: ad.StartsOn?.split("T")[0],
                EndsOn: ad.EndsOn?.split("T")[0],

            });
        }
    }, [ad, reset]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Advertisement</Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control {...register("Name", { required: "Name is required" })} />
                        {errors.Name && <Form.Text className="text-danger">{errors.Name.message}</Form.Text>}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            {...register("Description", { required: "Description is required", minLength: { value: 50, message: "Min 50 characters" } })}
                        />
                        {errors.Description && <Form.Text className="text-danger">{errors.Description.message}</Form.Text>}
                    </Form.Group>
                    <div className="d-flex justify-content-between gap-3">
                        <Form.Group className="mb-3 flex-grow-1">
                            <Form.Label>Category</Form.Label>
                            <Form.Select {...register("Category", { required: "Category is required" })}>
                                <option>Select Category</option>
                                {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.Name}</option>)}
                            </Form.Select>
                            {errors.Category && <Form.Text className="text-danger">{errors.Category.message}</Form.Text>}
                        </Form.Group>

                        <Form.Group className="mb-3 flex-grow-1">
                            <Form.Label>CityArea</Form.Label>
                            <Form.Select {...register("CityArea", { required: "City is required" })}>
                                <option>Select CityArea</option>
                                {cityAreas.map(ca => <option key={ca._id} value={ca._id}>{ca.Name}</option>)}
                            </Form.Select>
                            {errors.CityArea && <Form.Text className="text-danger">{errors.CityArea.message}</Form.Text>}
                        </Form.Group>
                    </div>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" {...register("Price", { required: "Price is required", min: { value: 1, message: "Price must be greater than 0" } })} />
                        {errors.Price && <Form.Text className="text-danger">{errors.Price.message}</Form.Text>}
                    </Form.Group>
                    <div className="d-flex justify-content-between gap-3">
                        <Form.Group className="mb-3 flex-grow-1">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type="date" {...register("StartsOn", { required: "Start date required" })} />
                        </Form.Group>
                        <Form.Group className="mb-3 flex-grow-1">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control type="date" {...register("EndsOn", { required: "End date required" })} />
                        </Form.Group>
                    </div>
                    <Form.Group className="mb-3">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control type="file" accept="images/*" {...register("Images")} />

                        {errors.Images && <Form.Text className="text-danger">{errors.Images.message}</Form.Text>}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="success" type="submit" disabled={isSubmitting}>Update Advertisement</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default EditPostAdForm;
