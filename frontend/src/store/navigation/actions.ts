import { createStandardAction } from 'typesafe-actions';
import { NavigationEnum } from './types';

export const setNavigationItem = createStandardAction('@Navigation/SET_NAVIGATION_ITEM')<NavigationEnum>();