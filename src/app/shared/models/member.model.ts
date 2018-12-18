import { Country } from 'src/app/shared/models/country.model';
import { District } from 'src/app/shared/models/district.model';
import { State } from 'src/app/shared/models/state.model';

import { AccessLevel } from '../../community/models/access-level.model';

export class Member {
    public id: number;
    public name: string;
    public lastName: string;
    public email: string;
    public accessLevel: AccessLevel;
    public country: Country;
    public district: District;
    public state: State;
    public slicRangeLow: number;
    public slicRangeHigh: number;
}
