import React from "react";
import { useNavigate } from "react-router-dom";

export default function Confirmation() {
  document.title = "Twyla's Website - Form Confirmation";

  return (
    <div className="container text-center">
      <h1>Thank You!</h1>
      <p>
        Your form has been submitted successfully. I will get back to you
        shortly.
      </p>
    </div>
  );
}
