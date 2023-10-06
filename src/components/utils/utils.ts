interface Task {
  id: string;
  name: string;
  date: null | string;
  done: boolean;
  important: boolean;
}

export function sortTasksAlphabetically(arr: Task[]) {
  return [...arr].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );
}

export function showImportantTasks(arr: Task[]) {
  return arr.filter(({ important }) => {
    return important;
  });
}

export const sortAlphabeticallyTasksWithImportance = (
  tasksWithImportance: Task[]
) => {
  return [...tasksWithImportance].sort((a, b) => {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });
};

export const sortUnfinishedTasks = (arr: Task[]) => {
  return arr.filter(({ done }) => !done);
};
