import React, { useEffect, useState } from "react";

import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

const Profile = () => {
  const [profile, setProfile] = useState({
    uname: "",
    email: "",
    vehicleId: "",
    phone: "",
    userType: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);
  const getProfileData = async function () {
    try {
      const res = await fetch("/getTOrder", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      const { uname, phone, vehicleId, email, userType, address } = data;
      setProfile({ uname, phone, vehicleId, email, userType, address });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <>
      <div id="profile">
        <div className="d-flex justify-content-around">
          {!loading && (
            <Card style={{ width: "18rem", color: "rgb(34, 132, 164)" }}>
              <Card.Body>
                <Card.Text>
                  <span>Email id:</span> {profile.email}
                </Card.Text>
                <Card.Text>
                  <span>Phone No:</span> {profile.phone}
                </Card.Text>
                <Card.Text>
                  <span>Name:</span> {profile.uname}
                </Card.Text>
                <Card.Text>
                  {profile.userType === "MANUFACTURER" && (
                    <p>
                      <span>address:</span> {profile.address}
                    </p>
                  )}
                  {profile.userType === "TRANSPORTER" && (
                    <p>
                      <span>vehicle-id:</span> {profile.vehicleId}
                    </p>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
          {loading && (
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={12} />
                  <Placeholder
                    xs={10}
                    className="hide"
                    style={{ marginTop: "1px" }}
                  />
                  <Placeholder
                    xs={8}
                    className="hide"
                    style={{ marginTop: "1px" }}
                  />
                  <Placeholder
                    xs={10}
                    className="hide"
                    style={{ marginTop: "1px" }}
                  />
                </Placeholder>
              </Card.Body>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
