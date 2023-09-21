import { useCallback, useEffect, useState } from 'react';
import { sortTasksAlphabetically, showImportantTasks, sortAlphabeticallyTasksWithImportance } from "../components/utils/utils";
import dayjs from 'dayjs';

export default function useGroupTasks(arrTasks) {
    const [sortedAlphabeticallyAllTasks, setSortedAlphabeticallyAllTasks] = useState([]);
    const [importantAllTasks, setImportantAllTasks] = useState([]);
    const [sortedAlphabeticallyAllTasksWithImportance, setSortedAlphabeticallyAllTasksWithImportance] = useState([]);

    const [todayTasks, setTodayTasks] = useState([]);
    const [sortedAlphabeticallyTodayTasks, setSortedAlphabeticallyTodayTasks] = useState([]);
    const [importantTodayTasks, setImportantTodayTasks] = useState([]);
    const [sortedAlphabeticallyTodayTasksWithImportance, setSortedAlphabeticallyTodayTasksWithImportance] = useState([]);

    const [tomorrowTasks, setTomorrowTasks] = useState([]);
    const [sortedAlphabeticallyTomorrowTasks, setSortedAlphabeticallyTomorrowTasks] = useState([]);
    const [importantTomorrowTasks, setImportantTomorrowTasks] = useState([]);
    const [sortedAlphabeticallyTomorrowTasksWithImportance, setSortedAlphabeticallyTomorrowTasksWithImportance] = useState([]);

    const [dayAfterTommorowTasks, setDayAfterTommorowTasks] = useState([]);
    const [sortedAlphabeticallyDayAfterTommorowTasks, setSortedAlphabeticallyDayAfterTommorowTasks] = useState([]);
    const [importantDayAfterTommorowTasks, setImportantDayAfterTommorowTasks] = useState([]);
    const [sortedAlphabeticallyDayAfterTommorowTasksWithImportance, setSortedAlphabeticallyDayAfterTommorowTasksWithImportance] = useState([]);

    const [nextWeekTasks, setNextWeekTasks] = useState([]);
    const [sortedAlphabeticallyNextWeekTasks, setSortedAlphabeticallyNextWeekTasks] = useState([]);
    const [importantNextWeekTasks, setImportantNextWeekTasks] = useState([]);
    const [sortedAlphabeticallyNextWeekTasksWithImportance, setSortedAlphabeticallyNextWeekTasksWithImportance] = useState([]);

    const [otherTaks, setOtherTaks] = useState([]);
    const [sortedAlphabeticallyOtherTaks, setSortedAlphabeticallyOtherTaks] = useState([]);
    const [importantOtherTaks, setImportantOtherTaks] = useState([]);
    const [sortedAlphabeticallyOtherTaksWithImportance, setSortedAlphabeticallyOtherTaksWithImportance] = useState([]);

    const [tasksWithoutDate, setTasksWithoutDate] = useState([]);
    const [sortedAlphabeticallyTasksWithoutDate, setSortedAlphabeticallyTasksWithoutDate] = useState([]);
    const [importantTasksWithoutDate, setImportantTasksWithoutDate] = useState([]);
    const [sortedAlphabeticallyTasksWithoutDateWithImportance, setSortedAlphabeticallyTasksWithoutDateWithImportance] = useState([]);

    const sortTasksByDate = useCallback(() => {
        const today = dayjs();
        const tomorrow = today.add(1, 'day');
        const dayAfterTommorow = today.add(2, 'day');
        const nextWeek = today.add(7, 'day');

        const todayTasks = arrTasks.filter((task) => {
            const taskDate = dayjs(task.date, 'DD.MM.YYYY');
            return taskDate.isSame(today, 'day')
        })

        const tomorrowTasks = arrTasks.filter((task) => {
            const taskDate = dayjs(task.date, 'DD.MM.YYYY');
            return taskDate.isSame(tomorrow, 'day')
        })

        const dayAfterTommorowTasks = arrTasks.filter((task) => {
            const taskDate = dayjs(task.date, 'DD.MM.YYYY');
            return taskDate.isSame(dayAfterTommorow, 'day')
        })

        const nextWeekTasks = arrTasks.filter((task) => {
            const taskDate = dayjs(task.date, 'DD.MM.YYYY');
            return taskDate.isBefore(nextWeek, 'day') && taskDate.isAfter(dayAfterTommorow, 'day');
        })

        const tasksWithoutDate = arrTasks.filter((task) => {
            return task.date === null
        })

        const otherTaks = arrTasks.filter((task) => {
            return ![todayTasks, tomorrowTasks, dayAfterTommorowTasks, nextWeekTasks, tasksWithoutDate].some(
                (arr) => { return arr.includes(task) }
            )
        })

        return {
            todayTasks,
            tomorrowTasks,
            dayAfterTommorowTasks,
            nextWeekTasks,
            tasksWithoutDate,
            otherTaks,
        }
    }, [arrTasks]);

    useEffect(() => {
        const sortedTasks = sortTasksByDate();
        setTodayTasks(sortedTasks.todayTasks);
        setTomorrowTasks(sortedTasks.tomorrowTasks);
        setDayAfterTommorowTasks(sortedTasks.dayAfterTommorowTasks);
        setNextWeekTasks(sortedTasks.nextWeekTasks);
        setOtherTaks(sortedTasks.otherTaks);
        setTasksWithoutDate(sortedTasks.tasksWithoutDate);

        setSortedAlphabeticallyAllTasks(sortTasksAlphabetically(arrTasks));
        setImportantAllTasks(showImportantTasks(arrTasks));


        setSortedAlphabeticallyTodayTasks(sortTasksAlphabetically(todayTasks));
        setImportantTodayTasks(showImportantTasks(todayTasks));


        setSortedAlphabeticallyTomorrowTasks(sortTasksAlphabetically(tomorrowTasks));
        setImportantTomorrowTasks((showImportantTasks(tomorrowTasks)));


        setSortedAlphabeticallyDayAfterTommorowTasks(sortTasksAlphabetically(dayAfterTommorowTasks));
        setImportantDayAfterTommorowTasks(showImportantTasks(dayAfterTommorowTasks))


        setSortedAlphabeticallyNextWeekTasks(sortTasksAlphabetically(nextWeekTasks));
        setImportantNextWeekTasks(showImportantTasks(nextWeekTasks));

        setSortedAlphabeticallyOtherTaks(sortTasksAlphabetically(otherTaks));
        setImportantOtherTaks(showImportantTasks(otherTaks));

        setSortedAlphabeticallyTasksWithoutDate(sortTasksAlphabetically(tasksWithoutDate));
        setImportantTasksWithoutDate(showImportantTasks(tasksWithoutDate));

    }, [arrTasks, sortTasksByDate]);


    useEffect(() => {
        setSortedAlphabeticallyAllTasksWithImportance(sortAlphabeticallyTasksWithImportance(importantAllTasks));
        setSortedAlphabeticallyTodayTasksWithImportance(sortAlphabeticallyTasksWithImportance(importantTodayTasks));
        setSortedAlphabeticallyTomorrowTasksWithImportance(sortAlphabeticallyTasksWithImportance(importantTomorrowTasks));
        setSortedAlphabeticallyDayAfterTommorowTasksWithImportance(sortAlphabeticallyTasksWithImportance(importantDayAfterTommorowTasks));
        setSortedAlphabeticallyNextWeekTasksWithImportance(sortAlphabeticallyTasksWithImportance(importantNextWeekTasks));
        setSortedAlphabeticallyOtherTaksWithImportance(sortAlphabeticallyTasksWithImportance(importantOtherTaks));
        setSortedAlphabeticallyTasksWithoutDateWithImportance(sortAlphabeticallyTasksWithImportance(importantTasksWithoutDate))
    }, [arrTasks, importantAllTasks, importantTodayTasks, importantTomorrowTasks, importantDayAfterTommorowTasks, importantNextWeekTasks, importantOtherTaks, importantTasksWithoutDate]);

    return {
        todayTasks,
        tomorrowTasks,
        dayAfterTommorowTasks,
        nextWeekTasks,
        tasksWithoutDate,
        otherTaks,
        sortedAlphabeticallyAllTasks,
        importantAllTasks,
        sortedAlphabeticallyAllTasksWithImportance,
        sortedAlphabeticallyTodayTasks,
        importantTodayTasks,
        sortedAlphabeticallyTodayTasksWithImportance,
        sortedAlphabeticallyTomorrowTasks,
        importantTomorrowTasks,
        sortedAlphabeticallyTomorrowTasksWithImportance,
        sortedAlphabeticallyDayAfterTommorowTasks,
        importantDayAfterTommorowTasks,
        sortedAlphabeticallyDayAfterTommorowTasksWithImportance,
        sortedAlphabeticallyNextWeekTasks,
        importantNextWeekTasks,
        sortedAlphabeticallyNextWeekTasksWithImportance,
        sortedAlphabeticallyOtherTaks,
        importantOtherTaks,
        sortedAlphabeticallyOtherTaksWithImportance,
        sortedAlphabeticallyTasksWithoutDate,
        importantTasksWithoutDate,
        sortedAlphabeticallyTasksWithoutDateWithImportance,
    }
}
