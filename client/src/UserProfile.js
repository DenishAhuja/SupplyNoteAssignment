import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import "./Register.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const callProfilePage = async () => {
    try {
      const res = await fetch("http://localhost:3000/userProfile", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        // credentials: "include"
      });
      // const res = await fetch('http://localhost:3000/userProfile');
      const data = await res.json();
      console.log(data);
      setUserData(data);
      if (!res.status === 200) throw new Error(res.error);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };
  useEffect(() => {
    callProfilePage();
  }, []);
  return (
    <div className="text-center">
      <h1 className=" mt-4">Profile</h1>

      <div className="signup-form hi">
        <form method="GET">
          <div class="text-center">
            <h2>Hello {userData.name} !!</h2>
            <p>{userData.email}</p>
          </div>
        </form>
        <div className="text-center">
          <button
            type="submit"
            class="btn btn-success m-4"
            onClick={() => navigate("/urls")}
          >
            Generate short Links
          </button>

          <button
            class="btn btn-success m-4"
            onClick={() => navigate("/logout")}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
