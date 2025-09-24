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
    <div onClick={() => setActiveBoardId(props.boardId)} className={`group rounded-xl mb-5 size-65 flex flex-shrink-0 flex-col shadow-md cursor-pointer ${className}`} {...props}>
      <div onClick={() => toggleFavoriteBoard(props.boardId)} className="headerContainer rounded-t-xl border-ash border-t border-x flex flex-row justify-between items-center bg-snow h-17 px-3">
        <div className="flex items-center">
          <p className="hidden lg:flex lg:mr-3 rounded-full size-10 bg-lavender text-nurple font-bold items-center justify-center">A</p>
          <h3 className="font-semibold">{props.title}</h3>
        </div>
        <div>
          {props.isFavorite ? <FontAwesomeIcon icon={faStar} className="text-xl text-nurple" /> : <FontAwesomeIcon icon={faStar} className="text-xl text-darkAsh group-hover:animate-bounce duration-200" />
          }
        </div>
      </div>
      <Link to="/board/1" className="bg-mist h-48 rounded-b-xl flex justify-center items-center transition duration-500 group-hover:bg-darkMist">
        <FontAwesomeIcon icon={faShapes} className="text-8xl text-darkAsh" />
      </Link>
    </div>
  );
}

export default Card