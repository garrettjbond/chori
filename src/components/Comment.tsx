import { faCircleUser } from "@fortawesome/free-solid-svg-icons/faCircleUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";
import { useKanbanStore } from "../global/kanbanStore";

type CommentProps = {
  commentId: string;
  author?: string;
  content: string;
  date?: string;
  className?: string;
};

const Comment = ({commentId, author = "userName", content, date, className }: CommentProps) => {
  const {deleteComment, activeTaskId} = useKanbanStore();

  return (
    <div className=" bg-gray-50 p-2">
      <div className={`rounded-md flex justify-center items-center gap-3 ${className || ""}`}>
        <FontAwesomeIcon className='text-4xl text-lavender hover:text-lightNurple duration-300 cursor-pointer' icon={faCircleUser} />
        <p>
          <span className="font-semibold text-black inline pr-1">{author}</span>
          {content}
          {date && <span className="text-xs text-gray-400 pl-2">{date}</span>}
        </p>
      </div>
      <div>
        <Button
          onClick={() => {
            if (activeTaskId) {
              deleteComment(commentId, activeTaskId);
            }
          }}
          className="underline"
          size="custom"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default Comment;
