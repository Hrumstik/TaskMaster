import DoneTasksList from '../DoneTasksList/DoneTasksList';
import NoTaskScreen from '../NoTaskScreen/NoTaskScreen';
import InputField from '../inputField/InputField';
import Menu from '../Menu/Menu'
import Header from '../Header/Header'
import { useSelector } from 'react-redux';
import { Box, Container } from "@mui/material"
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import useGroupTasks from '../../hooks/useGroupTasks';
import useRenderTasks from '../../hooks/useRenderTasks';
import useFeatures from '../../hooks/useFeatures';

export default function Important() {
    const tasks = useSelector((state) => state.tasks.tasks);
    const stateOfInput = useSelector((state) => state.input);

    const { importantAllTasks,
        sortedAlphabeticallyAllTasksWithImportance } = useGroupTasks(tasks);
    const { renderTasks } = useRenderTasks();
    const {
        sortTasksAlphabeticallyState,
    } = useFeatures();

    return (
        <Box
            sx={{ bgcolor: 'background.paper' }}
            className='app'>
            <Menu />
            <div className='main'>
                <Header text='Important' icon={<StarOutlineOutlinedIcon sx={{ fontSize: 40, color: 'icons.secondary' }} />} />

                <Container sx={{
                    height: '86%', paddingLeft: 2, paddingRight: 2, display: 'flex',
                    flexDirection: 'column',
                }}>
                    {importantAllTasks.length || stateOfInput ? (<Box sx={{ height: '100%' }}>
                        {sortTasksAlphabeticallyState
                            ? renderTasks(sortedAlphabeticallyAllTasksWithImportance) :
                            renderTasks(importantAllTasks)}
                        <DoneTasksList tasksArray={importantAllTasks} />
                    </Box>) : (
                        <NoTaskScreen
                            text1='You have'
                            text2='no important'
                            text3='tasks'
                            icon={<RemoveDoneIcon sx={{
                                fontSize: 300,
                                display: 'flex',
                                alignSelf: 'center',
                                color: 'icons.secondary'
                            }} />} />
                    )}

                    <InputField />
                </Container>
            </div>
        </Box>
    )
}
