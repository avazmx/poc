interface Member {
    member_id: number;
    name: string;
    lastname: string;
    email: string;
    access_level: AccessLevel;
    country: Country;
    district: District;
    state: State;
    slic_range_low: number;
    slic_range_high: number;
}