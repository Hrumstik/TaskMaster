import './ListItem.css'
import { NavLink } from "react-router-dom";
import { IconButton, Typography } from '@mui/material';

export default function ListItem({ text, path, icon, height, mr }) {

    return (
        <li
            style={{ height: height }} className=''>
            <NavLink
                to={path}
                className={({ isActive }) =>
                    isActive
                        ? "listItem-active"
                        : "listItem"
                }
                style={{ textDecoration: 'none', color: '#414141' }}
            >
                <Typography variant="h6"
                    component="span"
                    color='text.primary'>
                    <IconButton
                        sx={{ mr: mr }} >
                        {icon}
                    </IconButton>
                    {text}
                </Typography>
            </NavLink>
        </li>
    )
}