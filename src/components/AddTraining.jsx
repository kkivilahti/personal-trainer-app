import { Button, Dialog, DialogContent, DialogTitle, DialogActions, TextField, Grid, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { addTraining } from "../api/trainingsApi";
import AlertMessage from "./AlertMessage";
import dayjs from 'dayjs';

export default function AddTraining(props) {

    const emptyTraining = {
        date: null,
        duration: '',
        activity: '',
        customer: ''
    }

    const [training, setTraining] = useState(emptyTraining);
    const [alertOpen, setAlertOpen] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = async () => {
        console.log("Add training", training);

        let success = false;

        if (training.date && training.duration && training.activity && training.customer) {
            await addTraining(training);
            success = true;

            setOpen(false);
            setTraining(emptyTraining);
        } else {
            // empty input fields -> open alert message
            setAlertOpen(true);
        }

        if (!success) {
            console.error("Error while adding a training");
        }

        await props.loadTrainings();
    }

    return (
        <>
            <Button sx={{ marginBottom: 3 }} variant="contained" color="secondary" onClick={handleClickOpen}>New training</Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ textAlign: 'center' }}>Add training</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>

                    <Grid container columnSpacing={1} justifyContent="center">
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateTimePicker
                                    label="Date and time"
                                    name="Date and time"
                                    ampm={false}
                                    format="DD.MM.YYYY hh:mm"
                                    minTime={dayjs().hour(7).minute(0)}
                                    maxTime={dayjs().hour(21).minute(0)}
                                    slotProps={{ textField: { fullWidth: true, sx: { marginTop: 1 } } }}
                                    value={training.date}
                                    onChange={(value) => setTraining({ ...training, date: value })}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                sx={{ marginTop: 1 }}
                                fullWidth
                                label="Duration"
                                name="Duration"
                                type="number"
                                value={training.duration}
                                onChange={(event) => setTraining({ ...training, duration: event.target.value })}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                sx={{ marginTop: 1 }}
                                fullWidth
                                label="Activity"
                                name="Activity"
                                value={training.activity}
                                onChange={(event) => setTraining({ ...training, activity: event.target.value })}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormControl fullWidth sx={{ marginTop: 1 }}>
                                <InputLabel id="customer-label">Customer</InputLabel>
                                {/*
                                    API customers used as select options
                                    
                                    Value is a link to certain customer's information (for example https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers/3780)
                                    Used for linking new trainings to the correct customers
                                */}
                                <Select
                                    labelId="customer-label"
                                    label="Customer"
                                    name="Customer"
                                    value={training.customer}
                                    onChange={(event) => setTraining({ ...training, customer: event.target.value })}
                                >
                                    {props.customers.map((customer) => (
                                        <MenuItem key={customer._links.self.href} value={customer._links.self.href}>
                                            {customer.firstname} {customer.lastname}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <DialogActions sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', marginTop: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" color="secondary" onClick={handleSave}>Save</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>

            {alertOpen && <AlertMessage open={alertOpen} setOpen={setAlertOpen} />}
        </>
    )
}