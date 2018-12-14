import { ActionReducerMap } from '@ngrx/store';

import * as communityReducers from '../../community/store/reducers/community-attributes.reducers';


export interface AppState {
    community: communityReducers.State;
}

export const reducers: ActionReducerMap<AppState> = {
    community: communityReducers.communityAttributesReducer
};
