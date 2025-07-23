import { faShapes } from "@fortawesome/free-solid-svg-icons/faShapes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type CardProps = {
    children: React.ReactNode;
    className?: string;
}

function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={`group rounded-xl size-65 flex flex-shrink-0 flex-col shadow-md cursor-pointer ${className}`} {...props}>
        <div className="headerContainer rounded-t-xl border-ash border-t border-x flex flex-row justify-start items-center bg-snow h-17 pl-3">
            <p className="hidden lg:flex lg:mr-3 rounded-full size-10 bg-lavender text-nurple font-bold items-center justify-center">A</p>
            <h3 className="font-semibold">Board A</h3>
        </div>
        <div className="bg-mist h-48 rounded-b-xl flex justify-center items-center transition duration-500 group-hover:bg-darkMist">
         <FontAwesomeIcon icon={faShapes} className="text-8xl text-darkAsh" />
        </div>
    </div>
  );
}

export default Card