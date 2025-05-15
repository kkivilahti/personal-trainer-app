import { Box, Typography } from '@mui/material';
import { AllCommunityModule, ModuleRegistry, themeMaterial } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import AddTraining from './AddTraining';
import Delete from './Delete';
import { deleteTraining } from '../api/trainingsApi';
ModuleRegistry.registerModules([AllCommunityModule]);

export default function TrainingList() {

    // get data and reloading functions from route context
    const { trainings, loadTrainings, loadCustomers, customers } = useOutletContext();

    const format = (date) => {
        return dayjs(date).format("D.M.YYYY HH:mm");
    };

    // define columns for ag-grid table
    const [colDefs] = useState([
        { field: 'date', headerName: 'Date and time', valueFormatter: params => format(params.value), minWidth: 130, flex: 2 },
        { field: 'duration', minWidth: 130, flex: 2 },
        { field: 'activity', minWidth: 130, flex: 2 },
        {
            headerName: 'Customer',
            minWidth: 130,
            flex: 2,
            valueGetter: params => {
                const customer = params.data?.customer;
                return customer ? `${customer.firstname} ${customer.lastname}` : 'Customer not found';
            }
        },
        {
            filter: false,
            sortable: false,
            minWidth: 120,
            flex: 1,
            cellRenderer: (params) => (
                <Delete params={params} title="training" loadTrainings={loadTrainings} loadCustomers={loadCustomers} deleteTraining={deleteTraining} />
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
            <Typography variant="h1">Trainings</Typography>

            <AddTraining loadTrainings={loadTrainings} customers={customers} />

            <Box className="center">
                <Box className="table-container">
                    <AgGridReact
                        theme={themeMaterial}
                        rowData={trainings}
                        columnDefs={colDefs}
                        defaultColDef={defaultColDef}
                    />
                </Box>
            </Box>
        </>
    );
}