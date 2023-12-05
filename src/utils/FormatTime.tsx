import { format, isSameDay, isSameWeek } from 'date-fns';
import { vi } from 'date-fns/locale';
const Time2StringHHMM = (time: string | number, timezone?: number): string => {
    const TIMEZONEMILLISECONDS = timezone ? timezone * 3600000 : 0;
    const TIME = new Date(Number(time) + TIMEZONEMILLISECONDS);
    return format(TIME, 'HH:mm bbbb', { locale: vi });
};

const Time2DateString = (time: string | number, timezone?: number): string => {
    const TIMEZONEMILLISECONDS = timezone ? timezone * 3600000 : 0;
    const TIME = new Date(Number(time) + TIMEZONEMILLISECONDS);
    return format(TIME, 'dd, MMMM yyyy', { locale: vi });
};

const Time2DayHourString = (
    time: string | number,
    timezone?: number,
): string => {
    const TIMEZONEMILLISECONDS = timezone ? timezone * 3600000 : 0;
    const TIME = new Date(Number(time) + TIMEZONEMILLISECONDS);
    return format(TIME, 'iii, HH:mm bbbb', { locale: vi });
};

const Time2MessageTitleTime = (time: string | number): string => {
    return isSameDay(Date.now(), new Date(time))
        ? Time2StringHHMM(time)
        : isSameWeek(Date.now(), new Date(time))
        ? Time2DayHourString(time)
        : `${Time2StringHHMM(time)} ${Time2DateString(time)}`;
};

export {
    Time2StringHHMM,
    Time2DateString,
    Time2DayHourString,
    isSameDay,
    isSameWeek,
    Time2MessageTitleTime,
};
