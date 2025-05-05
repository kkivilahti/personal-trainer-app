import { Box, Typography } from "@mui/material";
import { useOutletContext } from 'react-router-dom';
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import _ from 'lodash';

export default function Stats() {
    const { trainings } = useOutletContext();
    const [chartData, setChartData] = useState([]);

    // count total duration for each activity
    useEffect(() => {
        const groupByActivity = _.groupBy(trainings, 'activity');

        const data = _.map(groupByActivity, (trainings, activity) => ({
            activity,
            duration: _.sumBy(trainings, 'duration'),
        }));

        setChartData(data);
    }, [trainings]);

    return (
        <>
            <Typography variant="h1">Statistics</Typography>

            <Box sx={{ width: '100%', height: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, py: 2 }}>
                <Typography variant="h4">Total minutes reserved per activity type</Typography>

                <ResponsiveContainer width='85%' height='80%'>
                    <BarChart data={chartData}>
                        <XAxis dataKey="activity" />
                        <YAxis dataKey="duration" />
                        <Tooltip />
                        <CartesianGrid strokeDasharray="4 4" vertical={false} />
                        <Bar dataKey="duration" fill="#a7505e" maxBarSize={100} />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </>
    );
}