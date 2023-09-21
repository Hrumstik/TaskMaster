import { Typography } from "@mui/material";

export default function NoTaskScreen({ text1, text2, text3, text4, icon }) {

    return (
        <>
            {icon}
            <Typography align='center' sx={{ fontFamily: 'Roboto', fontSize: '34px', color: 'text.primary' }} variant="h2">
                {text1}<br />
                {text2}<br />
                {text3}
            </Typography>
            <Typography align='center' sx={{ fontFamily: 'Roboto', fontSize: '24px', color: 'text.primary' }} variant="h3">
                <br />
                {text4}
            </Typography>
        </>
    )
}
