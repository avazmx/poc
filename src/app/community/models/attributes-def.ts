export const attributesDef = [
    {
        headerName: 'Country',
        field: 'value',
        cellRenderer: 'selectCountryCell',
        cellRendererParams: { field: 'country' },
        width: 200,
        checkboxSelection: true,
        checkbox: true,
        icons: {
            checkboxChecked: '<span class="far fa-check-square"/>',
            checkboxUnchecked: '<span class="far fa-square"/>',
        }
    }, {
        headerName: 'District',
        field: 'district',
        cellRenderer: 'selectDistrictCell',
        cellRendererParams: { field: 'district' },
        width: 170,
    }, {
        headerName: 'State/Province',
        field: 'state',
        cellRenderer: 'selectStateCell',
        cellRendererParams: { field: 'state' }
    }, {
        headerName: 'SLIC Range Low',
        field: 'slicLow',
        editable: true,
        width: 200,
    }, {
        headerName: 'SLIC Range High',
        field: 'slicHigh',
        editable: true,
        width: 205,
    }, {
        headerName: 'Business Unit',
        field: 'bu',
        width: 175,
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
        width: 90,
    }, {
        headerName: '2DS',
        field: 'twoDs',
        cellRenderer: 'customizedCountryCell',
        cellRendererParams: { field: 'twoDs' },
        width: 90,
    }, {
        headerName: '1DA',
        field: 'oneDs',
        cellRenderer: 'customizedCountryCell',
        cellRendererParams: { field: 'oneDs' },
        width: 90,
    }
];
