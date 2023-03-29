import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="not-found-wrapper">
    <h1 className="title-not-found">404 - Luxio - euh non Not Found !</h1>
    <img
      src="https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/sprites/404/regular.png"
      alt="pokemon luxio"
      className="img-not-found"
    />
    <Link to="/" className="button-not-found">
      Retourner sur le quizz
    </Link>
  </div>
);

export default NotFound;
