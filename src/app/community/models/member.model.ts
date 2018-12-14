import { Country } from 'src/app/shared/models/country.model';
import { District } from 'src/app/shared/models/district.model';
import { State } from 'src/app/shared/models/state.model';

import { AccessLevel } from './access-level.model';

export class Member {
    public member_id: number;
    public name: string;
    public lastname: string;
    public email: string;
    public access_level: AccessLevel;
    public country: Country;
    public district: District;
    public state: State;
    public slic_range_low: number;
    public slic_range_high: number;
}
