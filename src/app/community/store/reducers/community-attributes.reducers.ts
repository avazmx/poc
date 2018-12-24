import { Community } from 'src/app/community/models/community.model';
import * as CommunityAttributesActions from 'src/app/community/store/actions/community-attributes.actions';
import * as fromApp from '../../../store/reducers/app.reducers';
import { GeoService } from '../../models/geo-services.model';

const newState = (state, newDate) => {
  return Object.assign({}, state, newDate);
};

export interface FeatureState extends fromApp.AppState {
  community: State;
}

export interface State {
  community: Community;
}

const initialCommunity = new Community();
initialCommunity.activeTab = 1;
initialCommunity.geoServices = [];

const initialState: State = {
  community: {
    activeRow: 0,
    activeTab: 1,
    attributes: null,
    communityId: 0,
    communityType: null,
    description: '',
    geoServices: [],
    governance: [],
    gridValidator: [],
    members: [],
    name: ''
  }
};

export function communityReducer(
  state = initialState,
  action: CommunityAttributesActions.CommunityActions
) {
  switch (action.type) {
    // MAIN CASES
    case CommunityAttributesActions.ADD_ATTRIBUTES:
      // return newState(state, {
      //   communityId: action.payload.communityId,
      //   name: action.payload.name,
      //   description: action.payload.description,
      //   geoServices: action.payload.geoServices,
      //   communityType: action.payload.communityType
      // });
      return {
        ...state,
        communityId: action.payload.communityId,
        name: action.payload.name,
        description: action.payload.description,
        communityType: action.payload.communityType
      };
    case CommunityAttributesActions.ADD_GEOSERVICE:
      console.log('ADD_GEOSERVICE: ', state);
      return {
        ...state,
        community: { geoServices: [action.payload] }
      };

    case CommunityAttributesActions.ADD_ROW_VALIDATORS:
      return newState(state.community, { gridValidator: action.payload });

    case CommunityAttributesActions.ADD_MEMBERS:
      return newState(state, { members: action.payload.members });

    case CommunityAttributesActions.ADD_GOVERNANCE:
      return newState(state.community, {
        governance: action.payload.governance
      });

    case CommunityAttributesActions.ADD_COMMUNITY_OBJECT_ATTRIBUTES:
      return newState(state.community, {
        attributes: action.payload.attributes
      });

    // EXTRA CASES
    case CommunityAttributesActions.CHANGE_NAME:
      return newState(state.community, { name: action.payload });

    case CommunityAttributesActions.COMMUNITY_INITIALIZE:
      return newState(state.community, {
        communityId: action.payload.communityId,
        name: action.payload.name,
        description: action.payload.description
      });

    case CommunityAttributesActions.COMMUNITY_ADD:
      return newState(state, {});

    case CommunityAttributesActions.COMMUNITY_EDIT:
      return newState(state, {});

    case CommunityAttributesActions.COMMUNITY_DELETE:
      return newState(state.community, initialState);

    case CommunityAttributesActions.ACTIVE_TAB:
      console.log('ACTIVE_TAB ', state);
      return {
        ...state,
        community: { activeTab: action.payload }
      };

    case CommunityAttributesActions.ACTIVE_ROW:
      console.log('ACTIVE_ROW ', state);
      return {
        ...state,
        community: { activeRow: action.payload.activeRow }
      };
    // return newState(state.community, { activeRow: action.payload.activeRow });

    default:
      return state;
  }
}
