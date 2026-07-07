import { Gantt, Edit, Selection, Toolbar } from '@syncfusion/ej2-gantt';
import { DataManager, RemoteSaveAdaptor } from '@syncfusion/ej2-data';

Gantt.Inject(Edit, Selection, Toolbar);
const serviceUrl: string = 'https://localhost:7260/api/gantt'; // Here xxxx represents the port number.
let data: DataManager;

function load() {
    fetch(serviceUrl)
        .then((response: Response) => response.json())
        .then((result: object[]) => {
            data = new DataManager({
                json: result,
                adaptor: new RemoteSaveAdaptor(),
                batchUrl: `${serviceUrl}/Batch`,
            });
            createGantt();

        })
        .catch((error: Error) => console.error('Error fetching data:', error));
}
function createGantt() {
    let gantt: Gantt = new Gantt({
        dataSource: data,
        height: '450px',
        allowSelection: true,
        taskFields: {
            id: 'taskId',
            name: 'taskName',
            startDate: 'startDate',
            endDate: 'endDate',
            duration: 'duration',
            progress: 'progress',
            parentID: 'parentId'
        },
        editSettings: {
            allowEditing: true,
            allowAdding: true,
            allowDeleting: true,
            allowTaskbarEditing: true
        },
        toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
        columns: [
            { field: 'taskID', headerText: 'Task ID', textAlign: 'Right', width: 90, type: 'number' },
            { field: 'taskName', headerText: 'Task Name', textAlign: 'Left', width: 270, type: 'string' },
            { field: 'startDate', headerText: 'Start Date', textAlign: 'Right', width: 150, format: 'yMd', type: 'dateTime' },
            { field: 'endDate', headerText: 'End Date', textAlign: 'Right', width: 150, format: 'dd/MM/yyyy hh:mm', type: 'dateTime' },
            { field: 'duration', headerText: 'Duration', textAlign: 'Right', width: 90, type: 'number' },
            { field: 'progress', headerText: 'Progress', textAlign: 'Right', width: 120, type: 'number' }
        ]
    });
    gantt.appendTo('#Gantt');
}

load();