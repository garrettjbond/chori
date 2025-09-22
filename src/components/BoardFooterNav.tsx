import { faHouse, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

type BoardFooterNavProps = {
  className?: string;
  onOpen: () => void;
};

const BoardFooterNav = ({ onOpen, className, ...props }: BoardFooterNavProps) => {
  return (
    <div className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 p-3 rounded-2xl border border-gray-300 bg-taskHeader flex flex-row items-center gap-4 ${className}`} {...props}>
      <Link to="/" className="lg:hidden cursor-pointer hover:text-nurple duration-300">
        <FontAwesomeIcon icon={faHouse} />
      </Link>
      <p className="lg:hidden">|</p>
      <button
        onClick={onOpen}
        className="flex gap-2 items-center cursor-pointer hover:text-nurple duration-300"
        type="button"
      >
        <FontAwesomeIcon icon={faShuffle} />
        <span className="hidden lg:inline">Board Switch</span>
      </button>
    </div>
  );
};

export default BoardFooterNav;