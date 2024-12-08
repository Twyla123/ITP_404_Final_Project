import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Albums() {
  document.title = "Twyla's Website - Albums";

  const albums = useLoaderData();

  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {albums.map((album, index) => (
          <div
            key={album.id}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <div className="text-center p-3">
              <h1 className="mb-3">{album.name}</h1>
              <Link to={`/albums/${album.id}`} className="btn btn-primary mt-5">
                View Album
              </Link>
            </div>
          </div>
        ))}
      </div>
      <a
        class="carousel-control-prev"
        href="#carouselExampleControls"
        role="button"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </a>
      <a
        class="carousel-control-next"
        href="#carouselExampleControls"
        role="button"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </a>
    </div>
  );
}
