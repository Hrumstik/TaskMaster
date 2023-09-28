export function sortTasksAlphabetically(arr) {
  return [...arr].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );
}

export function showImportantTasks(arr) {
  const importantsTasks = arr.filter(({ important }) => {
    return important;
  });
  return importantsTasks;
}

export const sortAlphabeticallyTasksWithImportance = (tasksWithImportance) => {
  return [...tasksWithImportance].sort((a, b) => {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });
};
