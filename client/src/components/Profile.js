import React from "react";

import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";

const Profile = () => {
  const profile = useSelector((state) => state.user.user);

  return (
    <>
      <div id="profile">
        <div className="d-flex justify-content-around">
          <Card style={{ width: "18rem", color: "rgb(34, 132, 164)" }}>
            <Card.Body>
              <Card.Text>
                <span>user name:</span> {profile.uname}
              </Card.Text>
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
        </div>
      </div>
    </>
  );
};

export default Profile;
