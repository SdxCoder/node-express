

function formatDate(dateStr) {
    if (dateStr === null) return null;
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
}

export { formatDate }