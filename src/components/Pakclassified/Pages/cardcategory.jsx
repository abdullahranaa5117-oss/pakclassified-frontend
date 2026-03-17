import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Card, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryAds } from "../redux/slices/adSlice"; 

function CategoryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const ads = useSelector((state) => state.ads.categoryAds); 
  const [loading, setLoading] = useState(true);

  const fetchAdsByCategory = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/Advertisement?category=${id}`
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      dispatch(setCategoryAds(data)); 
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch ads for this category");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdsByCategory();
  }, [id, dispatch]);

  if (loading) return <Spinner className="m-5" />;

  return (
    <div className="container mt-4">
      <Row>
        {ads.length === 0 && <p>No Ads Found</p>}
        {ads.map((ad) => (
          <Col md={4} key={ad._id}>
            <Card className="mb-4">
              <Card.Img
                src={`${import.meta.env.VITE_BASE_URL}${ad.Images}`}
                alt="img.jpg"
                loading="lazy"
                height="200"
              />
              <Card.Body>
                <Card.Title>{ad.Name}</Card.Title>
                <Card.Text>{ad.Description}</Card.Text>
                <button
                  className="btn btn-success"
                  onClick={() => navigate(`/ad/${ad._id}`)}
                >
                  More Details
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CategoryPage;
