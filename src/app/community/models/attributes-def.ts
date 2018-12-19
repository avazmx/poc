export const attributesDef = [
    {
        headerName: 'Country',
        field: 'country',
        cellRenderer: 'selectCountryCell',
        cellRendererParams: { field: 'country' },
        width: 190,
    }, {
        headerName: 'District',
        field: 'district',
        cellRenderer: 'selectDistrictCell',
        cellRendererParams: { field: 'district' },
        width: 160,
    }, {
        headerName: 'State/Province',
        field: 'state',
        cellRenderer: 'selectStateCell',
        cellRendererParams: { field: 'state' },
        width: 190,
    }, {
        headerName: 'SLIC Range Low',
        field: 'slicLow',
        cellRenderer: 'customizedCountryCell',
        cellRendererParams: { field: 'slicLow' },
        width: 210,
    }, {
        headerName: 'SLIC Range High',
        field: 'slicHigh',
        cellRenderer: 'customizedCountryCell',
        cellRendererParams: { field: 'slicLow' },
        width: 215,
    }, {
        headerName: 'Business Unit',
        field: 'businessUnit',
        cellRenderer: 'selectBusinessUnitCell',
        cellRendererParams: { field: 'businessUnit' },
        width: 180,
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
        width: 93,
    }, {
        headerName: '',
        field: 'checkbox',
        checkboxSelection: true,
        icons: {
            checkboxChecked: '<span class="far fa-check-square"/>',
            checkboxUnchecked: `<span class="far fa-square"></span>`,
        },
        width: 55
    },
];
