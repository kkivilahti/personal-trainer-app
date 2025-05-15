import { Button, Dialog, DialogContent, DialogTitle, DialogActions, TextField, Grid } from "@mui/material";
import { useState } from "react";
import { addCustomer } from "../api/customersApi";
import AlertMessage from "./AlertMessage";

export default function AddCustomer(props) {

    const emptyCustomer = {
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    }

    const [customer, setCustomer] = useState(emptyCustomer);
    const [alertOpen, setAlertOpen] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = async () => {
        console.log("Add customer ", customer);

        let success = false;

        if (customer.firstname && customer.lastname && customer.streetaddress && customer.postcode && customer.city && customer.email && customer.phone) {
            // all input fields are filled -> add customer
            await addCustomer(customer);
            success = true;

            setOpen(false);
            setCustomer(emptyCustomer); // reset form
        } else {
            // empty input fields -> open alert message
            setAlertOpen(true);
        }

        if (!success) {
            console.error("Error while adding a customer");
        }

        // reload customers
        await props.loadCustomers();
    }

    return (
        <>
            <Button sx={{ marginBottom: 3 }} variant="contained" color="secondary" onClick={handleClickOpen}>New customer</Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ textAlign: 'center' }}>Add customer</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
                    <Grid container columnSpacing={1} justifyContent="center">

                        {/* firstname */}
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

                        {/* lastname */}
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

                        {/* address */}
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

                        {/* postcode */}
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

                        {/* city */}
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

                        {/* email */}
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

                        {/* phone */}
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

            {alertOpen && <AlertMessage open={alertOpen} setOpen={setAlertOpen} />}
        </>
    )
}