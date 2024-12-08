import React from "react";
import { useLoaderData } from "react-router-dom";
import PhotoCard from "../components/PhotoCard";

export default function AlbumDetail() {
  document.title = "Twyla's Website - Albums Details";

  const { album, photos } = useLoaderData();

  return (
    <div>
      <h1>{album.name}</h1>
      <h2>Photos</h2>
      <div className="photo-gallery">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.id}
            id={photo.id}
            title={photo.title}
            url={photo.url}
          />
        ))}
      </div>
    </div>
  );
}
