import ko = require('knockout');

const serverUrl = 'http://localhost:8080/tasks';

interface Task {
    text: string;
}

class ViewModel {
    tasks: KnockoutObservableArray<Task> = ko.observableArray<Task>([]);
    newTask: KnockoutObservable<Task> = ko.observable<Task>({ text: '' });

    constructor() {
        this.load();
    }

    async load() {
        const response = await fetch(serverUrl);
        const tasks = await response.json() as Task[];
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
                body: JSON.stringify(newTask),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        // add to local collection
        this.tasks.push(newTask);
        // reset the form
        this.newTask({text: ''});
    }
}

ko.applyBindings(new ViewModel());