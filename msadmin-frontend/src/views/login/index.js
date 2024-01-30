/**
 * Created by KanadeM on 13/1/2024
 */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {setToken} from "../../utils/auth";
import {useNavigate} from "react-router-dom";
// import {testHello} from "../../api/test";
import {Alert, Snackbar} from '@mui/material';
import {useState} from "react";
import {login} from "../../api/sso";
import {connect} from "react-redux";
import {getUserToken, setUserToken} from "../../store/actions/actions";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="http://www.menglingjun.com/">
                Leonard Meng
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const Login = (props) => {
    const {
        token,
        setUserToken,
    } = props;


    const navigate = useNavigate();

    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlert(false);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password'),
        // });
        const data = new FormData(event.currentTarget);
        const param = {
            username: data.get('email'),
            password: data.get('password')
        }

        login(param).then((data) => {
            console.log(data)
            setToken(data.token)
            // console.log(props)
            setUserToken(data.token)
            // console.log('redux get user token', token)
            return navigate("/dashboard");
        }).catch((error) => {
            console.log("error", error)
            setAlertContent(error);
            setAlert(true);
        });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log In
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Log In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signUp" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}}/>
                <Snackbar open={alert}
                          autoHideDuration={6000}
                          anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                          onClose={handleClose}
                >
                    <Alert
                        onClose={handleClose}
                        severity="error"
                        variant="filled"
                        sx={{width: '100%'}}
                    >
                        {alertContent}
                    </Alert>
                </Snackbar>
                {/*<Alert severity='error'>{alertContent}</Alert>*/}
            </Container>
        </ThemeProvider>
    );
}
export default connect(
    state => ({
        token: state.userToken
    }),{ setUserToken, getUserToken}
)(Login);
