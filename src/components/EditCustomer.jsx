import { Button, Dialog, DialogContent, DialogTitle, DialogActions, TextField, Grid } from "@mui/material";
import { useState } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function EditCustomer(props) {
    const [customer, setCustomer] = useState(props.params.data);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = async () => {
        console.log("Edit customer ", customer);

        let success = false;

        if (customer.firstname && customer.lastname && customer.streetaddress && customer.postcode && customer.city && customer.email && customer.phone) {
            await props.editCustomer(customer);
            success = true;
            setOpen(false);

            // refresh both lists after editing
            await props.loadCustomers();
            await props.loadTrainings();
        } else {
            // empty input fields -> open alert message
            props.setAlertOpen(true);
        }

        if (!success) {
            console.error("Error while editing a customer");
        }
    }

    return (
        <>
            <Button variant="contained" color="primary" size="small" onClick={handleClickOpen} title="Edit"><EditOutlinedIcon /></Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ textAlign: 'center' }}>Edit customer</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>

                    <Grid container columnSpacing={1} justifyContent="center">
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                sx={{ marginTop: 1 }}
                                fullWidth
                                label="Firstname"
                                name="Firstname"
                                value={customer.firstname}
                                onChange={(event) => setCustomer({ ...customer, firstname: event.target.value })}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                sx={{ marginTop: 1 }}
                                fullWidth
                                label="Lastname"
                                name="Lastname"
                                value={customer.lastname}
                                onChange={(event) => setCustomer({ ...customer, lastname: event.target.value })}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                sx={{ marginTop: 1 }}
                                fullWidth
                                label="Address"
                                name="Address"
                                value={customer.streetaddress}
                                onChange={(event) => setCustomer({ ...customer, streetaddress: event.target.value })}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                sx={{ marginTop: 1 }}
                                fullWidth
                                label="Postcode"
                                name="Postcode"
                                value={customer.postcode}
                                onChange={(event) => setCustomer({ ...customer, postcode: event.target.value })}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                sx={{ marginTop: 1 }}
                                fullWidth
                                label="City"
                                name="City"
                                value={customer.city}
                                onChange={(event) => setCustomer({ ...customer, city: event.target.value })}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                sx={{ marginTop: 1 }}
                                fullWidth
                                label="Email"
                                name="Email"
                                value={customer.email}
                                onChange={(event) => setCustomer({ ...customer, email: event.target.value })}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                sx={{ marginTop: 1 }}
                                fullWidth
                                label="Phone"
                                name="Phone"
                                value={customer.phone}
                                onChange={(event) => setCustomer({ ...customer, phone: event.target.value })}
                            />
                        </Grid>
                    </Grid>
                    <DialogActions sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', marginTop: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" color="secondary" onClick={handleSave}>Save</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}