import * as React from 'react';
import "../custom.scss";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { theme } from '../theme';
import {ThemeProvider } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import { useFormik } from 'formik'; 
import axios from 'axios';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const daysofweek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
]

export default function SignIn() {
    const formik = useFormik({
        initialValues: {
            classname: '',
            zoomlink: '',
            profemail: '',
            dayofweek: '',
            time: '',
        },
        //validate,
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            const newzoom = {
                classname: values.classname,
                zoomlink: values.zoomlink,
                profemail: values.profemail,
                day: values.dayofweek,
                time: values.time,
            };
            axios.post('http://localhost:4000/api/zoom', newzoom)
            .then(res => console.log(res.data));
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
                    <Typography component="h1" variant="h5">
                        Add ZoomClass
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="classname"
                            label="Zoom Class Name"
                            name="classname"
                            autoFocus
                            onChange={formik.handleChange}
                            value={formik.values.classname}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="zoomlink"
                            label="Zoom Link"
                            id="zoomlink"
                            onChange={formik.handleChange}
                            value={formik.values.zoomlink}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="profemail"
                            label="Professor Email"
                            id="profemail"
                            onChange={formik.handleChange}
                            value={formik.values.profemail}
                        />
                        <Autocomplete
                            margin="normal"
                            id="dayofweek"
                            name="dayofweek"
                            required
                            disablePortal
                            onChange={formik.handleChange,
                                (e, value) => {
                                console.log(value)
                                formik.setFieldValue("dayofweek", value)
                            }}
                            value={formik.values.dayofweek}
                            options={daysofweek}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Day of week" />}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="time"
                            label="Time in HHMM"
                            id="time"
                            onChange={formik.handleChange}
                            value={formik.values.time}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add Zoom Class
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}