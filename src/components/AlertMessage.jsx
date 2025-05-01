import { Snackbar, Alert } from "@mui/material";

export default function AlertMessage(props) {

    const handleClose = () => {
        props.setOpen(false);
    }

    return (
        <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert severity="warning" onClose={handleClose}>
                Please fill all fields
            </Alert>
        </Snackbar>
    );
}