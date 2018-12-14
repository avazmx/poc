export const membersDef = [
    {
        headerName: 'Member Name',
        field: 'memberName',
        cellRenderer: 'customizedCountryCell',
        cellRendererParams: { field: 'memberName' },
        width: 170,
    }, {
        headerName: 'Access Level',
        field: 'accessLevel',
        cellRenderer: 'customizedCountryCell',
        cellRendererParams: { field: 'accessLevel' },
        width: 150,
    }, {
        headerName: 'Country',
        field: 'country',
        cellRenderer: 'customizedCountryCell',
        cellRendererParams: { field: 'country' },
        width: 120,
    }, {
        headerName: 'District',
        field: 'district',
        // cellRenderer: 'customizedCountryCell'
        editable: true,
        width: 120,
    }, {
        headerName: 'State/Province',
        field: 'state',
        // cellRenderer: 'customizedCountryCell'
        editable: true,
        width: 160,
    }, {
        headerName: 'SLIC Range Low',
        field: 'slicRangeLow',
        cellRenderer: 'customizedCountryCell',
        width: 170,
    }, {
        headerName: 'SLIC Range High',
        field: 'slicRangeHigh',
        cellRenderer: 'customizedCountryCell'
        // editable: true
    }
];
