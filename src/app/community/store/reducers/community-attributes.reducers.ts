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
    community: {
        communityId: 0,
        communityType: null,
        name: '',
        description: '',
        geoServices: null,
        members: null,
        governance: null,
        attributes: null,
        activeTab: 1,
        activeRow: -1
    }
};

export function communityReducer(state = initialState, action: CommunityAttributesActions.CommunityActions) {
    switch (action.type) {
        // MAIN CASES
        case CommunityAttributesActions.ADD_ATTRIBUTES:
            return newState(state, {
                communityId: action.payload.communityId,
                name: action.payload.name,
                description: action.payload.description,
                geoServices: action.payload.geoServices,
                communityType: action.payload.communityType
            });
        case CommunityAttributesActions.ADD_ROW_VALIDATORS:
            return newState(state, { gridValidator: action.payload });

        case CommunityAttributesActions.ADD_MEMBERS:
            return newState(state, { members: action.payload.members });

        case CommunityAttributesActions.ADD_GOVERNANCE:
            return newState(state, { governance: action.payload.governance });

        case CommunityAttributesActions.ADD_COMMUNITY_OBJECT_ATTRIBUTES:
            return newState(state, { attributes: action.payload.attributes });

        // EXTRA CASES
        case CommunityAttributesActions.CHANGE_NAME:
            return newState(state, { name: action.payload });

        case CommunityAttributesActions.COMMUNITY_INITIALIZE:
            return newState(state, {
                communityId: action.payload.communityId,
                name: action.payload.name,
                description: action.payload.description
            });

        case CommunityAttributesActions.COMMUNITY_ADD:
            return newState(state, {});

        case CommunityAttributesActions.COMMUNITY_EDIT:
            return newState(state, {});

        case CommunityAttributesActions.COMMUNITY_DELETE:
            state = initialState;
            return state;

        case CommunityAttributesActions.ACTIVE_TAB:
            return newState(state, { activeTab: action.payload });

        case CommunityAttributesActions.ACTIVE_ROW:
            return newState(state, { activeRow: action.payload });

        default:
            return state;
    }
}
