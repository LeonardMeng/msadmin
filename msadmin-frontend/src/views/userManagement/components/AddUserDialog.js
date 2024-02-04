/**
 * Created by KanadeM on 5/2/2024
 */
import {Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select} from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {useState} from "react";

const AddUserDialog = (props) => {
    const { open, handleClose } = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');

    const handleAddUser = () => {
        if (username === '' || password === '') {
            setError('Username and password cannot be empty');
            return;
        }
        handleClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const email = formJson.email;
                    console.log(email);
                    handleClose();
                },
            }}
        >
            <DialogTitle>User Detail</DialogTitle>
            <DialogContent>
                {/*<DialogContentText>*/}
                {/*    To subscribe to this website, please enter your email address here. We*/}
                {/*    will send updates occasionally.*/}
                {/*</DialogContentText>*/}
                <TextField
                    sx={{ml: "5px", mt: "10px"}}
                    id="outlined-read-only-input"
                    label="Username"
                    name="username"
                />
                <TextField
                    sx={{ml: "5px", mt: "10px"}}
                    id="outlined-read-only-input"
                    label="Email"
                    name="email"
                />
                <TextField
                    sx={{ml: "5px", mt: "10px"}}
                    id="outlined-read-only-input"
                    label="Phone Number"
                    name="phonenumber"
                />
                {/*<TextField*/}
                {/*    autoFocus*/}
                {/*    required*/}
                {/*    margin="dense"*/}
                {/*    id="name"*/}
                {/*    name="email"*/}
                {/*    label="Email Address"*/}
                {/*    type="email"*/}
                {/*    fullWidth*/}
                {/*    variant="standard"*/}
                {/*/>*/}
            </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>

        </Dialog>
    );
};


export default AddUserDialog;
