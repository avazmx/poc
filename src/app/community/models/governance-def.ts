export const governanceDef = [
    {
        headerName: 'Country',
        field: 'country',
        width: 120
    }, {
        headerName: 'District',
        field: 'district',
        width: 120
    }, {
        headerName: 'State',
        field: 'state',
        width: 120
    }, {
        headerName: 'SLIC Range Low',
        field: 'slicRangeLow',
        width: 170
    }, {
        headerName: 'SLIC Range High',
        field: 'slicRangeHigh',
        width: 170,
    }, {
        headerName: 'Level 1 Approver',
        field: 'levelApproverOne',
        cellRenderer: 'selectMemberNameCell'
    }, {
        headerName: 'Alt Level 1 Approver',
        field: 'atllevelApproverOne',
        cellRenderer: 'selectMemberNameCell'
    }, {
        headerName: 'Level 2 Approver',
        field: 'levelApproverTwo',
        cellRenderer: 'selectMemberNameCell'
    },
    {
        headerName: 'Alt Level 2 Approver',
        field: 'atllevelApproverTwo',
        cellRenderer: 'selectMemberNameCell'
    }, {
        headerName: 'Select',
        field: 'checkbox',
        checkboxSelection: true,
        icons: {
            checkboxChecked: '<span class="far fa-check-square"/>',
            checkboxUnchecked: `<span class="far fa-square"></span>`,
        },
        width: 80
    }
];
