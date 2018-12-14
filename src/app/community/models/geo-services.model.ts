import { State } from 'src/app/shared/models/state.model';

import { BussinesUnit } from './bussines-unit.model';

export class GeoService {
    public geo_service_id: number;
    public state: State;
    public slic_range_low: number;
    public slic_range_high: number;
    public bussines_unit: BussinesUnit;
    public ground: number;
    public treeds: number;
    public twods: number;
    public oneds: number;
}
