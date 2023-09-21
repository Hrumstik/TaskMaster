export function sortTasksAlphabetically(arr) {
    const newArr = [...arr];
    return newArr.sort((a, b) => {
        const taskA = a.name.toLowerCase();
        const taskB = b.name.toLowerCase();

        if (taskA < taskB) {
            return - 1
        }

        if (taskA > taskB) {
            return 1
        }

        if (taskA === taskB) {
            return 0
        }
    })
}

export function showImportantTasks(arr) {
    const importantsTasks = arr.filter((task) => {
        return (task.important === true)
    });
    return importantsTasks;
}

export const sortAlphabeticallyTasksWithImportance = (tasksWithImportance) => {
    const arr = tasksWithImportance.sort((a, b) => {
        const taskA = a.name.toLowerCase();
        const taskB = b.name.toLowerCase();

        if (taskA > taskB) {
            return 1
        }

        if (taskA < taskB) {
            return -1
        }

        if (taskA === taskB) {
            return 0
        }
    })

    return arr

}