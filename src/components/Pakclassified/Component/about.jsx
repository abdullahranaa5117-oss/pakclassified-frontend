import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import lc300 from "../../../assets/lc300.jpg";
import civic from "../../../assets/civic.jpg";
import fixedcar from "../../../assets/fixedimg.webp";
import gwagan from "../../../assets/hummer.jpg";
import bmw4 from "../../../assets/bmw 4.jpg";

function About() {
  return (
    <Container fluid>
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
                ABOUT US
              </h1>
            </div>
          </div>

        </Col>
      </Row>
      <Row className="align-items-center">
        <Col lg={6}>
          <Row>
            <Col xs={6}>
              <Image
                src={gwagan}
                className="w-100"
                style={{ height: "150px", objectFit: "cover" }}
                loading="lazy"

              />
            </Col>
            <Col xs={6}>
              <Image
                src={civic}
                className="w-100 mt-4"
                style={{ height: "150px", objectFit: "cover" }}
                loading="lazy"

              />
            </Col>
            <Col xs={6}>
              <Image
                src={lc300}
                className="w-100"
                style={{ height: "150px", objectFit: "cover" }}
                loading="lazy"

              />
            </Col>
            <Col xs={6}>
              <Image
                src={bmw4}
                className="w-100 mt-4 "
                style={{ height: "150px", objectFit: "cover" }}
                loading="lazy"

              />
            </Col>
          </Row>
        </Col>
        <Col lg={6} className="mb-4">
          <h1 className="fw-bold text-success mb-4">
            About PakClasified
          </h1>
          <p className="fs-4 lh-lg">
            PakClasified is Pakistan’s trusted platform for buying and selling vehicles.
            We make trading simple, secure, and fast — all in one place.
          </p>
          <p className="fs-5 text-muted">
            From luxury cars to budget rides, we connect real buyers with verified sellers.
            Our goal is to give you confidence, transparency, and convenience.
          </p>
          <p className="fs-6 text-secondary">
            Buy smarter, Sell faster, Drive happier.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default About;