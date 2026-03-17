import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLatestAds } from "../redux/slices/adSlice";

export default function LatestPosts() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const latestAds = useSelector((state) => state.ads.latestAds);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/Advertisement/latest`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setLatestAds(data));
      })
      .catch(() => toast.error("Failed to fetch latest ads"))
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (latestAds.length === 0) {
    return <p className="text-center my-5">No ads found.</p>;
  }

  return (
    <div className="my-4">
      <h2 className="text-success text-center mb-3">Latest Posts</h2>

      <Row className="g-3">
        {latestAds.map((ad) => (
          <Col md={4} key={ad._id}>
            <Card>
              {ad.Images && (
                <Card.Img
                  variant="top"
                  src={`${import.meta.env.VITE_BASE_URL}${ad.Images}`}
                  alt="ad img"
                  loading="lazy"
                  style={{ height: 200, objectFit: "cover" }}
                />
              )}

              <Card.Body>
                <Card.Title>{ad.Name}</Card.Title>
                <Card.Text>{ad.Description}</Card.Text>

                <Button
                  variant="success"
                  onClick={() => navigate(`/ad/${ad._id}`)}
                >
                  More Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
