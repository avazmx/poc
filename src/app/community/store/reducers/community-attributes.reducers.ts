import * as CommunityAttributesActions from 'src/app/community/store/actions/community-attributes.actions';
import { Community } from 'src/app/community/models/community.model';
import { State } from '@ngrx/store';

export type Action = CommunityAttributesActions.All;

const defaultState: Community = {
    community_id: 0,
    community_type: {} as CommunityType ,
    name: '',
    description: '',
    geo_services: {} as GeoService[],
    members: {} as Member[],
    governance: {} as GovernanceLevel[]
}

const newState = (state, newDate) => {
    return Object.assign({}, state, newDate)
}

export function communityAttributesReducer(state: Community = defaultState, action: Action){
    console.log(action.type, state)

    switch(action.type){
        /*case CommunityAttributesActions.SHOW_VARIABLES:
            return newState(state, { text: action.payload });*/
        case CommunityAttributesActions.CHANGE_NAME:
            return newState(state, { name: action.payload });

        case CommunityAttributesActions.COMMUNITY_INITIALIZE:
        console.log("new payload ", action.payload);
            return newState(state, { community_id: action.payload.community_id,
                                     name: action.payload.name,
                                     description: action.payload.description})
            //const newState = Object.assign({}, state);
            //newState.community_id = 5;
            //return newState;

        case CommunityAttributesActions.COMMUNITY_ADD:
            return newState(state, {});

        case CommunityAttributesActions.COMMUNITY_EDIT:
            return newState(state, {});

        case CommunityAttributesActions.COMMUNITY_DELETE:
            return newState(state, {});

        default:
            return state;
    }
}
