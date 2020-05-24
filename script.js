const inputElement = document.querySelector("#listName")
const listContainer = document.querySelector(".container-two")
const buttonElement = document.querySelectorAll(".colors")

let lists = JSON.parse(localStorage.getItem('lists')) || []

const addList = () => {
    
    let id = Math.random().toString(36).substring(2)
    let name = (inputElement.value).trim()
    let color = document.querySelector(".selected").style.backgroundColor

    if(name != "") {
        lists.unshift({ id, name, color, items: [] })
        inputElement.value = ""
        saveToStorage()
        renderLists() 
        document.querySelector(".list-items-container").classList.toggle("toggle-hide-list")
    }
    else 
        alert("Campo vazio!")  

    
}

const addTask = (index, id, value) => {
    
    let name  = value.trim()

    if(name!= "")  {
        lists[index].items.unshift({
            id: Math.random().toString(36).substring(2),
            name,
            completed: false
        })
        saveToStorage()
        renderTasks(index,id)
    } 
    else 
        alert("Campo vazio!") 

}

const alertConfirmation = (index, name) => {
    
    let response = confirm(`Deseja deletar "${name}"?`)

    if (response) {
        lists.splice(index,1)
        saveToStorage()
        renderLists()
    }
}

const renderTasks = (index, id) => {
    
    let containerElement = document.getElementById(`${id}`)
    containerElement.innerHTML = ""
    
    lists[index].items.forEach((element, indexTask) => {
        let taskContainer = document.createElement("div")
        taskContainer.classList.add("task")  

        let task = document.createElement("p")
        task.style.overflowX = "auto"
        task.innerText = element.name
        lists[index].items[indexTask].completed ? task.classList.toggle("completed") : null

        let iconsContainer = document.createElement("div")

        let completed = document.createElement("div")
        completed.classList.add("icons","green")
        completed.innerHTML = "&#10003;"
        completed.addEventListener("click", () => {
            lists[index].items[indexTask].completed = !lists[index].items[indexTask].completed
            task.classList.toggle("completed")
            saveToStorage()
        })

        let remove = document.createElement("div")
        remove.classList.add("icons","red")
        remove.innerHTML = "&#10005;"
        remove.addEventListener("click", () => {
            lists[index].items.splice(indexTask,1)
            saveToStorage()
            renderTasks(index, id)
        })
  
        iconsContainer.appendChild(completed)
        iconsContainer.appendChild(remove)
        
        taskContainer.appendChild(task)
        taskContainer.appendChild(iconsContainer)

        containerElement.appendChild(taskContainer)
    })
}

const renderLists = () => {

    if(lists.length) {
        listContainer.style.display = "block"
        listContainer.innerHTML = ""

        lists.forEach((element,index) => {   
            let container = document.createElement("div")
            container.classList.add("list-container")
    
            let titleContainer = document.createElement("div")
            titleContainer.classList.add("title-container")
            titleContainer.style.backgroundColor = element.color
            
            let title = document.createElement("h3")
            title.innerText = element.name
            title.classList.add("list-title")
            title.addEventListener("click", () => listItemsContainer.classList.toggle("toggle-hide-list"))
    
            let titleIcon = document.createElement("div")
            titleIcon.classList.add("title-icon")
            titleIcon.innerHTML = "&vellip;"
            titleIcon.addEventListener("click", () => alertConfirmation(index, element.name))
    
            let listItemsContainer = document.createElement("div")
            listItemsContainer.classList.add("list-items-container")
    
            let taskContainer = document.createElement("div")
            taskContainer.setAttribute("id", element.id)
            
            let itemContainer = document.createElement("div")
            itemContainer.classList.add("item-container")
    
            let input = document.createElement("input")
            input.placeholder = "Nome do Item"
            input.addEventListener('keyup', (e) => {
                if (e.keyCode === 13) {
                    addTask(index, taskContainer.id, input.value)
                    input.value = ""
                }
            })
    
            let button = document.createElement("button")
            button.style.backgroundColor = element.color
            button.textContent = "Adicionar"
            button.addEventListener("click", () => {
                addTask(index, taskContainer.id, input.value)
                input.value = ""
            })
    
            itemContainer.appendChild(input)
            itemContainer.appendChild(button)

            listItemsContainer.appendChild(itemContainer)
            listItemsContainer.appendChild(taskContainer)

            titleContainer.appendChild(title)
            titleContainer.appendChild(titleIcon)

            container.appendChild(titleContainer)
            container.appendChild(listItemsContainer)

            listContainer.appendChild(container)
    
            renderTasks(index, taskContainer.id)
        })
    }
    else
        listContainer.style.display = "none"

}

const changeColor = value => {
    buttonElement.forEach(element => {
        if(element.id == value.id)
            element.classList.contains("selected")? null : element.classList.add("selected") 
        else
            element.classList.contains("selected")? element.classList.remove("selected"): null
    })
}

const saveToStorage = () => {
    localStorage.setItem('lists', JSON.stringify(lists))
}

renderLists()
