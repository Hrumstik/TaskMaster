import { createTheme } from '@mui/material/styles';

export const defaultTheme = createTheme({
    palette: {
        primary: {
            main: "#2564CF",

        },
        secondary: {
            main: "#414141"
        },
        text: {
            primary: "#414141",
            secondary: "#2564CF"
        },
        icons: {
            primary: '#414141',
            secondary: '#2564CF',
        },
        background: {
            default: '#FFF',
            paper: '#FAF9F8',
        },
    }
});

export const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#800080",

        },
        secondary: {
            main: "#FFFFFF"
        },
        text: {
            primary: "#d0cae8",
            secondary: "#6d59ba"
        },
        icons: {
            primary: '#d0cae8',
            secondary: '#6d59ba',
        },
        background: {
            default: '#242130',
            paper: '#1d1b29',
        },
    }
});




