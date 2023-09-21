import Menu from '../Menu/Menu'
import Header from '../Header/Header'
import TasksList from '../TasksList/TasksList'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import { Box } from '@mui/material'

export default function Main() {
    return (
        <Box
            sx={{ bgcolor: 'background.paper' }}
            className='app'>
            <Menu />
            <div className='main'>
                <Header text='Tasks' icon={<HomeOutlinedIcon sx={{ fontSize: 40, color: 'icons.secondary' }} />} />
                <TasksList />
            </div>
        </Box>
    )
}
