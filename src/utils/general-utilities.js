import moment from 'moment-timezone';

const getMexicoCityDateTime = () => {
    const now = moment().tz('America/Mexico_City');
    return now.format();
};

export { getMexicoCityDateTime };
