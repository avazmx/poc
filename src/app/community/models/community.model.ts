interface Community {
    community_id: number;
    community_type: CommunityType;
    name: string;
    description: string;
    geo_services?: GeoService[];
    members: Member[];
    governance: GovernanceLevel[];   
}