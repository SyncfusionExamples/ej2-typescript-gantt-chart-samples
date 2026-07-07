import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { Gantt, Selection, Edit, Toolbar } from '@syncfusion/ej2-gantt';

// Create DataManager with ODataV4Adaptor
let data: DataManager = new DataManager({
    url: 'https://localhost:7094/odata/GanttTasks', // Here xxxx represents the port number.
    adaptor: new ODataV4Adaptor(), // Handles all ODataV4 communication
    key: 'TaskID',
    crossDomain: true // Enables cross-domain requests
});

Gantt.Inject(Selection, Edit, Toolbar);

let gantt: Gantt = new Gantt({
    dataSource: data,
    height: '450px',
    taskFields: {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        dependency: 'Dependency',
        parentID: 'ParentID'
    },
     editSettings: {
        allowAdding: true,
        allowEditing: true,
        allowDeleting: true,
        allowTaskbarEditing: true,
        showDeleteConfirmDialog: true
    },
    toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'Search', 'ExpandAll', 'CollapseAll'],
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