let inputAdd = document.querySelectorAll(".ajouter");
const btnAddTask = document.getElementById("add-task");
let remove = document.querySelectorAll(".remove");
let poubelles = document.querySelectorAll(".fa-trash-can");
let confirmRemove = document.querySelectorAll(".confirm-remove");
let cancelRemove = document.querySelectorAll(".fa-xmark");
let btnConfirmRemove = document.querySelectorAll(".fa-check");
let uls = document.querySelectorAll("ul");
let li = document.querySelectorAll("li");
const row = document.querySelector(".row");
const btnAddColumn = document.querySelector(".ajouterCol");

function removeAddClass(element, class1, class2) {
  element.classList.remove(class1);
  element.classList.add(class2);
}

function toggleClass(element, classe) {
  element.classList.toggle(classe);
}

let div1;
let div2;
let div3;
let input1;
let div4;
let ul;
let div5;
let div6;
let input2;
let label;
let i;
let poubelle;
let colorpicker

function addColumn() {
  div1 = document.createElement("div");
  div1.classList.add("col", "mb-2");
  div2 = document.createElement("div");
  div2.classList.add("card", "bg-transparent");
  div3 = document.createElement("div");
  div3.classList.add("card-header","position-relative");
  input1 = document.createElement("input");
  input1.placeholder = "Titre";
  poubelle = document.createElement("i");
  poubelle.classList.add(
    "fa-regular",
    "fa-trash-can",
    "mt-2",
    "p-1",
    "me-3",
    "text-secondary",
    "poubelle",
    "position-absolute",
    "end-0",
    "top-0"
  );
  colorpicker = document.createElement("input");
  colorpicker.classList.add("form-control","form-control-color","form-control-sm","rounded-circle","position-absolute","start-0",'top-0','opacity-50',"m-1");
  colorpicker.setAttribute("type","color");
  colorpicker.setAttribute("title","Choisissez votre couleur");
  colorpicker.style.borderRadius = "50%"
  colorpicker.style.width = "35px"
  div4 = document.createElement("div");
  div4.className = "card-body";
  ul = document.createElement("ul");
  ul.className = "list-group";
  div5 = document.createElement("div");
  div5.classList.add("input-group", "my-3");
  div6 = document.createElement("div");
  div6.classList.add("form-floating");
  input2 = document.createElement("input");
  input2.classList.add("form-control", "form-control-sm", "rounded", "ajouter");
  input2.placeholder = "Ajouter une tâche";
  input2.setAttribute("type", "text");
  input2.setAttribute("id", "input-add");
  input2.setAttribute("data-drop", false);
  label = document.createElement("label");
  label.setAttribute("for", "input-add");
  label.textContent = "Ajouter une tâche";
  i = document.createElement("i");
  i.classList.add("fa-regular", "fa-plus");

  let terminees = row.lastElementChild
  row.appendChild(div1);
  row.appendChild(terminees)
  div1.appendChild(div2);
  div2.appendChild(div3);
  div3.appendChild(colorpicker)
  div3.appendChild(input1);
  div3.appendChild(poubelle);
  div2.appendChild(div4);
  div4.appendChild(ul);
  div4.appendChild(div5);
  div5.appendChild(div6);
  div6.appendChild(input2);
  div6.appendChild(label);
  label.prepend(i);
  inputAdd = document.querySelectorAll(".ajouter");
  console.log(inputAdd);
  inputCreate();

  poubelles = document.querySelectorAll(".poubelle");
  poubelles.forEach((poubelle) => {
    poubelle.addEventListener("click", () => {
      let col = poubelle.parentElement.parentElement.parentElement;
      col.remove();
    });
  });

  colorpicker.addEventListener("change", (e) =>{
    let parent = e.target.parentElement;
    parent.style.backgroundColor = colorpicker.value;
  });
  
  let inputTitreCol = document.querySelectorAll(`input[placeholder="Titre"]`);
  inputTitreCol.forEach((inputTitre) => {
    inputTitre.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        let parent = inputTitre.parentElement;
        if (inputTitre.value.trim() !== "") {
          parent.textContent = inputTitre.value;
          parent.append(colorpicker)
          parent.append(poubelle);
          inputTitre.remove();
        }
      }
    });
  });
}

btnAddColumn.addEventListener("click", addColumn);

let titreTache;
let spanDuBoutonClique;
let inputTask;



function inputEditTask(nameTask) {
  let input = document.createElement("input");
  input.classList.add("form-control", "rename-task");
  input.setAttribute("type", "text");
  input.placeholder = `${nameTask}`;
  input.setAttribute("aria-label", "default input example");
  inputTask = input;
  setTimeout(() => {
    input.focus();
  }, 200);
  input.addEventListener("change", () => {});
  return input;
}



