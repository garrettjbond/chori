import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faShapes } from "@fortawesome/free-solid-svg-icons/faShapes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type CardProps = {
  className?: string;
}

function Card({ className, ...props }: CardProps) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const toggleFavorite = () => setIsFavorite(prev => !prev);


  return (
    <div className={`group rounded-xl mb-5 size-65 flex flex-shrink-0 flex-col shadow-md cursor-pointer ${className}`} {...props}>
      <div className="headerContainer rounded-t-xl border-ash border-t border-x flex flex-row justify-between items-center bg-snow h-17 px-3">
        <div className="flex items-center">
          <p className="hidden lg:flex lg:mr-3 rounded-full size-10 bg-lavender text-nurple font-bold items-center justify-center">A</p>
          <h3 className="font-semibold">Board A</h3>
        </div>
        <div>
          {isFavorite ? <FontAwesomeIcon icon={faStar} onClick={toggleFavorite} className="text-xl text-nurple" /> : <FontAwesomeIcon icon={faStar} onClick={toggleFavorite} className="text-xl text-darkAsh opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          }
        </div>
      </div>
      <div className="bg-mist h-48 rounded-b-xl flex justify-center items-center transition duration-500 group-hover:bg-darkMist">
        <FontAwesomeIcon icon={faShapes} className="text-8xl text-darkAsh" />
      </div>
    </div>
  );
}

export default Card