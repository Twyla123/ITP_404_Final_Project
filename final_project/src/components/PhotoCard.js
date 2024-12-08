import React from "react";
import { Link } from "react-router-dom";

export default function PhotoCard(props) {
  return (
    <div className="photo-card">
      <Link to={`/photos/${props.id}`} className="text-decoration-none">
        <img src={props.url} alt={props.title} className="photo-card-image" />
        <div className="photo-card-details">
          <h3 className="mt-3">{props.title}</h3>
        </div>
      </Link>
      <div className="text-center">
        <Link to={`/photos/${props.id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
}
