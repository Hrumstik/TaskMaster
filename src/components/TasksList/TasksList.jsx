import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import useRenderTasks from "../../hooks/useRenderTasks";
import useFeatures from "../../hooks/useFeatures";
import useGroupTasks from "../../hooks/useGroupTasks";
import { fetchTasks } from "../TaskListItem/tasksSlice";
import { Box, Container } from "@mui/material";
import NoTaskScreen from '../NoTaskScreen/NoTaskScreen';
import DoneTasksList from "../DoneTasksList/DoneTasksList";
import InputField from '../inputField/InputField';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';

function TasksList() {
    const tasks = useSelector((state) => state.tasks.tasks);
    const tasksStatus = useSelector((state) => state.tasks.status)
    const stateOfInput = useSelector((state) => state.input);

    const { sortedAlphabeticallyAllTasks,
        importantAllTasks,
        sortedAlphabeticallyAllTasksWithImportance } = useGroupTasks(tasks);
    const { renderTasks } = useRenderTasks();
    const {
        sortTasksAlphabeticallyState,
        showImportantTasksState
    } = useFeatures();

    const dispatch = useDispatch()

    useEffect(() => {
        if (tasksStatus === 'idle') {
            dispatch(fetchTasks())
        }
    }, [dispatch, tasksStatus])


    return (
        <Container
            sx={{
                height: '86%',
                paddingLeft: 2,
                paddingRight: 2,
                display: 'flex',
                flexDirection: 'column',
            }}>

            {(tasks && tasks.length) || stateOfInput ? (
                <Box sx={{ height: '100%' }}>
                    {sortTasksAlphabeticallyState && !showImportantTasksState
                        ? renderTasks(sortedAlphabeticallyAllTasks) :
                        !sortTasksAlphabeticallyState && showImportantTasksState
                            ? renderTasks(importantAllTasks) :
                            sortTasksAlphabeticallyState && showImportantTasksState
                                ? renderTasks(sortedAlphabeticallyAllTasksWithImportance) :
                                renderTasks(tasks)}

                    <DoneTasksList tasksArray={tasks} />
                </Box>
            ) : (
                <NoTaskScreen
                    text1='Do something'
                    text2='of the planned for the upcoming'
                    text3='day.'
                    text4='Best wishes.'
                    icon={<SelfImprovementIcon
                        sx={{
                            fontSize: 300,
                            display: 'flex',
                            alignSelf: 'center',
                            color: 'icons.secondary'
                        }}
                    />}
                />
            )}
            <InputField />
        </Container>
    );
}

export default TasksList;
