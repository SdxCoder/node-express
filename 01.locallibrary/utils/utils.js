

function formatDate(date) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
    return formatter.format(date);
}

export { formatDate }