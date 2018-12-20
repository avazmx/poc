export const governanceDef = [
    {
        headerName: 'Country',
        field: 'country',
        width: 120
    }, {
        headerName: 'District',
        field: 'district',
        width: 120
    }, {
        headerName: 'State',
        field: 'state',
        width: 120
    }, {
        headerName: 'SLIC Range Low',
        field: 'slicRangeLow',
        width: 170
    }, {
        headerName: 'SLIC Range High',
        field: 'slicRangeHigh',
        width: 170,
    }, {
        headerName: 'Level 1 Approver',
        field: 'levelApproverOne',
        cellRenderer: 'customizedCountryCell'
    }, {
        headerName: 'Level 2 Approver',
        field: 'lvl2approver',
    },
    {
        headerName: 'Alt Level 2 Approver',
        field: 'levelApproverTwo',
        cellRenderer: 'customizedCountryCell'
    }, {
        headerName: 'Alt Level 2 Approver',
        field: 'altlvl2approver',
    }
];
