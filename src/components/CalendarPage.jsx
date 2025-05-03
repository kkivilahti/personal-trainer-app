import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import dayjs from "dayjs";


export default function Calendar() {

    const [selectedEvent, setSelectedEvent] = useState(null);
    const { trainings } = useOutletContext();

    const [open, setOpen] = useState(false);

    const handleEventClick = (info) => {
        console.log("Clicked event", info);
        setSelectedEvent(info.event);
        setOpen(true);
    };

    const handleEventClose = () => {
        setSelectedEvent(null);
        setOpen(false);
    };

    const calculateEndingTime = (date, duration) => {
        const d = dayjs(date);
        return d.add(parseInt(duration), 'minute').toISOString();
    }

    const formatDateAndTime = (date) => {
        return dayjs(date).format("DD.MM.YYYY HH:mm");
    };

    const events = trainings.map((training) => ({
        title: `${training.activity} / ${training.customer.firstname} ${training.customer.lastname}`,
        start: training.date,
        end: calculateEndingTime(training.date, training.duration)
    }));


    return (
        <>
            <Box className="calendar">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin]}
                    initialView="dayGridMonth"
                    firstDay={1} // monday
                    slotMinTime="06:00:00"
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'timeGridDay,timeGridWeek,dayGridMonth'
                    }}
                    events={events}
                    eventClick={handleEventClick}
                    eventBackgroundColor="#a7505e"
                    eventBorderColor="#8a414d"
                    slotEventOverlap={false}
                    eventTimeFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }}
                    slotLabelFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }}
                    views={{
                        timeGridWeek: {
                            dayHeaderFormat: {
                                weekday: 'short',
                                day: '2-digit',
                                month: 'short'
                            }
                        }
                    }}
                />
            </Box>

            {selectedEvent && (
                <Dialog open={open} onClose={handleEventClose}>
                    <DialogTitle>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <Typography variant="h4">Activity details</Typography>
                            <IconButton onClick={handleEventClose} title="Close">
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </DialogTitle>
                    <DialogContent sx={{ textAlign: 'center', px: 8, pb: 3 }}>
                        <p style={{ fontSize: 18, color: '#b8495b' }}><b>{selectedEvent.title}</b></p>
                        <p><b>Start:</b> {formatDateAndTime(selectedEvent.start)}</p>
                        <p><b>End:</b> {formatDateAndTime(selectedEvent.end)}</p>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}