import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

function NotFound() {
  return (
    <div>
      <figure>
        <div class="sad-mac"></div>
        <figcaption>
          <span class="sr-text">Error 404: Not Found</span>
          <span class="e"></span>
          <span class="r"></span>
          <span class="r"></span>
          <span class="o"></span>
          <span class="r"></span>
          <span class="_4"></span>
          <span class="_0"></span>
          <span class="_4"></span>
          <span class="n"></span>
          <span class="o"></span>
          <span class="t"></span>
          <span class="f"></span>
          <span class="o"></span>
          <span class="u"></span>
          <span class="n"></span>
          <span class="d"></span>
        </figcaption>
        <Link
          to="/"
          className=" logo d-flex justify-content-center align-items-center text-white text-decoration-none btn btn-dark"
        >
          Go To Dashboard
        </Link>
      </figure>
    </div>
  );
}

export default NotFound;
