import { Box, Typography } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function TimeContainer({ text }) {
    return (
        <Box sx={{ display: 'flex', paddingLeft: '32px' }}>
            <CalendarMonthIcon sx={{ mr: '15px', color: 'red', fontSize: 30 }} />
            <Typography
                variant="h5"
                sx={{ color: 'red', dalignContent: 'center' }}>
                {text}
            </Typography>
        </Box>
    )
}
