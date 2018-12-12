import { Action } from '@ngrx/store';
import { Community } from 'src/app/community/models/community.model';
import { CommunityService } from '../../services/community.service';

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

// MAIN ACTIONS
export class AddAttributes implements Action {
    readonly type = ADD_ATTRIBUTES;
    constructor(public payload: Community){}
}

export class AddMembers implements Action {
    readonly type = ADD_MEMBERS;
    constructor(public payload: Community){}
}

export class AddGovernance implements Action {
    readonly type = ADD_GOVERNANCE;
    constructor(public payload: Community){}
}

export class AddCommunityObjectAttributes implements Action {
    readonly type = ADD_COMMUNITY_OBJECT_ATTRIBUTES;
    constructor(public payload: Community){}
}

//EXTRA ACTIONS
export class ShowAttributes implements Action {
    readonly type = SHOW_VARIABLES;
}

export class ChangeName implements Action {
    readonly type = CHANGE_NAME;
    constructor(public payload: string){}
}

export class CommunityInitialize implements Action {
    readonly type = COMMUNITY_INITIALIZE;
    constructor(public payload: Community){console.log("action payload ahh ",payload)}
}

export class CommunityAdd implements Action {
    readonly type = COMMUNITY_ADD;
    constructor(public payload: Community){}
}

export class CommunityEdit implements Action {
    readonly type = COMMUNITY_EDIT;
    constructor(public payload: Community){}
}

export class CommunityDelete implements Action {
    readonly type = COMMUNITY_DELETE;
    constructor(public payload: Community){}
}

export type All =
ShowAttributes
| ChangeName
| CommunityInitialize
| CommunityAdd
| CommunityEdit
| CommunityDelete
| AddAttributes
| AddMembers
| AddGovernance
| AddCommunityObjectAttributes;
