import { Community } from 'src/app/community/models/community.model';
import * as CommunityAttributesActions from 'src/app/community/store/actions/community-attributes.actions';
import * as fromApp from '../../../store/reducers/app.reducers';

const newState = (state, newDate) => {
    return Object.assign({}, state, newDate);
};

export interface FeatureState extends fromApp.AppState {
    recipes: State;
}

export interface State {
    community: Community;
}

const initialState: State = {
    community: new Community()
};

export function communityReducer(state = initialState, action: CommunityAttributesActions.CommunityActions) {
    switch (action.type) {
        // MAIN CASES
        case CommunityAttributesActions.ADD_ATTRIBUTES:
            return newState(state, {
                community_id: action.payload.community_id,
                name: action.payload.name,
                description: action.payload.description,
                geo_services: action.payload.geo_services,
                community_type: action.payload.community_type
            });

        case CommunityAttributesActions.ADD_MEMBERS:
            return newState(state, { members: action.payload.members });

        case CommunityAttributesActions.ADD_GOVERNANCE:
            return newState(state, { governance: action.payload.members });

        case CommunityAttributesActions.ADD_COMMUNITY_OBJECT_ATTRIBUTES:
            return newState(state, { attributes: action.payload.attributes });

        // EXTRA CASES
        case CommunityAttributesActions.CHANGE_NAME:
            return newState(state, { name: action.payload });

        case CommunityAttributesActions.COMMUNITY_INITIALIZE:
            return newState(state, {
                community_id: action.payload.community_id,
                name: action.payload.name,
                description: action.payload.description
            });

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
