const getFormattedDate = (dateData) => {
    const monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun", "Jul",
        "Aug", "Sep", "Oct",
        "Nov", "Dec"
    ];
    const date = new Date(dateData)
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    
    return monthNames[monthIndex] + ' ' + day + ', ' + year;
}

export { getFormattedDate }