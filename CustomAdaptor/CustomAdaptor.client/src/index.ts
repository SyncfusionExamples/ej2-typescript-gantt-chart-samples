
import { DataManager } from '@syncfusion/ej2-data';
import { CustomAdaptor } from './CustomAdaptor';
import { Gantt, Edit, Selection, Toolbar, ContextMenu, Filter, Sort, Reorder, Resize, ColumnMenu, VirtualScroll, RowDD } from '@syncfusion/ej2-gantt';

// Create DataManager with CustomAdaptor
let data: DataManager = new DataManager({
    url: 'https://localhost:7258/odata/GanttTasks', // Here 7258 represents the port number.
    adaptor: new CustomAdaptor(),
    key: 'TaskID',
    crossDomain: true
});

Gantt.Inject(Edit, Selection, Toolbar, ContextMenu, Filter, Sort, Reorder, Resize, ColumnMenu, VirtualScroll, RowDD);

let resourceFields: object = {
    id: 'resourceId',
    name: 'resourceName',
    unit: 'resourceUnit',
    group: 'resourceGroup'
};

let resources: object[] = [
    { resourceId: 1, resourceName: 'Martin Tamer' },
    { resourceId: 2, resourceName: 'Rose Fuller' },
    { resourceId: 3, resourceName: 'Margaret Buchanan' },
    { resourceId: 4, resourceName: 'Fuller King' },
    { resourceId: 5, resourceName: 'Davolio Fuller' },
    { resourceId: 6, resourceName: 'Van Jack' },
    { resourceId: 7, resourceName: 'Fuller Buchanan' },
    { resourceId: 8, resourceName: 'Jack Davolio' },
    { resourceId: 9, resourceName: 'Tamer Vinet' },
    { resourceId: 10, resourceName: 'Vinet Fuller' },
    { resourceId: 11, resourceName: 'Bergs Anton' },
    { resourceId: 12, resourceName: 'Construction Supervisor' }
];

let gantt: Gantt = new Gantt({
    dataSource: data,
    taskFields: {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        dependency: 'Dependency',
        parentID: 'ParentID',
        segments: 'Segments',
        resourceInfo: 'ResourceInfos'
    },
    resourceFields: resourceFields,
    resources: resources,
    showColumnMenu: true,
    editSettings: {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        allowTaskbarEditing: true
    },
    toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'Indent', 'Outdent'],
    allowReordering: true,
    allowResizing: true,
    allowRowDragAndDrop: true,
    enableContextMenu: true,
    allowFiltering: true,
    allowSorting: true,
    height: '450px',
    columns: [
        { field: 'TaskID', headerText: 'Task ID', textAlign: 'Right', width: 90, type: 'number', isPrimaryKey: true },
        { field: 'TaskName', headerText: 'Task Name', textAlign: 'Left', width: 270, type: 'string' },
        { field: 'StartDate', headerText: 'Start Date', textAlign: 'Right', width: 150, format: 'yMd', type: 'dateTime' },
        { field: 'EndDate', headerText: 'End Date', textAlign: 'Right', width: 150, format: 'dd/MM/yyyy hh:mm', type: 'dateTime' },
        { field: 'Duration', headerText: 'Duration', textAlign: 'Right', width: 90, type: 'number' },
        { field: 'Progress', headerText: 'Progress', textAlign: 'Right', width: 120, type: 'number' }
    ]
});
gantt.appendTo('#Gantt');