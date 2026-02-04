document.addEventListener('DOMContentLoaded', () => {
    const todoTitleInput = document.getElementById('todo-title');
    const todoDescriptionInput = document.getElementById('todo-description');
    const saveButton = document.getElementById('save-button');
    const todoList = document.getElementById('todo-list');

    // Load todos from localStorage on page load
    loadTodos();

    saveButton.addEventListener('click', () => {
        const title = todoTitleInput.value.trim();
        const description = todoDescriptionInput.value.trim();

        if (title === '') {
            alert('제목을 입력해주세요.');
            return;
        }

        const todo = {
            id: Date.now(),
            title,
            description
        };

        saveTodo(todo);
        addTodoToList(todo);

        todoTitleInput.value = '';
        todoDescriptionInput.value = '';
    });

    function getTodos() {
        return JSON.parse(localStorage.getItem('todos')) || [];
    }

    function saveTodo(todo) {
        const todos = getTodos();
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = getTodos();
        todos.forEach(todo => addTodoToList(todo));
    }

    function addTodoToList(todo) {
        const li = document.createElement('li');
        
        const todoContent = document.createElement('div');
        todoContent.style.flexGrow = '1'; // Allow content to take available space

        const titleSpan = document.createElement('span');
        titleSpan.textContent = todo.title;
        titleSpan.classList.add('todo-title-item'); // Add class for styling and click event
        titleSpan.style.cursor = 'pointer'; // Indicate it's clickable
        
        const descriptionDiv = document.createElement('div');
        descriptionDiv.textContent = todo.description;
        descriptionDiv.classList.add('todo-description-item');
        descriptionDiv.style.display = 'none'; // Initially hidden

        titleSpan.addEventListener('click', () => {
            descriptionDiv.style.display = descriptionDiv.style.display === 'none' ? 'block' : 'none';
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            deleteTodo(todo.id);
            li.remove();
        });

        todoContent.appendChild(titleSpan);
        todoContent.appendChild(descriptionDiv);
        li.appendChild(todoContent);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    }

    function deleteTodo(id) {
        let todos = getTodos();
        todos = todos.filter(todo => todo.id !== id);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});
