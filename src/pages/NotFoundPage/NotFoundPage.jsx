import s from "./NotFoundPage.module.css";
import { Link } from "react-router-dom";
import React from "react";

function NotFoundPage() {
  return (
    <div className={s.container}>
      <p className={s.text}>Page is not found</p>
      <Link to="/" className={s.link}>
        Go Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
