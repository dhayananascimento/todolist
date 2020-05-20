const inputElement = document.querySelector("#listName");
const listElement = document.querySelector(".container-lists");
const buttonsElement = document.querySelectorAll(".colors");

let lists = [];

const addList = () => {
    let id = new Date();
    let name = (inputElement.value).trim();
    let color = document.querySelector(".selected").style.backgroundColor;

    if(name != "") 
        lists.push({id, name, color, itens: [] })
    else 
        alert("Campo vazio!");  

    inputElement.value = "";
    renderLists();
}

const addItem = (index, id, value) => {
    lists[index].itens.push({
        name: value,
        completed: false
    });
    renderItens(index,id);
}

const renderItens = (index, id) => {
    let containerElement = document.getElementById(`${id}`);
    containerElement.innerHTML = "";
    
    lists[index].itens.forEach(element => {
        let item = document.createElement("div");
        item.innerText = element.name;
        item.classList.add("item");     
        containerElement.appendChild(item);
    });
}

const renderLists = () => {
    listElement.innerHTML = "";

    lists.forEach((element,index) => {   
        let container  = document.createElement("div");
        container.classList.add("container-list");

        let title = document.createElement("h3");
        title.innerText = element.name;
        title.classList.add("list-title");
        title.style.backgroundColor = element.color;
        title.addEventListener("click", () => containerListItens.classList.toggle("toggle"));

        let containerListItens = document.createElement("div");
        containerListItens.classList.add("container-list-itens");

        let containerItens = document.createElement("div");
        containerItens.setAttribute("id", element.name+index);
        
        let containerAddItens = document.createElement("div");
        containerAddItens.classList.add("container-addItem");

        let input = document.createElement("input");
        input.placeholder = "Nome do Item";

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
        container.appendChild(title);
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
