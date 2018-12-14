import { CommunityType } from './community-type.model';
import { GeoService } from './geo-services.model';
import { GovernanceLevel } from './governance-level.model';
import { Member } from './member.model';

export class Community {
    public community_id: number;
    public community_type: CommunityType;
    public name: string;
    public description: string;
    public geo_services?: GeoService[];
    public members: Member[];
    public governance: GovernanceLevel[];
    public attributes?: any;
}
