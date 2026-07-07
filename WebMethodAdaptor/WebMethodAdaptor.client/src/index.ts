import { DataManager, WebMethodAdaptor } from '@syncfusion/ej2-data';
import { Gantt, Edit, Selection, Toolbar } from '@syncfusion/ej2-gantt';

// Configure DataManager with WebMethodAdaptor
let data: DataManager = new DataManager({
    url: 'https://localhost:7126/api/Gantt', // Here xxxx represents the port number.
    adaptor: new WebMethodAdaptor(),
    crossDomain: true
});

Gantt.Inject(Edit, Selection, Toolbar);

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
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        allowTaskbarEditing: true
    },
    toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'Indent', 'Outdent'],
    columns: [
        { field: 'TaskID', headerText: 'Task ID', textAlign: 'Right', width: 90, type: 'number' },
        { field: 'TaskName', headerText: 'Task Name', textAlign: 'Left', width: 270, type: 'string' },
        { field: 'StartDate', headerText: 'Start Date', textAlign: 'Right', width: 150, format: 'yMd', type: 'dateTime' },
        { field: 'EndDate', headerText: 'End Date', textAlign: 'Right', width: 150, format: 'dd/MM/yyyy hh:mm', type: 'dateTime' },
        { field: 'Duration', headerText: 'Duration', textAlign: 'Right', width: 90, type: 'string' },
        { field: 'Progress', headerText: 'Progress', textAlign: 'Right', width: 120, type: 'number' }
    ]
});
gantt.appendTo('#Gantt');