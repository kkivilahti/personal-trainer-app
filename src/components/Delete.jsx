import { Button, Dialog, DialogActions, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";
import dayjs from 'dayjs';
import { deleteCustomer } from "../api/customersApi";
import { deleteTraining } from "../api/trainingsApi";

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

            await props.loadCustomers();
            setOpen(false);

        } else if (props.title === 'training') {

            const success = await deleteTraining(toBeDeleted);

            if (!success) {
                console.error('Deleting training failed');
            }

            await props.loadTrainings();
            setOpen(false);
        }
    }

    return (
        <>
            <Button variant="contained" color="secondary" size="small" onClick={handleClickOpen}>Delete</Button>

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