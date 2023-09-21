
import TaskListItem from "../components/TaskListItem/TaskListItem";

export default function useRenderTasks() {

    const renderTasks = (specialTasksArray) => {
        return specialTasksArray.map((task, i) => {
            if (task.done === false) {
                return (
                    <TaskListItem
                        text={task.name} c
                        key={task.id}
                    />
                );
            } else {
                return null;
            }
        })
    }

    const checkTheStatusOfTask = (arr) => {
        return arr.some(task => task.done === false)
    };

    return {
        renderTasks, checkTheStatusOfTask
    }
}
