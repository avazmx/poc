export const membersDef = [
    {
        headerName: 'Member Name', 
        field: 'member_name',
        cellRenderer: 'customizedCountryCell',
        params: { field: 'country' }
    }, {
        headerName: 'Access Level', 
        field: 'access_level',
        cellRenderer: 'customizedCountryCell',
        params: { field: 'district' }
    }, {
        headerName: 'Country', 
        field: 'country',
        cellRenderer: 'customizedCountryCell',
        params: { field: 'state' }
    }, {
        headerName: 'District', 
        field: 'district',
        // cellRenderer: 'customizedCountryCell'
        editable: true
    }, {
        headerName: 'State/Province', 
        field: 'state',
        // cellRenderer: 'customizedCountryCell'
        editable: true
    }, {
        headerName: 'SLIC Range Low', 
        field: 'slic_range_low',
        cellRenderer: 'customizedCountryCell'
    }, {
        headerName: 'SLIC Range High', 
        field: 'slic_range_high',
        cellRenderer: 'customizedCountryCell'
    }, {
        // editable: true
    }
];
