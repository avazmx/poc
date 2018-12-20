import { Country } from 'src/app/shared/models/country.model';
import { District } from 'src/app/shared/models/district.model';
import { State } from 'src/app/shared/models/state.model';
import { BusinessUnit } from './business-unit.model';

export class GeoService {
    public id: number;
    public country: Country;
    public district: District;
    public state: State;
    public slicRangeLow: number;
    public slicRangeHigh: number;
    public businessUnit: BusinessUnit;
    public ground: boolean;
    public three: boolean;
    public two: boolean;
    public one: boolean;
}
