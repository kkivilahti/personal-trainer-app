// get trainings with customer info
export async function getTrainings() {
    const response = await fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings");
    
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export async function addTraining(training) {
    const response = await fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings", {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(training),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return true;
}

export async function deleteTraining(training) {
    const url = `https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/${training.id}`;
    
    const response = await fetch(url, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return true;
}