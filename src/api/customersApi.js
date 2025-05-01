export async function getCustomers() {
    const response = await fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers");
    
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data._embedded.customers;
}

export async function addCustomer(customer) {
    const response = await fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers", {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(customer),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return true;
}

export async function editCustomer(customer) {
    const response = await fetch(customer._links.self.href, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(customer),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return true;
}

export async function deleteCustomer(customer) {
    const response = await fetch(customer._links.self.href, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return true;
}