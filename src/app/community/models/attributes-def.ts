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
        editable: true,
        width: 210,
    }, {
        headerName: 'SLIC Range High',
        field: 'slicHigh',
        editable: true,
        width: 215,
        filter: 'agNumberColumnFilter'
    }, {
        headerName: 'Business Unit',
        field: 'businessUnit',
        cellRenderer: 'selectBusinessUnitCell',
        cellRendererParams: { field: 'businessUnit' },
        width: 180,
    }, {
        headerName: 'GND',
        field: 'ground',
        cellRenderer: 'groundCell',
        cellRendererParams: { field: 'ground' },
        width: 100,
    }, {
        headerName: '3DS',
        field: 'three',
        cellRenderer: 'threeDsCell',
        cellRendererParams: { field: 'three' },
        width: 100,
    }, {
        headerName: '2DS',
        field: 'two',
        cellRenderer: 'twoDsCell',
        cellRendererParams: { field: 'two' },
        width: 100,
    }, {
        headerName: '1DA',
        field: 'one',
        cellRenderer: 'oneDaCell',
        cellRendererParams: { field: 'one' },
        width: 93,
    }, {
        headerName: '*',
        field: 'checkbox',
        checkboxSelection: true,
        icons: {
            checkboxChecked: '<span class="far fa-check-square"/>',
            checkboxUnchecked: `<span class="far fa-square"></span>`,
        },
        width: 80
    },
];
