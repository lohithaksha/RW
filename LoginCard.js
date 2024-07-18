import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { uniqueData } from "./SampleData";
import { sampleData } from "./SampleData";
import Weather from "./weather/Weather";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUserAndPasswordValid) {
      navigate("/weather");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  const UserAndPassword = () => {
    return user.length > 0 && password.length > 0;
  };

  const isUniqueUserValid = uniqueData.includes(user);
  const isUserAndPasswordValid =
    sampleData[user] && sampleData[user] === password;

  return (
    <div className="LoginCard">
      <h2>Login Page</h2>

      <input
        value={user}
        onChange={(e) => setUser(e.target.value)}
        type="text"
        className={`primaryInput fcous ${
          isUniqueUserValid ? "valid-user" : ""
        } ${isUserAndPasswordValid ? "valid-password" : ""}`}
        placeholder="Username"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className={`primaryInput fcous ${
          isUserAndPasswordValid ? "valid-password" : ""
        }`}
        placeholder="Password"
      />
      <button
        onClick={handleSubmit}
        style={{ cursor: UserAndPassword() ? "pointer" : "not-allowed" }}
        disabled={!UserAndPassword()}
        className="primary-button blue"
      >
        Submit
      </button>
    </div>
  );
}
