const tasks = [];
const form = document.querySelector('#topTask');
const error = document.querySelector('.error');
let filter = '';
export const init = () => {
    const input = document.querySelector('#task');

    input.addEventListener('input', (e) => {
        filter = e.target.value.trim().toLowerCase();
        render();
    });

    submitTasks(form);

    render();
}

const submitTasks = (form) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const value = form.task.value.trim();

        if (!value) {
            error.textContent = 'Task name cannot be empty';
            return;
        }

        error.textContent = '';

        tasks.push({
            id: Date.now(),
            name: value,
            pinned: false,
        })
        form.reset();
        filter = '';
        render();
    })
}

const render = () => {
    const pinnedTasks = tasks.filter(task => task.pinned);
    const unpinnedTasks = tasks.filter(task => {
        return (
            !task.pinned &&
            task.name.toLowerCase().startsWith(filter)
        );
    });

    renderPinnedTasks(pinnedTasks);
    renderTasks(unpinnedTasks);
}
const createTaskElement = (task) => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');

    const taskName = document.createElement('div');
    taskName.classList.add('task__name');
    taskName.textContent = task.name;

    const label = document.createElement('label');
    label.classList.add('task__checkbox');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.pinned;

    checkbox.addEventListener('change', () => {
        task.pinned = checkbox.checked;
        render();
    });

    const span = document.createElement('span');
    span.classList.add('checkmark');

    label.append(checkbox, span);
    taskElement.append(taskName, label);

    return taskElement;
};

const renderTasks = (tasks) => {
    const taskWrapper = document.querySelector('.task__wrapper');
    taskWrapper.innerHTML = '';

    if (tasks.length === 0) {
        taskWrapper.textContent = 'No tasks found';
        return;
    }

    tasks.forEach(task => {
        taskWrapper.append(createTaskElement(task));
    });
};

const renderPinnedTasks = (pinnedTasks) => {
    const pinnedWrapper = document.querySelector('.pinned__wrapper');
    pinnedWrapper.innerHTML = '';

    if (pinnedTasks.length === 0) {
        pinnedWrapper.textContent = 'No pinned tasks';
        return;
    }

    pinnedTasks.forEach(task => {
        pinnedWrapper.append(createTaskElement(task));
    });
};
