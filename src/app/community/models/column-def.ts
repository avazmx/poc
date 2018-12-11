export const columnDef = [
    {
        headerName: 'Country',
        field: 'country',
        cellRenderer: 'customizedCountryCell',
            params: { field: 'country' }
    }, {
        headerName: 'District',
        field: 'district',
        cellRenderer: 'customizedCountryCell'
    }, {
        headerName: 'State/Province',
        field: 'state',
        cellRenderer: 'customizedCountryCell'
    }, {
        headerName: 'SLIC Range Low',
        field: 'slicLow',
        editable: true
    }, {
        headerName: 'SLIC Range High',
        field: 'slicHigh',
        editable: true
    }, {
        headerName: 'Business Unit',
        field: 'bu',
        cellRenderer: 'customizedCountryCell'
    }, {
        headerName: 'GND',
        field: 'gnd',
        cellRenderer: 'customizedCountryCell'
    }, {
        headerName: '3DS',
        field: 'three'
    }, {
        headerName: '2DS',
        field: 'two'
    }, {
        headerName: '1DA',
        field: 'one',
        // editable: true
    }
];
