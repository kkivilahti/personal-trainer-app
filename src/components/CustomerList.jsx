import { Box, Button, Typography } from '@mui/material';
import { AllCommunityModule, ModuleRegistry, themeMaterial } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AlertMessage from "./AlertMessage";
import Delete from './Delete';
import { deleteCustomer } from '../api/customersApi';
import { editCustomer } from '../api/customersApi';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
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
        resizable: true
    };

    const gridRef = useRef(null);
    const onGridReady = params => {
        gridRef.current = params.api;
    };

    // export grid data as csv
    const exportData = () => {
        gridRef.current.exportDataAsCsv({
            fileName: 'customers.csv',
            suppressQuotes: true,
            columnSeparator: ';',
        });
    }

    return (
        <>
            <Typography variant="h1">Customers</Typography>

            <AddCustomer loadCustomers={loadCustomers} />

            <Button sx={{ marginBottom: 3, marginLeft: 1 }} variant="contained" color="secondary" onClick={exportData}>
                Export data <FileDownloadOutlinedIcon sx={{ mb: 0.5, ml: 0.5, fontSize: 20 }} />
            </Button>

            <Box className="center">
                <Box className="table-container">
                    <AgGridReact
                        theme={themeMaterial}
                        rowData={customers}
                        columnDefs={colDefs}
                        defaultColDef={defaultColDef}
                        onGridReady={onGridReady}
                    />
                </Box>
            </Box>

            {alertOpen && <AlertMessage open={alertOpen} setOpen={setAlertOpen} />}
        </>
    );
}