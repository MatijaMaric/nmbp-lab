
import * as navigation from './actions';
import { ActionType } from 'typesafe-actions';

export type NavigationAction = ActionType<typeof navigation>;

export enum NavigationEnum {
    Add,
    Search,
    Analysis
}

export interface NavigationState {
    selectedItem: NavigationEnum;
}