import { faCircleUser } from "@fortawesome/free-solid-svg-icons/faCircleUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type CommentProps = {
  author?: string;
  content: string;
  date?: string;
  className?: string;
};

function Comment({ author = "userName", content, date, className }: CommentProps) {
  return (
    <div className={`rounded-md flex gap-3 ${className || ""}`}>
      <FontAwesomeIcon className='text-4xl text-lavender hover:text-lightNurple duration-300 cursor-pointer' icon={faCircleUser}/>
      <p>
        <span className="font-semibold text-black inline pr-1">{author}</span>
        {content}
        {date && <span className="text-xs text-gray-400">{date}</span>}
      </p>
    </div>
  );
}

export default Comment;
