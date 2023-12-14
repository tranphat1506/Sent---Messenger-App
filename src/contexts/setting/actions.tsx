// import { configLanguage } from '@/languages/';
import {
    ActionConstant,
    // CHANGE_LANGUAGE,
    CHANGE_APPEARANCE,
} from './constants';
export type ActionPayload = ChangeLanguagePayload | ChangeAppearancePayload;
export interface ChangeLanguagePayload {
    type: ActionConstant;
    payload: string;
}
export interface ChangeAppearancePayload {
    type: ActionConstant;
    payload: 'device' | 'light' | 'dark';
}
// export const changeLanguage = (lang: string): ChangeLanguagePayload => {
//     const { status } = configLanguage(lang);
//     if (status === 'fail') lang = 'en';
//     window.localStorage.setItem('@language', lang);
//     return {
//         type: CHANGE_LANGUAGE,
//         payload: lang,
//     };
// };
const isDarkMode = () =>
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
export const changeAppearance = (
    mode: 'device' | 'light' | 'dark',
): ChangeAppearancePayload => {
    // check if not in type
    if (mode !== 'device' && mode !== 'light' && mode !== 'dark') mode = 'dark';
    // update to localstorage
    window.localStorage.setItem('@appearance', mode);

    // clear previous appearance
    document.querySelector('html')?.classList.remove('dark');
    document.querySelector('html')?.classList.remove('light');

    // change appearance
    if (mode === 'device' && isDarkMode())
        document.querySelector('html')?.classList.add('dark');
    else if (mode === 'device' && !isDarkMode())
        document.querySelector('html')?.classList.add('light');
    else document.querySelector('html')?.classList.add(mode);

    // return state
    return {
        type: CHANGE_APPEARANCE,
        payload: mode,
    };
};
