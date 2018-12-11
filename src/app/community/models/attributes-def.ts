export const attributesDef = [
    {
        headerName: 'Country',
        field: 'country',
        cellRenderer: 'customizedCountryCell',
        params: { field: 'country' }
    }, {
        headerName: 'District',
        field: 'district',
        cellRenderer: 'customizedCountryCell',
        params: { field: 'district' }
    }, {
        headerName: 'State/Province',
        field: 'state',
        cellRenderer: 'customizedCountryCell',
        params: { field: 'state' }
    }, {
        headerName: 'SLIC Range Low',
        field: 'slicLow',
<<<<<<< HEAD:src/app/community/models/attributes-def.ts
        // cellRenderer: 'customizedCountryCell'
=======
>>>>>>> c1db2c205f1b47b525f52e1bf850fe5b5226ab1c:src/app/community/models/column-def.ts
        editable: true
    }, {
        headerName: 'SLIC Range High',
        field: 'slicHigh',
<<<<<<< HEAD:src/app/community/models/attributes-def.ts
        // cellRenderer: 'customizedCountryCell'
=======
>>>>>>> c1db2c205f1b47b525f52e1bf850fe5b5226ab1c:src/app/community/models/column-def.ts
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
