import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faShapes } from "@fortawesome/free-solid-svg-icons/faShapes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useKanbanStore } from "../global/kanbanStore";

type CardProps = {
  className?: string;
  isFavorite: boolean;
  title: string;
  boardId: string;
}

const Card = ({ className, ...props }: CardProps) => {
  const { setActiveBoardId, toggleFavoriteBoard } = useKanbanStore();

  return (
    <article onClick={() => setActiveBoardId(props.boardId)} className={`group rounded-xl mb-5 size-65 flex flex-shrink-0 flex-col shadow-md cursor-pointer ${className}`} {...props}>
      <header onClick={() => toggleFavoriteBoard(props.boardId)} className="headerContainer rounded-t-xl border-ash border-t border-x flex flex-row justify-between items-center bg-snow h-17 px-3">
        <div className="flex items-center">
          <p className="hidden lg:flex lg:mr-3 rounded-full size-10 bg-lavender text-nurple font-bold items-center justify-center">A</p>
          <h3 className="font-semibold"><Link to={`/board/${props.boardId}`} aria-label={`Open ${props.title} board`}>
            {props.title}
          </Link></h3>
        </div>
        <button onClick={() => toggleFavoriteBoard(props.boardId)}
          aria-label={props.isFavorite ? `Remove ${props.title} from favorites` : `Add ${props.title} to favorites`}
          aria-pressed={props.isFavorite}>
          <FontAwesomeIcon icon={faStar} aria-hidden="true"
            className={`text-xl ${props.isFavorite ? "text-nurple" : "text-darkAsh group-hover:animate-bounce duration-200"}`}
          />
        </button>
      </header>
      <Link to="/board/1" aria-label={`Open ${props.title} board`} className="bg-mist h-48 rounded-b-xl flex justify-center items-center transition duration-500 group-hover:bg-darkMist">
        <FontAwesomeIcon icon={faShapes} className="text-8xl text-darkAsh" aria-hidden="true" />
      </Link>
    </article>
  );
}

export default Card