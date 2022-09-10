import React from "react";
import "./SingleTurkey.scss";

export default function SingleTurkey(props) {
  return (
    <div className="featured-turkey">
      {props.featuredTurkey ? (
        <div className="featured-turkey__details">
          <img
            className="featured-turkey__image"
            src={props.featuredTurkey.urls.full}
            alt={props.featuredTurkey.alt_description}
          />
          <p className="featured-turkey__lyrics">
            {props.featuredTurkey.lyrics}
          </p>
        </div>
      ) : (
        <p>No turkey found.</p>
      )}
    </div>
  );
}
