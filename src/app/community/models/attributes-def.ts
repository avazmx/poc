export const attributesDef = [
    {
        headerName: 'Country',
        field: 'country',
        cellRenderer: 'customizedCountryCell',
        cellRendererParams: { field: 'country' },
        width: 170,
    }, {
        headerName: 'District',
        field: 'district',
        cellRenderer: 'customizedCountryCell',
        cellRendererParams: { field: 'district' },
        width: 170,
    }, {
        headerName: 'State/Province',
        field: 'state',
        cellRenderer: 'customizedCountryCell',
        cellRendererParams: { field: 'state' }
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
        // cellRenderer: 'customizedCountryCell'
    }, {
        headerName: 'GND',
        field: 'gnd',
        cellRenderer: 'customizedCountryCell',
        cellRendererParams: { field: 'gnd' },
        width: 100,
    }, {
        headerName: '3DS',
        field: 'threeDs',
        cellRenderer: 'customizedCountryCell',
        cellRendererParams: { field: 'threeDs' },
        width: 100,
    }, {
        headerName: '2DS',
        field: 'twoDs',
        cellRenderer: 'customizedCountryCell',
        cellRendererParams: { field: 'twoDs' },
        width: 100,
    }, {
        headerName: '1DA',
        field: 'oneDs',
        cellRenderer: 'customizedCountryCell',
        cellRendererParams: { field: 'oneDs' },
        width: 100,
        // editable: true
    }
];
