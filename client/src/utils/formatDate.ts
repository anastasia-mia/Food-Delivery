
export const formatDate = (date: string) => {
    const formattedDate = new Date(date);

    const day = String(formattedDate.getUTCDate()).padStart(2, '0');
    const month = String(formattedDate.getUTCMonth() + 1).padStart(2, '0');
    const year = formattedDate.getUTCFullYear();

    return `${day}.${month}.${year}`;
}