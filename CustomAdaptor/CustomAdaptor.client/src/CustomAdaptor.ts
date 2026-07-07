
import { ODataV4Adaptor } from '@syncfusion/ej2-data';

export class CustomAdaptor extends ODataV4Adaptor {
    processResponse() {
        const original = super.processResponse.apply(this, arguments);
        return original;
    }
    processQuery(dm, query) {
        dm.dataSource.url = 'https://localhost:7258/odata/GanttTasks'; // Here 7258 represents the port number.
        query.addParams('Syncfusion in Gantt Chart', 'true');
        const result = super.processQuery.apply(this, arguments);
        return result;
    }
    beforeSend(dm, request, settings) {
        request.headers.set('Authorization', `Bearer`);
        super.beforeSend(dm, request, settings);
    }
}
