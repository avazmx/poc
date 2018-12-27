import { Action } from '@ngrx/store';
import { Community } from 'src/app/community/models/community.model';

export const SHOW_VARIABLES = '[CommunityAttributes]SHOW_VARIABLES';
export const CHANGE_NAME = '[CommunityAttributes]CHANGE_NAME';

export const COMMUNITY_INITIALIZE = '[CommunityAttributes]COMMUNITY_INITIALIZE';
export const COMMUNITY_ADD = '[CommunityAttributes]COMMUNITY_ADD';
export const COMMUNITY_EDIT = '[CommunityAttributes]COMMUNITY_EDIT';
export const COMMUNITY_DELETE = '[CommunityAttributes]COMMUNITY_DELETE';

export const ADD_ATTRIBUTES = '[CommunityAttributes]ADD_ATTRIBUTES';
export const ADD_MEMBERS = '[CommunityAttributes]ADD_MEMBERS';
export const ADD_GOVERNANCE = '[CommunityAttributes]ADD_GOVERNANCE';
export const ADD_COMMUNITY_OBJECT_ATTRIBUTES = '[CommunityAttributes]ADD_COMMUNITY_OBJECT_ATTRIBUTES';

export const FETCH_COMMUNITIES = '[CommunityAttributes]FETCH_COMMUNITIES';
export const SET_COMMUNITIES = 'SET_COMMUNITIES';
export const STORE_COMMUNITIES = 'STORE_COMMUNITIES';
export const ACTIVE_TAB = '[activeTab]ACTIVE_TAB';
export const ACTIVE_ROW = '[activeRow]ACTIVE_ROW';

export const ADD_ROW_VALIDATORS = '[addRowValidators]ADD_ROW_VALIDATORS';



// MAIN ACTIONS
export class AddAttributes implements Action {
    readonly type = ADD_ATTRIBUTES;
    constructor(public payload: Community) { }
}

export class AddMembers implements Action {
    readonly type = ADD_MEMBERS;
    constructor(public payload: Community) { }
}

export class AddGovernance implements Action {
    readonly type = ADD_GOVERNANCE;
    constructor(public payload: Community) { }
}

export class AddCommunityObjectAttributes implements Action {
    readonly type = ADD_COMMUNITY_OBJECT_ATTRIBUTES;
    constructor(public payload: Community) { }
}

export class AddRowsValidators implements Action {
    readonly type = ADD_ROW_VALIDATORS;
    constructor(public payload: Community) { }
}

// EXTRA ACTIONS
export class ShowAttributes implements Action {
    readonly type = SHOW_VARIABLES;
}

export class ChangeName implements Action {
    readonly type = CHANGE_NAME;
    constructor(public payload: string) { }
}

export class CommunityInitialize implements Action {
    readonly type = COMMUNITY_INITIALIZE;
    constructor(public payload: Community) { console.log('action payload ahh ', payload); }
}

export class CommunityAdd implements Action {
    readonly type = COMMUNITY_ADD;
    constructor(public payload: Community) { }
}

export class CommunityEdit implements Action {
    readonly type = COMMUNITY_EDIT;
    constructor(public payload: Community) { }
}

export class CommunityDelete implements Action {
    readonly type = COMMUNITY_DELETE;
    constructor() { }
}

export class FetchCommunities implements Action {
    readonly type = FETCH_COMMUNITIES;

}

export class SetCommunities implements Action {
    readonly type = SET_COMMUNITIES;

}

export class StoreCommunities implements Action {
    readonly type = STORE_COMMUNITIES;
}


export class ActiveTab implements Action {
    readonly type = ACTIVE_TAB;
    constructor(public payload: number) { }
}

export class ActiveRow implements Action {
    readonly type = ACTIVE_ROW;
    constructor(public payload: number) { }
}

export type CommunityActions = ShowAttributes
    | ChangeName
    | CommunityInitialize
    | CommunityAdd
    | CommunityEdit
    | CommunityDelete
    | AddAttributes
    | AddMembers
    | AddGovernance
    | AddCommunityObjectAttributes
    | FetchCommunities
    | SetCommunities
    | StoreCommunities
    | ActiveTab
    | ActiveRow
    | AddRowsValidators;
