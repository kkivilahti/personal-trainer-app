import { Box, Typography } from '@mui/material';
import { AllCommunityModule, ModuleRegistry, themeMaterial } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import AddCustomer from './AddCustomer';
import Delete from './Delete';
import { deleteCustomer } from '../api/customersApi';
ModuleRegistry.registerModules([AllCommunityModule]);

export default function CustomerList() {

    const { customers } = useOutletContext();
    const { loadCustomers } = useOutletContext();

    const [colDefs] = useState([
        { field: 'lastname' },
        { field: 'firstname' },
        { field: 'streetaddress', headerName: 'Address' },
        { field: 'postcode' },
        { field: 'city' },
        { field: 'email' },
        { field: 'phone' },
        {
            filter: false,
            sortable: false,
            cellRenderer: (params) => (
                <Delete params={params} title="customer" loadCustomers={loadCustomers} deleteCustomer={deleteCustomer} />
            )
        }
    ]);

    const defaultColDef = {
        sortable: true,
        filter: true,
        resizable: true,
        minWidth: 130,
        flex: 1
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
        </>
    );
}