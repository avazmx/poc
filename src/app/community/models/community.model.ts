export interface Community {
    communityId: number;
    communityType: CommunityType;
    name: string;
    description: string;
    geoServices?: GeoService[];
    members: Member[];
    governance: GovernanceLevel[];
    attributes?: any;
}
