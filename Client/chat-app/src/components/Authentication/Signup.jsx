import React, { useState } from "react";

const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [pic, setPic] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", { name, email, password, confirmpassword, pic });
  };

  const submitHandler=()=>{};

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        maxWidth: "400px",
        margin: "auto",
      }}
    >
      <div>
        <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
        />
      </div>

      <div>
        <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
        />
      </div>

      <div>
        <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>Password</label>
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "12px",
              color: "#007BFF",
            }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="confirmpassword" style={{ display: "block", marginBottom: "5px" }}>Confirm Password</label>
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            id="confirmpassword"
            placeholder="Confirm your password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "12px",
              color: "#007BFF",
            }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="profilepicture" style={{ display: "block", marginBottom: "5px" }}>Profile Picture</label>
        <input
          type="file"
          id="profilepicture"
          accept="image/*"
          onChange={(e) => setPic(e.target.files[0])}
          style={{ padding: "8px", boxSizing: "border-box" }}
        />
      </div>

      <button
        type="submit" 
        onClick={submitHandler}
        style={{
          padding: "10px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
          fontSize: "16px",
        }}
      >
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
