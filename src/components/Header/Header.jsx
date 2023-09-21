import { Box, IconButton, Typography } from '@mui/material';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../reducers/featuresSlice';

export default function Header({ text, icon }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [showPrintFeature, setShowPrintFeature] = useState(false);
    const litghtThemeState = useSelector((state) => state.features.showLightTheme);
    const dispatch = useDispatch();

    // !

    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingRight: '18px',
            paddingLeft: '18px',
            marginBottom: '37px'
        }}>
            <Box sx={{ display: 'flex', gap: '9px', cursor: 'pointer' }}>
                <Typography variant='h1' sx={{ fontSize: '22px', color: 'text.secondary' }}>
                    <IconButton >
                        {icon}
                    </IconButton>
                    {text}
                </Typography>
                <Typography
                    onClick={(event) => {
                        setShowPrintFeature(true)
                        setAnchorEl(event.currentTarget)
                    }}
                    sx={{ color: 'text.secondary' }}>...</Typography>
                <Menu
                    anchorEl={anchorEl}
                    open={showPrintFeature}

                    onClose={(event) => {
                        setShowPrintFeature(false)
                        setAnchorEl(event.null)
                    }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}>
                    <MenuItem
                        onClick={() => {
                            setShowPrintFeature(false)
                            window.print()
                        }}>Print list</MenuItem>
                </Menu>
            </Box>
            <Box sx={{ display: 'flex', gap: '30px', cursor: 'pointer' }}>
                <IconButton
                    onClick={() => { dispatch(toggleTheme()) }}>
                    {litghtThemeState
                        ? <ModeNightIcon sx={{
                            fontSize: 40,
                            color: "icons.secondary"
                        }} />
                        : <LightModeIcon sx={{
                            fontSize: 40,
                            color: "icons.secondary"
                        }} />}
                </IconButton>
            </Box>

        </header>
    )
}

// !
