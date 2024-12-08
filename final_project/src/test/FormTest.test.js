import React, { useState } from "react";
import { render, fireEvent } from "@testing-library/react";

test("displays an error when the name field is empty", () => {
  function Form() {
    const [name, setName] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
      e.preventDefault();
      const newErrors = [];
      if (!name.trim()) newErrors.push("Name cannot be empty.");
      setErrors(newErrors);
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            data-testid="input-name"
          />
          {errors.map((error, index) => (
            <span key={index} data-testid="error-name">
              {error}
            </span>
          ))}
        </div>
        <button type="submit" data-testid="submit-button">
          Submit
        </button>
      </form>
    );
  }

  const form = render(<Form />);

  fireEvent.click(form.getByTestId("submit-button"));

  const errorElements = form.getAllByTestId("error-name");
  expect(errorElements.length).toBe(1);
  expect(errorElements[0].textContent).toBe("Name cannot be empty.");
});

test("displays an error when the phone field is empty", () => {
  function Form() {
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
      e.preventDefault();
      const newErrors = [];
      if (!phone.trim()) newErrors.push("You must provide a phone.");
      setErrors(newErrors);
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            data-testid="input-phone"
          />
          {errors.map((error, index) => (
            <span key={index} data-testid="error-phone">
              {error}
            </span>
          ))}
        </div>
        <button type="submit" data-testid="submit-button">
          Submit
        </button>
      </form>
    );
  }

  const form = render(<Form />);

  fireEvent.click(form.getByTestId("submit-button"));

  const errorElements = form.getAllByTestId("error-phone");
  expect(errorElements.length).toBe(1);
  expect(errorElements[0].textContent).toBe("You must provide a phone.");
});

test("displays an error when no preferred contact method is selected", () => {
  function Form() {
    const [contactMethod, setContactMethod] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
      e.preventDefault();
      const newErrors = [];
      if (!contactMethod.trim())
        newErrors.push("Please select a preferred contact method.");
      setErrors(newErrors);
    };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Preferred Contact Method:</label>
          <div>
            <input
              type="radio"
              value="Email"
              name="contact-method"
              checked={contactMethod === "Email"}
              onChange={(e) => setContactMethod(e.target.value)}
              data-testid="contact-email"
            />
            <label>Email</label>
            <input
              type="radio"
              value="Phone"
              name="contact-method"
              checked={contactMethod === "Phone"}
              onChange={(e) => setContactMethod(e.target.value)}
              data-testid="contact-phone"
            />
            <label>Phone</label>
          </div>
          {errors.map((error, index) => (
            <span key={index} data-testid="error-contact">
              {error}
            </span>
          ))}
        </div>
        <button type="submit" data-testid="submit-button">
          Submit
        </button>
      </form>
    );
  }

  const form = render(<Form />);

  fireEvent.click(form.getByTestId("submit-button"));

  const errorElements = form.getAllByTestId("error-contact");
  expect(errorElements.length).toBe(1);
  expect(errorElements[0].textContent).toBe(
    "Please select a preferred contact method."
  );
});

test("clears input fields and errors after reset", () => {
  function Form() {
    const [name, setName] = useState("");
    const [errors, setErrors] = useState(["Name cannot be empty."]);

    const handleReset = () => {
      setName(""); // Clear input field
      setErrors([]); // Clear errors
    };

    return (
      <form>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={name}
            onInput={(e) => setName(e.target.value)} // Trigger onInput for compatibility
            data-testid="input-name"
          />
        </div>
        {errors.map((error, index) => (
          <span key={index} data-testid="error-message">
            {error}
          </span>
        ))}
        <button type="button" onClick={handleReset} data-testid="reset-button">
          Reset
        </button>
      </form>
    );
  }

  const form = render(<Form />);

  expect(form.getByTestId("input-name").value).toBe("");

  expect(form.getAllByTestId("error-message").length).toBe(1);

  fireEvent.click(form.getByTestId("reset-button"));

  expect(form.getByTestId("input-name").value).toBe("");

  expect(() => form.getAllByTestId("error-message")).toThrow();
});
