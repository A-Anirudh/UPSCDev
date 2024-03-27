export const fetchData = async (rtkFunction) => {
    try {
        const timeout = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Request timed out')), 60000);
        });
        const data = await Promise.race([rtkFunction().unwrap(), timeout]);
        return data
    } catch (error) {
        console.error('Error fetching data', error);
    }
};