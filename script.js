const inputElement = document.querySelector("#listName");
const listContainer = document.querySelector(".container-two");
const buttonsElement = document.querySelectorAll(".colors");

let lists = [];

const addList = () => {
    let id = Math.random().toString(36).substring(2);
    let name = (inputElement.value).trim();
    let color = document.querySelector(".selected").style.backgroundColor;

    if(name != "") 
        lists.unshift({ id, name, color, items: [] })
    else 
        alert("Campo vazio!");  

    inputElement.value = "";
    renderLists();
}

const addTask = (index, id, value) => {
    let name  = value.trim();

    if(name!= "")  {
        lists[index].items.unshift({
            id: Math.random().toString(36).substring(2),
            name,
            completed: false
        });
        renderTasks(index,id);
    } 
    else 
        alert("Campo vazio!"); 
}

const alertConfirmation = (index, name) => {
    let response = confirm(`Deseja deletar "${name}"?`);

    if (response) {
        lists.splice(index,1);
        renderLists();
    }
}

const renderTasks = (index, id) => {
    let containerElement = document.getElementById(`${id}`);
    containerElement.innerHTML = "";
    
    lists[index].items.forEach((element, indexTask) => {
        let containerTask = document.createElement("div");
        containerTask.classList.add("task");  

        let task = document.createElement("p");
        task.style.overflowX = "auto";
        task.innerText = element.name;

        let containerIcons = document.createElement("div");

        let completed = document.createElement("div");
        completed.classList.add("icons","green");
        completed.innerHTML = "&#10003;";
        completed.addEventListener("click", () => {
            lists[index].items.completed = !lists[index].items.completed;
            task.classList.toggle("completed");
        })

        let remove = document.createElement("div");
        remove.classList.add("icons","red");
        remove.innerHTML = "&#10005;";
        remove.addEventListener("click", () => {
            lists[index].items.splice(indexTask,1);
            renderTasks(index, id);
        })
  
        containerIcons.appendChild(completed);
        containerIcons.appendChild(remove);
        
        containerTask.appendChild(task);
        containerTask.appendChild(containerIcons);

        containerElement.appendChild(containerTask);
    });
}

const renderLists = () => {

    if(lists.length) {
        listContainer.style.display = "block";
        listContainer.innerHTML = "";

        lists.forEach((element,index) => {   
            let container = document.createElement("div");
            container.classList.add("list-container");
    
            let containerTitle = document.createElement("div");
            containerTitle.classList.add("title-container");
            containerTitle.style.backgroundColor = element.color;
            
            let title = document.createElement("h3");
            title.innerText = element.name;
            title.style.cursor = "pointer";
            title.addEventListener("click", () => containerListItems.classList.toggle("toggle-hide-list"));
    
            let iconTitle = document.createElement("div");
            iconTitle.classList.add("title-icon");
            iconTitle.innerHTML = "&vellip;"
            iconTitle.addEventListener("click", () => alertConfirmation(index, element.name))
    
            let containerListItems = document.createElement("div");
            containerListItems.classList.add("list-items-container");
    
            let containerTasks = document.createElement("div");
            containerTasks.setAttribute("id", element.id);
            
            let containerItems = document.createElement("div");
            containerItems.classList.add("item-container");
    
            let input = document.createElement("input");
            input.placeholder = "Nome do Item";
            input.addEventListener('keyup', (e) => {
                if (e.keyCode === 13) {
                    addTask(index, containerTasks.id, input.value);
                    input.value = "";
                }
            });
    
            let button = document.createElement("button");
            button.style.backgroundColor = element.color;
            button.textContent = "Adicionar";
            button.addEventListener("click", () => {
                addTask(index, containerTasks.id, input.value);
                input.value = "";
            });
    
            containerItems.appendChild(input);
            containerItems.appendChild(button);

            containerListItems.appendChild(containerItems);
            containerListItems.appendChild(containerTasks);

            containerTitle.appendChild(title);
            containerTitle.appendChild(iconTitle);

            container.appendChild(containerTitle);
            container.appendChild(containerListItems);

            listContainer.appendChild(container);
    
            renderTasks(index, containerTasks.id);
        });
    }
    else
        listContainer.style.display = "none";

}

const changeColor = value => {
    buttonsElement.forEach(element => {
        if(element.id == value.id)
            element.classList.contains("selected")? null : element.classList.add("selected"); 
        else
            element.classList.contains("selected")? element.classList.remove("selected"): null;
    });
}
