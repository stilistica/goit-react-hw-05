import s from "./BackLink.module.css";
import { HiArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

function BackLink({ to, children }) {
  return (
    <div className={s.container}>
      <Link to={to} className={s.backLink}>
        <HiArrowLeft size="24" />
        {children}
      </Link>
    </div>
  );
}

export default BackLink;
