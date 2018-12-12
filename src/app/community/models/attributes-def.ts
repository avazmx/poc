export const attributesDef = [
    {
        headerName: 'Country',
        field: 'country',
        cellRenderer: 'customizedCountryCell',
        params: { field: 'country' },
        width: 170,
    }, {
        headerName: 'District',
        field: 'district',
        cellRenderer: 'customizedCountryCell',
        params: { field: 'district' },
        width: 170,
    }, {
        headerName: 'State/Province',
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
        headerName: 'Business Unit',
        field: 'bu',
        cellRenderer: 'customizedCountryCell'
    }, {
        headerName: 'GND',
        field: 'gnd',
        cellRenderer: 'customizedCountryCell',
        width: 100,
    }, {
        headerName: '3DS',
        field: 'three',
        width: 100,
    }, {
        headerName: '2DS',
        field: 'two',
        width: 100,
    }, {
        headerName: '1DA',
        field: 'one',
        width: 100,
        // editable: true
    }
];
