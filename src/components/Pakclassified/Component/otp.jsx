import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form } from "react-bootstrap";

const VerifyOTP = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const email = localStorage.getItem("pendingEmail");

    if (!email) {
      return toast.error("Email not found. Please signup again.");
    }

    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/user/verify-otp`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Email: email,
          OTP: formData.OTP
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return toast.error(data.message);
    }

    localStorage.removeItem("pendingEmail");

    toast.success("OTP verified successfully");
    navigate("/");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="d-flex justify-content-center " >
      <Form.Group className="me-2">
        <Form.Control
          maxLength={6}
          placeholder="Enter 6 digit OTP"
          {...register("OTP", { required: true })}
        />

      </Form.Group>
      <Button type="submit" className="bg-success">Verify OTP</Button>
    </Form>
  );
};

export default VerifyOTP;
