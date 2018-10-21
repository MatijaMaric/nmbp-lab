import { Reducer } from "redux";
import { NavigationState, NavigationEnum, NavigationAction } from "./types";
import { getType } from 'typesafe-actions';
import { setNavigationItem } from './actions';

const initialState: NavigationState = {
  selectedItem: NavigationEnum.Search
};

const reducer: Reducer<NavigationState> = (
  state = initialState,
  action: NavigationAction
) => {
    switch (action.type) {
        case getType(setNavigationItem): {
            return {
                ...state,
                selectedItem: action.payload
            }
        }
    }
    return state;
};


export { reducer as NavigationReducer }