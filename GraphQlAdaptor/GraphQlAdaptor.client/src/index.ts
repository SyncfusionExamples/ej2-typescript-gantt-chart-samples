import { DataManager, GraphQLAdaptor } from '@syncfusion/ej2-data';
import { Gantt, Edit, Selection, Toolbar, ContextMenu } from '@syncfusion/ej2-gantt';

// Custom adaptor that maps the GraphQL response shapes (getTasks /
// addTask / updateTask / deleteTask / batchTasks) into the payload
// DataManager expects. Mirrors the GraphQLCrudAdaptor used in the
// Angular sample, but in plain TypeScript.
class GraphQLCrudAdaptor extends GraphQLAdaptor {
    public override processResponse(
        resData: any,
        ds?: any,
        query?: any,
        xhr?: any,
        request?: any
    ) {
        if (resData && resData.data) {
            const data = resData.data;

            if (data.getTasks) {
                return data.getTasks;
            }

            if (data.updateTask) {
                return { result: data.updateTask };
            }

            if (data.addTask) {
                return { result: data.addTask };
            }

            if (data.deleteTask !== undefined) {
                return { result: data.deleteTask };
            }

            if (data.batchTasks) {
                return data.batchTasks;
            }
        }

        return super.processResponse(resData, ds, query, xhr, request);
    }
}

const resources: object[] = [
    { resourceId: 1, resourceName: 'Martin Tamer' },
    { resourceId: 2, resourceName: 'Rose Fuller' },
    { resourceId: 3, resourceName: 'Margaret Buchanan' }
];

const resourceFields: object = {
    id: 'resourceId',
    name: 'resourceName',
    unit: 'resourceUnit',
    group: 'resourceGroup'
};

// DataManager with the custom GraphQL adaptor. The endpoint is the
// graphpack/GraphQL server started from GraphQlAdaptor.Server.
const data: DataManager = new DataManager({
    url: 'http://localhost:4205/',
    adaptor: new GraphQLCrudAdaptor({

        response: {
            result: 'getTasks.result',
            count: 'getTasks.count'
        },

        query: `
            query getTasks {
              getTasks {
                count
                result {
                  TaskID
                  TaskName
                  StartDate
                  EndDate
                  Duration
                  Progress
                  ParentId
                  Predecessor
                  Segments {
                    StartDate
                    EndDate
                    Duration
                  }
                  ResourceInfos {
                    resourceId
                    resourceName
                    resourceGroup
                    resourceUnit
                  }
                }
              }
            }
        `,

        mutation: {
            update: 'updateTask',
            insert: 'addTask',
            remove: 'deleteTask'
        },

        getMutation: (action: string) => {
            if (action === 'insert') {
                return `
                    mutation AddTask($value: GanttTaskInput!) {
                      addTask(value: $value) {
                        TaskID
                        TaskName
                        StartDate
                        EndDate
                        Duration
                        Progress
                        ParentId
                        Predecessor
                      }
                    }
                `;
            }

            if (action === 'update') {
                return `
                    mutation UpdateTask($value: GanttTaskInput!) {
                      updateTask(value: $value) {
                        TaskID
                        TaskName
                        StartDate
                        EndDate
                        Duration
                        Progress
                        ParentId
                        Predecessor
                      }
                    }
                `;
            }

            if (action === 'remove') {
                return `
                    mutation DeleteTask($key: ID!) {
                      deleteTask(key: $key)
                    }
                `;
            }

            return '';
        }

    } as any),
    crossDomain: true
});

Gantt.Inject(Edit, Selection, Toolbar, ContextMenu);

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
        dependency: 'Predecessor',
        parentID: 'ParentId',
        segments: 'Segments',
        resourceInfo: 'ResourceInfos'
    },
    resourceFields: resourceFields,
    resources: resources,
    editSettings: {
        allowAdding: true,
        allowEditing: true,
        allowDeleting: true,
        allowTaskbarEditing: true,
        showDeleteConfirmDialog: true
    },
    toolbar: [
        'Add', 'Edit', 'Update', 'Delete', 'Cancel',
        'ExpandAll', 'CollapseAll', 'Indent', 'Outdent'
    ],
    enableContextMenu: true,
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
