import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faShapes } from "@fortawesome/free-solid-svg-icons/faShapes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useKanbanStore } from "../../store/kanbanStore";

type CardProps = {
  className?: string;
  isFavorite: boolean;
  title: string;
  boardId: string;
}

const Card = ({ className, isFavorite, title, boardId }: CardProps) => {
  const { setActiveBoardId, toggleFavoriteBoard } = useKanbanStore();

  return (
    <article onClick={() => setActiveBoardId(boardId)} className={`group rounded-xl mb-5 size-65 flex flex-shrink-0 flex-col shadow-md cursor-pointer ${className}`}>
      <header onClick={() => toggleFavoriteBoard(boardId)} className="headerContainer rounded-t-xl border-ash border-t border-x flex flex-row justify-between items-center bg-snow h-17 px-3">
        <div className="flex items-center">
          <p className="hidden lg:flex lg:mr-3 rounded-full size-10 bg-lavender text-nurple font-bold items-center justify-center">A</p>
          <h3 className="font-semibold"><Link to={`/board/${boardId}`} aria-label={`Open ${title} board`}>
            {title}
          </Link></h3>
        </div>
        <button onClick={() => toggleFavoriteBoard(boardId)}
          aria-label={isFavorite ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
          aria-pressed={isFavorite}>
          <FontAwesomeIcon icon={faStar} aria-hidden="true"
            className={`text-xl ${isFavorite ? "text-nurple" : "text-darkAsh group-hover:animate-bounce duration-200"}`}
          />
        </button>
      </header>
      <Link to={`/board/${boardId}`} aria-label={`Open ${title} board`} className="bg-mist h-48 rounded-b-xl flex justify-center items-center transition duration-500 group-hover:bg-darkMist">
        <FontAwesomeIcon icon={faShapes} className="text-8xl text-darkAsh" aria-hidden="true" />
      </Link>
    </article>
  );
}

export default Card