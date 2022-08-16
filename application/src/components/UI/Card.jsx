import classes from "./Card.module.css";

// app wrapper
const Card = ({ children }) => {
  return <div className={classes.card}>{children}</div>;
};

export default Card;
