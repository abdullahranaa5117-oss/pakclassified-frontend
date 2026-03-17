import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

function Searching() {
  const { register, handleSubmit } = useForm();
  const [categories, setCategories] = useState([]);
  const [cityAreas, setCityAreas] = useState([]);
  const [ads, setAds] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/AdvertisementCategory`);
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      setCategories(data);
    } catch (err) {
      toast.error("Categories fetching failed");
    }
  };

  const fetchCityArea = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/CityArea`);
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      setCityAreas(data);
    } catch (err) {
      toast.error("Categories fetching failed");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchCityArea();
  }, []);

  const onSubmit = async (data) => {
    try {
      const query = new URLSearchParams({
        Keyword: data.Keyword ?? "",
        category: data.category ?? "",
        cityarea: data.cityarea ?? ""
      }).toString();

      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/Advertisement?${query}`);
      const result = await res.json();
      if (!res.ok || result.length === 0) {
        setAds([]);
        return toast.error("No advertisements found");
      }

      setAds(result);
    } catch {
      toast.error("No internet connection");
    }
  };
  return (
    <div className='bg-success p-2'>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className='m-2'>
          <Col md={3} className='mt-2'>
            <Form.Control type="text" placeholder="Keyword" {...register("Keyword")} />
          </Col>
          <Col md={3} className='mt-2'>
            <Form.Select {...register("category")}>
              <option value="">Category</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.Name}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={3} className='mt-2'>
            <Form.Select {...register("cityarea")}>
              <option value="">City Area</option>
              {cityAreas.map(ca => (
                <option key={ca._id} value={ca._id}>{ca.Name}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={3} className='mt-2'>
            <Button type="submit" variant="dark" className="w-100">Search</Button>
          </Col>
        </Row>
      </Form>

      {ads.length > 0 && (
        <Row className="g-3 mt-3">
          {ads.map(ad => (
            <Col md={4} key={ad._id}>
              <Card>
                {ad.Images && (
                  <Card.Img
                    variant="top"
                    src={`${import.meta.env.VITE_BASE_URL}${ad.Images}`}
                    loading="lazy"

                    style={{ height: 200, objectFit: "cover" }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{ad.Name}</Card.Title>
                  <Card.Text>{ad.Description}</Card.Text>
                  <Card.Text>
                    <small className="text-muted">{ad.Category?.Name}</small>
                  </Card.Text>
                  <Button href={`/ad/${ad._id}`} variant="success">More Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Searching;
