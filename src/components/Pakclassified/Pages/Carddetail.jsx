import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, ListGroup, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaTag, FaUser, FaMoneyBill } from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setAdDetail } from "../redux/slices/adSlice";
import fixedcar from "../../../assets/fixedimg.webp";

const CarDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const ad = useSelector((state) => state.ads.adDetail);
  const [loading, setLoading] = useState(true);

  const fetchAd = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/Advertisement/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      dispatch(setAdDetail(data));
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch advertisement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAd();
  }, [id]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  if (!ad) return <p className="text-center my-5">Advertisement not found.</p>;

  return (
    <Container fluid className="my-5">
      <Row className="mb-5">
        <Col className="position-relative p-0">
          <div className="position-relative">
            <img
              src={fixedcar}
              alt="Hero"
              className="w-100"
              loading="lazy"
              style={{ height: "400px", objectFit: "cover" }}
            />
            <div className="position-absolute top-50 ps-4">
              <h1 className="text-white fw-bold">More Detail</h1>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={7} className="p-4">
          <div className="d-flex gap-3">
            {ad.Images && (
              <Card.Img
                src={`${import.meta.env.VITE_BASE_URL}${ad.Images}`}
                alt={ad.Name}
                loading="lazy"
                className="mb-3"
                style={{ width: "150px", height: "70px", objectFit: "cover" }}
              />
            )}
            <div>
              <h3>{ad.Name}</h3>
              <p className="text-muted">
                <FaMapMarkerAlt className="text-success me-1" />
                {ad.CityArea?.Name}
                <span className="ms-3">
                  <FaMoneyBill className="text-success me-2" />
                  {ad.Price}
                </span>
                <span className="ms-3">
                  {ad.StartsOn?.split("T")[0]}
                </span>
                <span className="ms-3 ">
                  {ad.EndsOn?.split("T")[0]}
                </span>


              </p>
            </div>
          </div>
          <h3 className="mt-2 border-bottom pb-2">Description</h3>
          <p>{ad.Description}</p>
        </Col>

        <Col lg={5} className="p-4">
          <Card className="shadow-sm border-0 bg-light">
            <Card.Body>
              <Card.Title className="fw-bold mb-3">Advertisement Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item className="bg-transparent border-0 ps-0">
                  <FaUser className="text-success me-2" />
                  {ad.PostedBy?.Name || "Unknown"}
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 ps-0">
                  <FaMapMarkerAlt className="text-success me-2" />
                  {ad.CityArea?.Name || "N/A"}
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 ps-0">
                  <FaTag className="text-success me-2" />
                  {ad.Category?.Name || "N/A"}
                </ListGroup.Item>
                <ListGroup.Item className="bg-transparent border-0 ps-0 fw-bold text-success">
                  <FaMoneyBill className="text-success me-2" />
                  {ad.Price || "N/A"}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CarDetailsPage;
