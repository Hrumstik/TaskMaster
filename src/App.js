import './App.css';
import Main from './components/pages/Main';
import Error from './components/pages/Error';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { defaultTheme, darkTeme } from './components/themes/themes';

function App() {
  const litghtThemeState = useSelector((state) => state.features.showLightTheme);

  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className='app'>
      </div>
    </ThemeProvider>

  );
}

export default App;
