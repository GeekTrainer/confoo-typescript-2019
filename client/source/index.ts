import ko = require('knockout');

const serverUrl = 'http://localhost:8080/tasks';

interface ITask {
    title: string;
}

class ViewModel {
    tasks: KnockoutObservableArray<ITask> = ko.observableArray<ITask>([]);
    newTask: KnockoutObservable<ITask> = ko.observable<ITask>({ title: '' });

    constructor() {
        this.load();
    }

    async load() {
        const response = await fetch(serverUrl);
        const tasks = await response.json() as ITask[];
        this.tasks(tasks);
    }

    async save() {
        // grab the task created by the user
        const newTask = this.newTask();
        // send to server
        await fetch(
            serverUrl, 
            {
                method: 'POST',
                body: JSON.stringify(newTask)
            }
        );
        // add to local collection
        this.tasks.push(newTask);
        // reset the form
        this.newTask({title: ''});
    }
}

ko.applyBindings(new ViewModel());