import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Image, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import EditSignup from "../Modals/editsignup";
import EditPostAdForm from "../Modals/editpost";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);

  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showEditUser, setShowEditUser] = useState(false);
  const [editAd, setEditAd] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchMyAds = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/Advertisement/my/ads`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to fetch ads");
        setLoading(false);
        return;
      }
      setAds(data);
      setLoading(false);
    } catch {
      toast.error("Failed to fetch ads");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user)
      fetchMyAds();
  }, [user]);

  const handleDeleteAd = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ad?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/Advertisement/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Delete failed");
        return;
      }
      toast.success("Advertisement deleted");
      setAds(ads.filter((ad) => ad._id !== id));
    } catch {
      toast.error("Failed to delete advertisement");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col lg={3}>
          <Card className="text-center border">
            <Card.Body>
              <Image
                src={user?.Image ? `${import.meta.env.VITE_BASE_URL}${user.Image}` : "/default-user.png"}
                roundedCircle
                width={100}
                height={100}
                loading="lazy"

                className="mb-3"
              />
              <Card.Title className="text-success">{user?.Name}</Card.Title>
              <Card.Text>
                <b>Email:</b> {user?.Email} <br />
                <b>Contact:</b> {user?.ContactNumber} <br />
                <b>Birth Date:</b> {user?.BirthDate}
              </Card.Text>
              <Button variant="primary" onClick={() => setShowEditUser(true)}>
                Edit Profile
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <h2 className="text-success m-2">Posted Advertisement</h2>
          <Row className="g-4">
            {ads.length === 0 && <p>No Ads Found</p>}
            {ads.map((ad) => (
              <Col md={6} key={ad._id}>
                <Card className="d-flex border">
                  {ad.Images && (
                    <Card.Img
                      variant="top"
                      src={`${import.meta.env.VITE_BASE_URL}${ad.Images}`}
                      style={{ height: "200px", objectFit: "cover" }}
                      loading="lazy"

                    />
                  )}
                  <Card.Body>
                    <Card.Title>{ad.Name}</Card.Title>
                    <Card.Text>{ad.Description}</Card.Text>
                    <Card.Text>
                      <b>Price:</b> {ad.Price}
                    </Card.Text>
                    <Card.Text>
                      <b>Category:</b> {ad.Category?.Name || "N/A"}
                    </Card.Text>
                    <div className="d-flex gap-2 mt-2">
                      <Button variant="primary" onClick={() => navigate(`/ad/${ad._id}`)}>
                        View
                      </Button>
                      <Button variant="warning" onClick={() => setEditAd(ad)}>
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => handleDeleteAd(ad._id)}>
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      {showEditUser && (
        <EditSignup
          show={showEditUser}
          handleClose={() => setShowEditUser(false)}
          user={user}
          onUserUpdated={(updatedUser) => {
            dispatch(setUser({ user: updatedUser, token: localStorage.getItem("token") }));
          }}
        />
      )}
      {editAd && (
        <EditPostAdForm
          show={true}
          ad={editAd}
          handleClose={() => {
            setEditAd(null);
            fetchMyAds();
          }}
        />
      )}
    </Container>
  );
};

export default Dashboard;
