import { TaskDialog } from "@/components/Task/TaskDialog";
import { useTasks, type TaskData } from "@/features/tasks/useTasks";
import { Navigate, useNavigate, useParams } from "react-router";

export const TaskPage = () => {
  const { id, slug } = useParams();
  const { getTaskById, updateTaskById } = useTasks();
  const navigate = useNavigate();

  const task = getTaskById(id || "");
  if (!task) return <Navigate to={`/dashboard/${slug}`} replace />;

  const onUpdate = (data: Partial<TaskData>) => {
    return updateTaskById(task.id, data);
  };

  const onClose = () => {
    navigate(-1);
  };

  return (
    <TaskDialog open={true} onClose={onClose} task={task} onUpdate={onUpdate} />
  );
};
