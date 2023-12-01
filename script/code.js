const items_container = document.querySelector("#items");
const items_template = document.querySelector("#itemsTemplate");
const addBtn = document.querySelector("#add");

//To retrieve item I used getItem and to save item I used setItem

let items= getItem()

function getItem(){
    const value = localStorage.getItem("todo") || "[]";

    return JSON.parse(value);
}

function setItems(items){
    const itemsJson = JSON.stringify(items);

    localStorage.setItem("todo", itemsJson)
}


//enter items to do 

function addItem(){
    items.unshift({
     id:"",
     name:"",
     dateCreated:"",
     description:"",
     completed: false
   });

   setItems(items);
   refreshList();
}

 
function writeItem(item, key , value){
    item[key]=value;
    setItems(items);
    refreshList();
}

//remove
function removeItem(){
    const itemToRemove = document.querySelector("#itemsTemplate");
    itemToRemove.parentNode.removeChild("#itemsTemplate");
}


function refreshList(){
    //sort items
    items.sort((a, b) => {
        if (a.completed){
            return 1;
        }

        if (b.completed){
            return -1;
        }

        return a.description < b.description ? -1 : 1;


    });

items_container.innerHTML="";

for (const item of items){
    const itemE = items_template.content.cloneNode(true);
    const inputDescription = itemE.querySelector(".item-description");
    const inputCompleted = itemE.querySelector(".item-complete");

    inputDescription.value = item.description;
    inputCompleted.checked = item.completed;

    inputDescription.addEventListener("change", () =>{
        writeItem(item, "description", inputDescription.value);
    });
    inputCompleted.addEventListener("change", () =>{
        writeItem(item, "completed", inputCompleted.checked);
    });

    items_container.append(itemE);
}

}

addBtn.addEventListener('click',() => {
 addItem();
});



refreshList();