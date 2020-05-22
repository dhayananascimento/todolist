const inputElement = document.querySelector("#listName");
const listElement = document.querySelector(".container-lists");
const buttonsElement = document.querySelectorAll(".colors");

let lists = [];

const addList = () => {
    let id = Math.random().toString(36).substring(2);
    let name = (inputElement.value).trim();
    let color = document.querySelector(".selected").style.backgroundColor;

    if(name != "") 
        lists.push({ id, name, color, itens: [] })
    else 
        alert("Campo vazio!");  

    inputElement.value = "";
    renderLists();
}

const addItem = (index, id, value) => {
    if(value.trim() != "")  {
        lists[index].itens.push({
            id: Math.random().toString(36).substring(2),
            name: value.trim(),
            completed: false
        });
        renderItens(index,id);
    }
    else 
        alert("Campo vazio!"); 
}

const alertConfirmation = (index) => {
    let response = confirm("Deseja realmente deletar esta lista?");

    if (response){
        lists.splice(index,1);
        renderLists();
    }

}

const renderItens = (index, id) => {
    let containerElement = document.getElementById(`${id}`);
    containerElement.innerHTML = "";
    
    lists[index].itens.forEach((element, indexItem) => {
        let containerItem = document.createElement("div");
        containerItem.classList.add("item");     
        let task = document.createElement("p");
        task.style.overflowX = "auto";
        task.innerText = element.name;

        let containerIcons = document.createElement("div");

        let completed = document.createElement("div");
        completed.classList.add("icons","green");
        completed.addEventListener("click", () => {
            lists[index].itens.completed = !lists[index].itens.completed;
            task.classList.toggle("completed");
        })

        let remove = document.createElement("div");
        remove.classList.add("icons","red");
        remove.addEventListener("click", () => {
            lists[index].itens.splice(indexItem,1);
            renderItens(index, id);
        })
  
        containerIcons.appendChild(completed);
        containerIcons.appendChild(remove);
        containerItem.appendChild(task);
        containerItem.appendChild(containerIcons);

        containerElement.appendChild(containerItem);
    });
}

const renderLists = () => {
    listElement.innerHTML = "";

    lists.forEach((element,index) => {   
        let container = document.createElement("div");
        container.classList.add("container-list");

        let containerTitle = document.createElement("div");
        containerTitle.classList.add("list-title");
        containerTitle.style.backgroundColor = element.color;
        containerTitle.addEventListener("click", () => containerListItens.classList.toggle("toggle"));

        let title = document.createElement("h3");
        title.innerText = element.name;

        let iconTitle = document.createElement("div");
        iconTitle.classList.add("icon-title");
        iconTitle.innerText = ":";
        iconTitle.addEventListener("click", () => {
            alertConfirmation(index);
        })

        let containerListItens = document.createElement("div");
        containerListItens.classList.add("container-list-itens");

        let containerItens = document.createElement("div");
        containerItens.setAttribute("id", element.id);
        
        let containerAddItens = document.createElement("div");
        containerAddItens.classList.add("container-addItem");

        let input = document.createElement("input");
        input.placeholder = "Nome do Item";
        input.addEventListener('keyup', (e) => {
            if (e.keyCode === 13) {
                addItem(index, containerItens.id,input.value);
                input.value = "";
            }

        });

        let button = document.createElement("button");
        button.textContent = "Adicionar";
        button.addEventListener("click", () => {
            addItem(index, containerItens.id,input.value);
            input.value = "";
        });

        
        containerAddItens.appendChild(input);
        containerAddItens.appendChild(button);
        containerListItens.appendChild(containerAddItens);
        containerListItens.appendChild(containerItens);
        containerTitle.appendChild(title);
        containerTitle.appendChild(iconTitle);
        container.appendChild(containerTitle);
        container.appendChild(containerListItens);
        listElement.appendChild(container);

        renderItens(index, containerItens.id);
    });
}

const changeColor = value => {
    buttonsElement.forEach(element => {
        if(element.id == value.id)
            element.classList.contains("selected")? null : element.classList.add("selected"); 
        else
            element.classList.contains("selected")? element.classList.remove("selected"): null;
    });
}
