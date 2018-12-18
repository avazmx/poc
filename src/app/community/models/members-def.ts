export const membersDef = [
    {
        headerName: 'Member Name',
        field: 'memberName',
        cellRenderer: 'selectMemberNameCell',
        cellRendererParams: { field: 'memberName' },
        width: 170,
        checkboxSelection: true,
        checkbox: true,
        icons: {
            checkboxChecked: '<span class="far fa-check-square"/>',
            checkboxUnchecked: '<span class="far fa-square"/>',
        }
    }, {
        headerName: 'Access Level',
        field: 'accessLevel',
        cellRenderer: 'selectAccessLevelCell',
        cellRendererParams: { field: 'accessLevel' },
        width: 150,
    }, {
        headerName: 'Country',
        field: 'country',
        cellRenderer: 'selectCountryCell',
        cellRendererParams: { field: 'country' },
        width: 200,
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
        field: 'slicRangeLow',
        editable: true,
        width: 200,
    }, {
        headerName: 'SLIC Range High',
        field: 'slicRangeHigh',
        editable: true,
        width: 205,
    }
];
