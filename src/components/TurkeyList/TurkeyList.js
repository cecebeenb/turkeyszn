import React from "react";
import "./TurkeyList.scss";
import { Link } from "react-router-dom";

export default function TurkeyList(props) {
  const handleClick = (turkeyObj) => {
    props.handleUpdate(turkeyObj);
  };
  return (
    <div className="gallery">
      {props.turkeys.map((turkey) => {
        return (
          <Link key={turkey.id} to={`/turkeys/${turkey.id}`}>
            <img
              onClick={() => {
                handleClick(turkey);
              }}
              className="gallery__item"
              src={turkey.urls.full}
              alt={turkey.alt_description}
            />
          </Link>
        );
      })}
    </div>
  );
}
