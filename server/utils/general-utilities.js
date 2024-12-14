// Moment.js for timezone and date-time manipulation
const moment = require('moment-timezone');

const getMexicoCityDateTime = (date = null) => {
    const now = date ? moment(date).tz('America/Mexico_City') : moment().tz('America/Mexico_City');
    return now.format("YYYY-MM-DDTHH:mm:ssZ");
};

// Usa module.exports en lugar de export
module.exports = { getMexicoCityDateTime };