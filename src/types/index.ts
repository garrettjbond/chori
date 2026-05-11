export type TagType = {
  id: string;
  title: string;
  color: string;
  createdBy?: string;
};

export type CommentType = {
  id: string;
  createdBy: string;
  createdDate: string;
  description: string;
};

export type TaskType = {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  tags?: TagType[];
  comments?: CommentType[];
};

export type ColumnType = {
  id: string;
  title: string;
  tasks: TaskType[];
};

export type BoardType = {
  id: string;
  title: string;
  favorite: boolean;
  columns: ColumnType[];
};