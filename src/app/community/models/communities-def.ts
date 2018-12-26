export const communitiesDef = [
    {
        headerName: 'Name',
        field: 'name',
        width: 300
    }, {
        headerName: 'Description',
        field: 'description',
        width: 300
    }, {
        headerName: 'More info',
        field: 'checkbox',
        checkboxSelection: true,
        icons: {
            // checkboxChecked: '<span> <strong>Show less</strong> &nbsp;<span class="fas fa-minus"/></span>',
            checkboxChecked: '<span>&nbsp; <span class="fas fa-minus"/></span>',
            checkboxUnchecked: `<span>&nbsp; <span class="fas fa-plus"/></span>`
        },
        width: 400
    }
];
