import React, { useEffect, useState } from "react";
import { Col, Row, Card, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../redux/slices/categorySlice"; 

function Categories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.all); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/AdvertisementCategory/with-count`);
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to fetch categories");
        return;
      }
      dispatch(setCategories(data)); 
    } catch (err) {
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, [dispatch]);

  if (loading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );

  return (
    <div className="container-fluid mt-4">
      <h2 className="text-center mb-4">Explore by Categories</h2>

      <Row className="g-4">
        {categories.map((cat) => (
          <Col md={3} key={cat._id}>
            <Card
              className="h-100 shadow-sm"
              onClick={() => navigate(`/category/${cat._id}`)}
              style={{ cursor: "pointer" }}
            >
              <Card.Img
                variant="top"
                src={`${import.meta.env.VITE_BASE_URL}${cat.Image}`}
                alt="img.jpg"
                loading="lazy"
                style={{ height: 150, objectFit: "cover" }}
              />
              <Card.Body className="text-center">
                <Card.Title>{cat.Name}</Card.Title>
                <p className="text-success mb-0">{cat.adsCount || 0} Cars</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Categories;
