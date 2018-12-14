export const governanceDef = [
    {
        headerName: 'Country',
        field: 'country',
        cellRenderer: 'customizedCountryCell',
        cellRendererParams: { field: 'country' },
        width: 120
    }, {
        headerName: 'District',
        field: 'district',
        cellRenderer: 'customizedCountryCell',
        cellRendererParams: { field: 'district' },
        width: 120
    }, {
        headerName: 'State',
        field: 'state',
        cellRenderer: 'customizedCountryCell',
        cellRendererParams: { field: 'state' },
        width: 120
    }, {
        headerName: 'SLIC Range Low',
        field: 'slicLow',
        // cellRenderer: 'customizedCountryCell',
        editable: true,
        width: 170
    }, {
        headerName: 'SLIC Range High',
        field: 'slicHigh',
        // cellRenderer: 'customizedCountryCell'
        editable: true,
        width: 170,
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
