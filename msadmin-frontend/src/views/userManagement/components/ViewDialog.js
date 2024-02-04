/**
 * Created by KanadeM on 5/2/2024
 */
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


const ViewDialog = (props) => {
    const {
        open,
        userInfo,
        isEdit,
        handleClose
    } = props;

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
                    defaultValue={userInfo.username}
                    InputProps={{
                        readOnly: !isEdit,
                    }}
                />
                <TextField
                    sx={{ml: "5px", mt: "10px"}}
                    id="outlined-read-only-input"
                    label="Email"
                    name="email"
                    defaultValue={userInfo.email}
                    InputProps={{
                        readOnly: !isEdit,
                    }}
                />
                <TextField
                    sx={{ml: "5px", mt: "10px"}}
                    id="outlined-read-only-input"
                    label="Phone Number"
                    name="phonenumber"
                    defaultValue={userInfo.phonenumber}
                    InputProps={{
                        readOnly: !isEdit,
                    }}
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
            {isEdit &&
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
                </DialogActions>}

        </Dialog>
    );
}

export default ViewDialog;
