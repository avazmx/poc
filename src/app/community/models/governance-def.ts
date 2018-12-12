export const governanceDef = [
    {
        headerName: 'Country', 
        field: 'country',
        cellRenderer: 'customizedCountryCell',
        params: { field: 'country' }
    }, {
        headerName: 'District', 
        field: 'district',
        cellRenderer: 'customizedCountryCell',
        params: { field: 'district' }
    }, {
        headerName: 'State', 
        field: 'state',
        cellRenderer: 'customizedCountryCell',
        params: { field: 'state' }
    }, {
        headerName: 'SLIC Range Low', 
        field: 'slicLow',
        // cellRenderer: 'customizedCountryCell'
        editable: true
    }, {
        headerName: 'SLIC Range High', 
        field: 'slicHigh',
        // cellRenderer: 'customizedCountryCell'
        editable: true
    }, {
        headerName: 'Level 1 Approver', 
        field: 'lvl1approver',
        cellRenderer: 'customizedCountryCell'
    }, {
        headerName: 'Alt Level 1 Approver', 
        field: 'altlvl1approver',
        cellRenderer: 'customizedCountryCell'
    }, {
        headerName: 'Level 2 Approver', 
        field: 'lvl2approver',
        // editable: true
    }, {
        headerName: 'Alt Level 2 Approver', 
        field: 'altlvl2approver',
    }
];
