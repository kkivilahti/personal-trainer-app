import { Box, Typography } from '@mui/material';
import { AllCommunityModule, ModuleRegistry, themeMaterial } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
ModuleRegistry.registerModules([AllCommunityModule]);

export default function TrainingList() {

    const { trainings } = useOutletContext();

    const format = (date) => {
        return dayjs(date).format("D.M.YYYY");
    };

    const [colDefs] = useState([
        { field: 'date', valueFormatter: params => format(params.value) },
        { field: 'duration' },
        { field: 'activity' },
        {
            headerName: 'Customer',
            valueGetter: params => {
                const customer = params.data?.customer;
                return customer ? `${customer.firstname} ${customer.lastname}` : 'Customer not found';
            }
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
            <Typography variant="h1">Trainings</Typography>

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