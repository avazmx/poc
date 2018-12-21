import { GovernanceLevel } from './governance-level.model';
import { Country } from 'src/app/shared/models/country.model';
import { District } from 'src/app/shared/models/district.model';
import { State } from 'src/app/shared/models/state.model';
import { Member } from 'src/app/shared/models/member.model';

export class Governance {
    public id: number;
    public country: Country;
    public district: District;
    public state: State;
    public slicRangeLow: number;
    public slicRangeHigh: number;
    public levelOneApprover: Member;
    public altlevelOneApprover: Member;
    public levelOTwoApprover: Member;
    public atlLevelTwoApprover: Member;
    public governanceLevel: GovernanceLevel;
}
