import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import PhotoCard from "../components/PhotoCard";
import "./css/photos.css";

export default function Photos() {
  document.title = "Twyla's Website - Photos";

  const photos = useLoaderData();

  return (
    <div>
      <h1 className="mt-3">My Photos</h1>
      <div className="photo-gallery">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            id={photo.id}
            url={photo.url}
            title={photo.title}
          />
        ))}
      </div>
    </div>
  );
}
