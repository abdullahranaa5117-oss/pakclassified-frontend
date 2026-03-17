import React from "react";
import { Container, Form, Button, Row, Col, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import fixedcar from "../../../assets/fixedimg.webp";

function Contact() {
  const { register, handleSubmit, reset } = useForm();
  
  const onSubmit = async (Formdata) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/v1/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Formdata),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to send message");
        return;
      }
      reset();
      toast.success("Message sent successfully!");
    } catch (err) {
      toast.error("No Internet connection");
    }
  };
  return (
    <Container fluid className="my-5">
      <Row className="mb-5">
        <Col className="position-relative p-0">
          <div className="position-relative">
            <Image
              src={fixedcar}
              alt="Hero"
              loading="lazy"
              className="w-100"
              style={{ height: "400px", objectFit: "cover" }}
            />
            <div className="position-absolute top-50 ps-4">
              <h1 className="text-white fw-bold ">
                Contact
              </h1>
            </div>
          </div>

        </Col>
      </Row>
      <Row>
        <h2 className="text-success mb-3 text-center">Contact Us</h2>
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Control {...register("name", { required: true })} placeholder="Enter your name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                {...register("email", { required: true })}
                type="email"
                placeholder="Enter your email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                {...register("subject", { required: true })}
                type="text"
                placeholder="Enter your Subject"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                {...register("message", { required: true })}
                as="textarea"
                rows={4}
                placeholder="Enter your message"
              />
            </Form.Group>
            <Button type="submit" variant="success">Send Message</Button>
          </Form>
        </Col>
        <Col>
          <div>
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13610.75909430319!2d74.3436!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e8d0b8ff%3A0x9c2c7b2a5f3c92f3!2sLahore!5e0!3m2!1sen!2s!4v1700000000000"
              width="100%"
              height="300"
              allowFullScreen
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;