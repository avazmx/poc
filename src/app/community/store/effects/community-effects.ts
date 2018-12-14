import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import * as fromApp from '../../../store/reducers/app.reducers';


import * as communityActions from '../actions/community-attributes.actions';

import { Community } from '../../models/community.model';
import * as fromCommunityReducer from '../reducers/community-attributes.reducers';

export interface FeatureState extends fromApp.AppState {
    community: State;
}

export interface State {
    community: Community;
}

@Injectable()
export class CommunityEffects {
    @Effect()
    recipeFetch = this.actions$
        .ofType(communityActions.FETCH_COMMUNITIES)
        .pipe(switchMap((action: communityActions.FetchCommunities) => {
            return this.httpClient.get<Community[]>('https://ng-recipe-book-3adbb.firebaseio.com/recipes.json', {
                observe: 'body',
                responseType: 'json'
            });
        })).pipe(
            map(
                (recipes) => {

                    for (const recipe of recipes) {
                        if (!recipe['ingredients']) {
                            recipe['ingredients'] = [];
                        }
                    }
                    return {
                        type: communityActions.SET_COMMUNITIES,
                        payload: recipes
                    };
                }
            )
        );

    @Effect({ dispatch: false })
    recipeStore = this.actions$
        .ofType(communityActions.STORE_COMMUNITIES)
        .pipe(withLatestFrom(this.store.select('recipes')))
        .pipe(switchMap(([action, state]) => {
            const req = new HttpRequest('PUT', 'https://ng-recipe-book-3adbb.firebaseio.com/recipes.json', state.community,
                { reportProgress: true });
            return this.httpClient.request(req);
        }));

    constructor(private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromCommunityReducer.FeatureState>) { }
}
