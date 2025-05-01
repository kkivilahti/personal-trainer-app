import { Button, Dialog, DialogActions, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";
import dayjs from 'dayjs';
import { deleteCustomer } from "../api/customersApi";
import { deleteTraining } from "../api/trainingsApi";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function Delete(props) {
    const [toBeDeleted] = useState(props.params.data);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const format = (date) => {
        return dayjs(date).format("MMMM D, YYYY");
    };


    const confirmDelete = async () => {
        console.log(`Deleting ${props.title}`, toBeDeleted);

        if (props.title === 'customer') {
            const success = await deleteCustomer(toBeDeleted);

            if (!success) {
                console.error('Deleting customer failed');
            }

            setOpen(false);

        } else if (props.title === 'training') {

            const success = await deleteTraining(toBeDeleted);

            if (!success) {
                console.error('Deleting training failed');
            }

            setOpen(false);
        }

        // refresh both lists
        await props.loadCustomers();
        await props.loadTrainings();
    }

    return (
        <>
            <Button variant="contained" color="secondary" size="small" onClick={handleClickOpen} title="Delete"><DeleteOutlinedIcon /></Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ textAlign: 'center' }}>
                    Confirm delete
                </DialogTitle>
                <DialogContentText sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', px: 4, py: 1 }}>
                    Are you sure you want to delete
                    {toBeDeleted.firstname && ' customer ' + toBeDeleted.firstname + ' ' + toBeDeleted.lastname}
                    {toBeDeleted.activity && ' activity ' + toBeDeleted.activity + ' on ' + format(toBeDeleted.date)}?
                </DialogContentText>
                <DialogActions sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', margin: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" color="secondary" onClick={confirmDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}