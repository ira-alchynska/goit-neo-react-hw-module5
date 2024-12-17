import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.page}>
      <h1 className={css.header}>404</h1>
      <Link to="/">Go home</Link>
    </div>
  );
};

export default NotFoundPage;
