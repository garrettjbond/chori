import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useKanbanStore } from "../../store/kanbanStore";
import Button from "../shared/Button";

type TagProps = {
    id: string;
    title: string;
    color: string; // hex or tailwind-compatible string
    activeTaskId: string;
};

const Tag = ({ id, title, color, activeTaskId }: TagProps) => {
    const { deleteTag } = useKanbanStore();

    return (
        <Button
            key={id}
            id={id}
            className={`tag flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-white transition duration-200 hover:brightness-90`}
            style={{ backgroundColor: color }}
        >
            <span className="truncate">{title}</span>
            <FontAwesomeIcon
                icon={faClose}
                className="cursor-pointer opacity-80 hover:opacity-100"
                onClick={() => deleteTag(id, activeTaskId)}
            />
        </Button>

    );
};

export default Tag;
