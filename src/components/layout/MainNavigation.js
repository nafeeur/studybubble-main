import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
  

      {/* Home, About, Contact links */}
     

    {/* Middle text and background pic */}
      <section className={classes.home_main}>
        <div className={classes.container2}>
          <h1>Studying Outside?</h1>
          <h2>StudyBubble will burst with some awesome locations</h2>
          <p>Providing the best place to study in peace</p>
        </div>
      </section>

      {/* Login, Signup buttons */}
  
    </header>
  );
}

export default MainNavigation;
