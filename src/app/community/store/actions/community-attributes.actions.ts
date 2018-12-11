import { Action } from '@ngrx/store';

export const SHOW_VARIABLES = '[CommunityAttributes]SHOW_VARIABLES';
export const CHANGE_NAME = '[CommunityAttributes]CHANGE_NAME';

export class ShowAttributes implements Action {
    readonly type =SHOW_VARIABLES;
}

export class ChangeName implements Action {
    readonly type = CHANGE_NAME;
    constructor(public payload: string){}
}

export type All =
ShowAttributes
| ChangeName;