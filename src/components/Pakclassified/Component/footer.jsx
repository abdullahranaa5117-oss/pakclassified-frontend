import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container fluid  >
        <Row>
          <Col md={3}>
            <h5>PakClasified</h5>
            <p>Your trusted platform for buying and selling cars in Pakistan.</p>
          </Col>
          <Col md={3} className="text-md">
            <h5>Quick Links</h5>              
                <Link to="/" className="nav-link">  Home </Link>
                <Link to="/about" className="nav-link">   About  </Link>
                <Link to="/contact" className="nav-link">   Contact </Link>
          </Col>

          <Col md={3} className="text-md">
            <h5>Contacts</h5>
            <p>Ferozpur Road , Gulberg , Lahore </p>
            <p>03204903510</p>
            <p>abdullahranaa5117@gmail.com</p>
          </Col>
          <Col md={3} className="text-md">
            <h5>NewsLetter</h5>
            <p>Subscribe to our newsletter for the lastest updates</p>

          </Col>

        </Row>
        <Row>
          <Col className="text-center mt-3">&copy; 2025 PakClasified. All rights reserved Designed by Abdullah Rajpoot</Col>
        </Row>
      </Container>
    </footer>
  );
}
export default Footer;