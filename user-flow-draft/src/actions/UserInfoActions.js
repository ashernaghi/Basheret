import { USER_INFO_UPDATE } from './types';
export const userInfoUpdate = (category, answer) => ({
    type: USER_INFO_UPDATE,
    category,
    answer
});