const inputElement = document.querySelector("#listName");
const listElement = document.querySelector(".container-lists");
const itensElement = document.querySelector(".container-itens");
const buttonsElement = document.querySelectorAll(".colors");

let lists = [];

const addList = () => {

    let name = (inputElement.value).trim();
    let color = "pink";

    if(name != "")
        lists.push({ name, color, itens: [] })
    else 
        alert("Campo vazio!");  
        
    inputElement.value = "";
    renderLists();
}

const addItem = () => {

}

const renderLists = () => {
    listElement.innerHTML = "";

    lists.forEach(element => {
        
        let container  = document.createElement("div");
        container.classList.add("container-list");

        let title = document.createElement("h3");
        title.innerText = element.name;
        title.addEventListener("click", () => {
            containerItens.classList.toggle("toggle");
        })

        let containerItens = document.createElement("div");
        containerItens.classList.add("container-itens");
        
        let containerAddItens = document.createElement("div");
        containerAddItens.classList.add("container-addItem");

        let input = document.createElement("input");
        input.placeholder = "Nome do Item";

        let button = document.createElement("button");
        button.textContent = "Adicionar";


        containerAddItens.appendChild(input);
        containerAddItens.appendChild(button);

        containerItens.appendChild(containerAddItens);

        container.appendChild(title);
        container.appendChild(containerItens);

        listElement.appendChild(container);
    });
}

const changeColor = (value) => {
    buttonsElement.forEach(element => {
        if(element.id == value.id)
            element.classList.contains("selected")? null : element.classList.add("selected"); 
        else
            element.classList.contains("selected")? element.classList.remove("selected"): null;
    });
}
