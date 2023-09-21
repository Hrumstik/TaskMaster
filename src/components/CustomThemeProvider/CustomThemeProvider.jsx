import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { defaultTheme, darkTheme } from '../themes/themes';

export default function CustomThemeProvider({ children }) {
    const lightThemeState = useSelector((state) => state.features.showLightTheme);
    const theme = lightThemeState ? defaultTheme : darkTheme;

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}