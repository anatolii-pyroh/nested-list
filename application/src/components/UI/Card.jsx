import classes from "./Card.module.css";

// app wrapper
const Card = ({ children, style }) => {
  return <div className={classes.card} style={style}>{children}</div>;
};

export default Card;
