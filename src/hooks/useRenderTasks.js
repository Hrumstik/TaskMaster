import TaskListItem from "../components/TaskListItem/TaskListItem";

export default function useRenderTasks() {
  const renderTasks = (specialTasksArray) => {
    return specialTasksArray.map((task, i) => {
      if (!task.done) {
        return <TaskListItem text={task.name} c key={task.id} />;
      } else {
        return null;
      }
    });
  };

  const checkTheStatusOfTask = (arr) => {
    return arr.some(({ done }) => !done);
  };

  return {
    renderTasks,
    checkTheStatusOfTask,
  };
}
