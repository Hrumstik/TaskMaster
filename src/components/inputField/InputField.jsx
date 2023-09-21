import './InputField.css'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { CSSTransition } from 'react-transition-group';
import { addTask } from '../TaskListItem/tasksSlice';
import { toggleStateOfInput } from './inputOpenSlice';
import { v4 as uuidv4 } from 'uuid';
import { TextField, Box } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

export default function InputField() {
    const stateOfInput = useSelector((state) => state.input);
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const [isValid, setIsValid] = useState(true);
    const { request } = useHttp();

    const saveTask = () => {
        if (isValid) {
            dispatch(addTask(inputValue))
            request(`http://localhost:3001/tasks`, 'POST', JSON.stringify(makeAnObjectForNewTask(inputValue)))
            setInputValue('')
            dispatch(toggleStateOfInput())
        }
    };

    const makeAnObjectForNewTask = (taskName) => {
        return {
            id: uuidv4(),
            name: taskName,
            date: null,
            done: false,
            important: false
        }
    }

    const validateText = () => {
        if (inputValue.length > 2 && inputValue.trim().length > 2) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }

    return (
        <CSSTransition
            in={stateOfInput}
            timeout={500}
            classNames="text-field"
            unmountOnExit>
            <Box sx={{ display: 'flex', mb: '25px' }}>
                <TextField
                    color='primary'
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            validateText();
                            if (isValid) {
                                saveTask()
                            }
                        }
                    }}
                    onBlur={() => {
                        validateText()
                    }}
                    onChange={(e) => {
                        setInputValue(e.target.value)
                    }}
                    value={inputValue}
                    error={isValid ? false : true}
                    label="Write your task"
                    variant="filled"
                    helperText={isValid ? null : "The text must contain at least 2 characters and not consist only of spaces"}
                    fullWidth />
                <Button
                    color='primary'
                    onClick={() => {
                        validateText()
                        if (isValid) {
                            saveTask()
                        }
                    }}
                    sx={{ ml: '15px' }}
                    size='small'
                    variant="contained"
                    endIcon={<SendIcon />}>
                    Send
                </Button>
            </Box>
        </CSSTransition>

    )
}