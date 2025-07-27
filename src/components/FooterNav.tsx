import { faHouse, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type FooterNavProps = {
    children: React.ReactNode;
    className?: string;
}

function FooterNav({ children, className, ...props }: FooterNavProps) {
  return (
    <div className={`lg:hidden fixed bottom-5 left-1/2 transform -translate-x-1/2 p-3 rounded-full border border-gray-300 bg-taskHeader flex flex-row items-center gap-4 ${className}`} {...props}>
        <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>
        <p>|</p>
        <FontAwesomeIcon icon={faShuffle}></FontAwesomeIcon>
    </div>
  );
}

export default FooterNav