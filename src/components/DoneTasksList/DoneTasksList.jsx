import './DoneTasksList.css';
import TaskListItem from "../TaskListItem/TaskListItem";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Box, IconButton, Typography } from "@mui/material";
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function DoneTasksList({ tasksArray }) {
    const [visibilityOfDoneTasks, setVisibilityOfDoneTasks] = useState(false);
    const [doneTasksCount, setDoneTasksCount] = useState(null)
    const tasks = useSelector((state) => state.tasks.tasks);

    const countDoneTasks = useCallback(() => {
        const doneTasksArray = tasksArray.filter(task => task.done === true)
        setDoneTasksCount(doneTasksArray.length);
    }, [tasksArray]);

    useEffect(() => {
        countDoneTasks()
    }, [tasks, countDoneTasks]);

    return (
        <>
            <Box
                onClick={() => { setVisibilityOfDoneTasks(!visibilityOfDoneTasks) }}
                sx={{ display: 'flex', gap: '22px' }}>
                <Typography sx={{ cursor: 'pointer', fontWeight: 'bold', color: "text.primary" }}>
                    <IconButton>
                        {visibilityOfDoneTasks
                            ? <KeyboardArrowDownIcon
                                sx={{ color: "icons.primary" }} />
                            : <KeyboardArrowRightOutlinedIcon
                                sx={{ color: "icons.primary" }} />}
                    </IconButton>
                    Completed
                </Typography>
                <Typography
                    sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', color: "text.primary" }}
                    variant="subtitle1">
                    {doneTasksCount ? doneTasksCount : null}
                </Typography>
            </Box>
            <CSSTransition
                in={visibilityOfDoneTasks && tasks.length}
                timeout={300}
                classNames='done-tasks'
                unmountOnExit>
                <Box>
                    {tasksArray.map((task, i) => {
                        if (task.done === true) {
                            return (<TaskListItem text={task.name} checked={task.done}
                                key={i} />)
                        } else {
                            return null
                        }
                    })}
                </Box>
            </CSSTransition>
        </>
    )
}
