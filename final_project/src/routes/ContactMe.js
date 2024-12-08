import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Form() {
  document.title = "Twyla's Website - Contac Me with this form";

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [accept, setAccept] = useState(false);
  const [comment, setComment] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [role, setRole] = useState("Student");

  // Error States
  const [nameError, setNameError] = useState("");
  const [provideError, setProvideError] = useState("");
  const [commentError, setCommentError] = useState("");
  const [agreeError, setAgreeError] = useState("");
  const [contactError, setContactError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let foundError = false;

    if (!name.trim()) {
      setNameError("Name cannot be empty.");
      foundError = true;
    } else if (!name.includes(" ")) {
      setNameError("Please provide a full name (first and last).");
      foundError = true;
    } else {
      setNameError("");
    }

    if (!phone.trim()) {
      setProvideError("You must provide either an phone.");
      foundError = true;
    } else {
      setProvideError("");
    }

    if (!contactMethod.trim()) {
      setContactError("Please select a preferred contact method.");
      foundError = true;
    } else {
      setContactError("");
    }

    if (comment.length > 100) {
      setCommentError("Comments cannot exceed 100 characters.");
      foundError = true;
    } else {
      setCommentError("");
    }

    if (!accept) {
      setAgreeError("You must accept the terms and conditions.");
      foundError = true;
    } else {
      setAgreeError("");
    }

    if (!foundError) {
      navigate("/confirmation");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Contact Me</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">
            Full Name: <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="full-name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Enter your name"
          />
          {nameError && <small className="text-danger">{nameError}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="your@email.com"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Phone: <span className="text-danger">*</span>
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            placeholder="(123) 456-7890"
          />
          {provideError && (
            <small className="text-danger">{provideError}</small>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Are you a:</label>
          <select
            className="form-select"
            id="role"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <option value="Student">Student</option>
            <option value="Professional">Professional</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Preferred Contact Method: <span className="text-danger">*</span>
          </label>
          <div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="contact-email"
                name="contact-method"
                value="Email"
                checked={contactMethod === "Email"}
                onChange={(e) => {
                  setContactMethod(e.target.value);
                }}
              />
              <label className="form-check-label">Email</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id="contact-phone"
                name="contact-method"
                value="Phone"
                checked={contactMethod === "Phone"}
                onChange={(e) => {
                  setContactMethod(e.target.value);
                }}
              />
              <label className="form-check-label">Phone</label>
            </div>
            {contactError && (
              <small className="text-danger">{contactError}</small>
            )}
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Comments:</label>
          <textarea
            className="form-control"
            id="comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            placeholder="Add your comments (max 100 characters)"
          ></textarea>

          <small className="form-text">{comment.length}/100</small>
          {commentError && (
            <small className="text-danger">{commentError}</small>
          )}
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="terms"
            checked={accept}
            onChange={() => {
              setAccept(!accept);
            }}
          />
          <label className="form-check-label d-block">
            I agree to the terms and conditions{" "}
            <span className="text-danger">*</span>
          </label>
          {agreeError && <small className="text-danger">{agreeError}</small>}
        </div>

        <button type="submit" className="btn btn-primary me-2">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            setName("");
            setEmail("");
            setPhone("");
            setRole("Student");
            setComment("");
            setContactMethod("");
            setAccept(false);
            setNameError("");
            setProvideError("");
            setCommentError("");
            setAgreeError("");
            setContactError("");
          }}
        >
          Reset
        </button>
      </form>
    </div>
  );
}
