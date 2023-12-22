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

const Time2StringPastTime = (
    time: string | number,
): {
    message: string;
    time: string | number;
    symbol: 'minutes' | 'hours' | 'days' | 'weeks' | 'years';
} => {
    const currentTime = Date.now();
    const pastTime = new Date(time).getTime();
    const leftTimeInMilli = currentTime - pastTime;
    if (leftTimeInMilli < 60 * 1000)
        return {
            message: 'less-than-minute',
            time: Math.round(leftTimeInMilli / 60000),
            symbol: 'minutes',
        };
    if (leftTimeInMilli < 60 * 60 * 1000)
        return {
            message: 'less-than-hour',
            time: Math.round(leftTimeInMilli / 60000),
            symbol: 'minutes',
        };
    if (leftTimeInMilli < 24 * 60 * 60 * 1000)
        return {
            message: 'less-than-day',
            time: Math.round(leftTimeInMilli / (60 * 60 * 1000)),
            symbol: 'hours',
        };
    if (leftTimeInMilli < 7 * 24 * 60 * 60 * 1000)
        return {
            message: 'less-than-week',
            time: Math.round(leftTimeInMilli / (24 * 60 * 60 * 1000)),
            symbol: 'days',
        };
    if (leftTimeInMilli < 52.177457 * 7 * 24 * 60 * 60 * 1000)
        return {
            message: 'less-than-year',
            time: Math.round(leftTimeInMilli / (7 * 24 * 60 * 60 * 1000)),
            symbol: 'weeks',
        };
    return {
        message: 'more-than-year',
        time: Math.round(
            leftTimeInMilli / (52.177457 * 7 * 24 * 60 * 60 * 1000),
        ),
        symbol: 'years',
    };
};

const symbolString2Vietnamese = (symbol: string | undefined): string => {
    switch (symbol) {
        case 'seconds':
        case 'second':
            return 'giây';
        case 'minutes':
        case 'minute':
            return 'phút';
        case 'hours':
        case 'hour':
            return 'giờ';
        case 'days':
        case 'days':
            return 'ngày';
        case 'weeks':
        case 'week':
            return 'tuần';
        case 'years':
        case 'year':
            return 'năm';
        default:
            return 'not_found';
    }
};

export {
    Time2StringHHMM,
    Time2DateString,
    Time2DayHourString,
    isSameDay,
    isSameWeek,
    Time2MessageTitleTime,
    Time2StringPastTime,
    symbolString2Vietnamese,
};
