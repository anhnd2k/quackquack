import moment from 'moment';

type FormatDay = 'MM/DD/YYYY' | 'MM' | 'DD' | 'YYYY' | 'MM/DD/YYYY HH:MM:SS';

type DayStandard = 'YYYY-MM-DD';

const dayOfWeek = {
	MONDAY: 'MON',
	TUESDAY: 'TUE',
	WEDNESDAY: 'WED',
	THURSDAY: 'THU',
	FRIDAY: 'FRI',
	SATURDAY: 'STA',
	SUNDAY: 'SUN',
};

const infoDay = {
	dayCurrent: moment().format('YYYY-MM-DD'),

	dateCurrent: moment().format('DD'),
	monthCurrent: moment().format('MM'),
	yearCurrent: moment().format('YYYY'),
};

const getInfoDateFomat = (fomat: FormatDay) => {
	return moment().format(fomat);
};

const unixToDay = (value: number, format: FormatDay): string => {
	return moment.unix(value).format(format);
};

const getCurrentTime = (year: number, month: number, day: number): string => {
	//'YYYY-MM-DD'
	return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
};

const dayToUnix = (dayStandard: string): number => {
	return moment(dayStandard).unix();
};

const currentDayUnix = (): number => {
	const dayCurrent: string = moment().format('YYYY-MM-DD');
	return moment(dayCurrent).unix();
};

export {
	dayOfWeek,
	infoDay,
	unixToDay,
	getInfoDateFomat,
	getCurrentTime,
	dayToUnix,
	currentDayUnix,
};
