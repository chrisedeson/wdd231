export const dataSource = '../chamber/data/members.json';

export async function getCompanyData(callback) {
    try {
        const response = await fetch(dataSource);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (callback && typeof callback === 'function') {
            callback(data); // Call the callback function with the fetched data
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
