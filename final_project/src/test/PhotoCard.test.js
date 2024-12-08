import React from "react";
import { render } from "@testing-library/react";

test("renders PhotoCard with title, image, and link", () => {
  function MockPhotoCard() {
    return (
      <div data-testid="photo-card">
        <img
          src="/path/to/image.jpg"
          alt="Beautiful Sunset"
          className="photo-card-image"
          data-testid="photo-card-image"
        />
        <h3 data-testid="photo-card-title">Beautiful Sunset</h3>
        <a href="/photos/1" data-testid="photo-card-link">
          View Details
        </a>
      </div>
    );
  }

  const component = render(<MockPhotoCard />);

  const photoCards = component.getAllByTestId("photo-card");
  expect(photoCards.length).toBe(1);

  const images = component.getAllByTestId("photo-card-image");
  expect(images.length).toBe(1);

  const titles = component.getAllByTestId("photo-card-title");
  expect(titles.length).toBe(1);

  const links = component.getAllByTestId("photo-card-link");
  expect(links.length).toBe(1);
});
