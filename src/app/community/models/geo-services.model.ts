import { Country } from 'src/app/shared/models/country.model';
import { District } from 'src/app/shared/models/district.model';
import { State } from 'src/app/shared/models/state.model';

import { BussinesUnit } from './bussines-unit.model';

export class GeoService {
    public id: number;
    public country: Country;
    public district: District;
    public state: State;
    public slicRangeLow: number;
    public slicRangeHigh: number;
    public bussinesUnit: BussinesUnit;
    public ground: number;
    public threeDs: number;
    public twoDs: number;
    public oneDs: number;
}