function editTitre(bouton) {
  spanDuBoutonClique = bouton;
  titreTache = spanDuBoutonClique.textContent;
  spanDuBoutonClique.replaceWith(inputEditTask(titreTache));
  let renameTaskInput = document.getElementsByClassName("rename-task");
  Array.from(renameTaskInput).forEach((input) => {
    input.addEventListener("keyup", (event) => {
      if (event.keyCode === 13) {
        if (!input.value) {
          input.classList.add("is-invalid");
          return;
        }
        let span = document.createElement("span");
        span.classList.add("titre-tache", "w-50");
        if (input.value !== titreTache) {
          span.textContent = input.value;
          input.classList.remove("is-invalid");
        } else {
          span.textContent = titreTache;
        }
        input.replaceWith(span);
        span.addEventListener("click", (e) => {
          editTitre(e.target);
        });
        nameTask = document.querySelectorAll(".titre-tache");
      }
    });
    input.addEventListener("focusout", () => {
      if (input.classList.contains("is-invalid") || input.value === "") {
        input.replaceWith(spanDuBoutonClique);
      }
    });
  });
}



function createTask(inputAjouter) {
  let li = document.createElement("li");
  li.classList.add(
    "list-group-item",
    "list-group-item-action",
    "d-flex",
    "align-items-center",
    "justify-content-between"
  );
  li.setAttribute("draggable", true);
  li.setAttribute("data-drop", false);
  li.setAttribute("id", Date.now());
  let span = document.createElement("span");
  span.classList.add("titre-tache", "w-50");
  span.textContent = inputAjouter.value;
  let div1 = document.createElement("div");
  div1.classList.add("actions", "d-flex", "align-items-center");
  let div2 = document.createElement("div");
  div2.classList.add("remove", "position-relative", "px-3");
  let i1 = document.createElement("i");
  i1.classList.add("fa-regular", "fa-trash-can", "ms-3", "text-secondary");
  let div3 = document.createElement("div");
  div3.classList.add(
    "confirm-remove",
    "position-absolute",
    "top-0",
    "d-block",
    "mx-auto",
    "d-none"
  );
  let i2 = document.createElement("i");
  i2.classList.add("fa-solid", "fa-xmark", "text-danger", "me-2");
  let i3 = document.createElement("i");
  i3.classList.add("fa-solid", "fa-check", "text-success");
  let ulCorrespondant =
    inputAjouter.parentElement.parentElement.previousElementSibling;

  ulCorrespondant.appendChild(li);
  li.appendChild(span);
  li.appendChild(div1);
  div1.appendChild(div2);
  div2.appendChild(i1);
  div2.appendChild(div3);
  div3.appendChild(i2);
  div3.appendChild(i3);
  inputAjouter.value = "";

  nameTask = document.querySelectorAll(".titre-tache");
  remove = document.querySelectorAll(".remove");
  poubelles = document.querySelectorAll(".fa-trash-can");
  confirmRemove = document.querySelectorAll(".confirm-remove");
  cancelRemove = document.querySelectorAll(".fa-xmark");
  btnConfirmRemove = document.querySelectorAll(".fa-check");
  liAll = document.querySelectorAll("li");
  uls = document.querySelectorAll("ul");

  i1.addEventListener("click", (e) => {
    toggleClass(i1.nextElementSibling, "d-none");
    toggleClass(i1, "opacity-0");
  });

  i3.addEventListener("click", () => {
    i3.parentElement.parentElement.parentElement.parentElement.remove();
  });

  i2.addEventListener("click", () => {
    toggleClass(i2.parentNode, "d-none");
    toggleClass(i2.parentNode.previousElementSibling, "opacity-0");
  });

  span.addEventListener("click", (e) => {
    editTitre(span);
  });

  uls.forEach((ul) => {
    ul.addEventListener("dragover", (e) => {
      if (e.target.tagName === "UL") {
        e.preventDefault();
      }
    });
    ul.addEventListener("drop", (e) => {
      if (e.target.tagName === "UL") {
        e.preventDefault();
        let id = e.dataTransfer.getData("text");
        let liOh = document.getElementById(id);
        e.target.appendChild(liOh);
      }
    });
  });

  liAll.forEach((li) => {
    li.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text", e.target.id);
    });
    li.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    li.addEventListener("drop", (e) => {
      let id = e.dataTransfer.getData("text");
      let draggableElement = document.getElementById(id);
      let dropzone = e.target.closest("li");
      e.target.closest("ul").insertBefore(draggableElement, dropzone);
    });
  });
}




function inputCreate() {
  inputAdd = document.querySelectorAll(".ajouter");
  inputAdd.forEach((inp) => {
    inp.addEventListener("keyup", (event) => {
      if (event.keyCode === 13) {
        if (!inp.value) {
          return;
        }
        createTask(inp);
      }
    });
  });
}
inputCreate();
