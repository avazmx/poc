export const membersDef = [
    {
        headerName: 'Member Name',
        field: 'member_name',
        cellRenderer: 'customizedCountryCell',
        cellRendererParams: { field: 'member_name' },
        width: 170,
    }, {
        headerName: 'Access Level',
        field: 'access_level',
        cellRenderer: 'customizedCountryCell',
        cellRendererParams: { field: 'access_level' },
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
        field: 'slic_range_low',
        cellRenderer: 'customizedCountryCell',
        width: 170,
    }, {
        headerName: 'SLIC Range High',
        field: 'slic_range_high',
        cellRenderer: 'customizedCountryCell'
        // editable: true
    }
];
