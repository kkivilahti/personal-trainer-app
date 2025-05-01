import { Box, Typography } from '@mui/material';
import { AllCommunityModule, ModuleRegistry, themeMaterial } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AlertMessage from "./AlertMessage";
import Delete from './Delete';
import { deleteCustomer } from '../api/customersApi';
import { editCustomer } from '../api/customersApi';
ModuleRegistry.registerModules([AllCommunityModule]);

export default function CustomerList() {

    const [alertOpen, setAlertOpen] = useState(false);

    const { customers } = useOutletContext();
    const { loadCustomers } = useOutletContext();
    const { loadTrainings } = useOutletContext();

    const [colDefs] = useState([
        { field: 'lastname', minWidth: 130, flex: 2 },
        { field: 'firstname', minWidth: 130, flex: 2 },
        { field: 'streetaddress', headerName: 'Address', minWidth: 130, flex: 2 },
        { field: 'postcode', minWidth: 130, flex: 2 },
        { field: 'city', minWidth: 130, flex: 2 },
        { field: 'email', minWidth: 130, flex: 2 },
        { field: 'phone', minWidth: 130, flex: 2 },
        {
            filter: false,
            sortable: false,
            minWidth: 120,
            flex: 1,
            cellRenderer: (params) => (
                <EditCustomer params={params} loadCustomers={loadCustomers} loadTrainings={loadTrainings} editCustomer={editCustomer} alertOpen={alertOpen} setAlertOpen={setAlertOpen} />
            )
        },
        {
            filter: false,
            sortable: false,
            minWidth: 120,
            flex: 1,
            cellRenderer: (params) => (
                <Delete params={params} title="customer" loadCustomers={loadCustomers} loadTrainings={loadTrainings} deleteCustomer={deleteCustomer} />
            )
        }
    ]);

    const defaultColDef = {
        sortable: true,
        filter: true,
        resizable: true,
    };

    return (
        <>
            <Typography variant="h1">Customers</Typography>

            <AddCustomer loadCustomers={loadCustomers} />

            <Box className="center">
                <Box className="table-container">
                    <AgGridReact
                        theme={themeMaterial}
                        rowData={customers}
                        columnDefs={colDefs}
                        defaultColDef={defaultColDef}
                    />
                </Box>
            </Box>

            {alertOpen && <AlertMessage open={alertOpen} setOpen={setAlertOpen} />}
        </>
    );
}