const inputAdd = document.querySelectorAll(".ajouter");
const btnAddTask = document.getElementById("add-task");
let remove = document.querySelectorAll(".remove");
let poubelles = document.querySelectorAll(".fa-trash-can");
let confirmRemove = document.querySelectorAll(".confirm-remove");
let cancelRemove = document.querySelectorAll(".fa-xmark");
let btnConfirmRemove = document.querySelectorAll(".fa-check");
let uls = document.querySelectorAll("ul");
let li = document.querySelectorAll("li");

function removeAddClass(element, class1, class2) {
  element.classList.remove(class1);
  element.classList.add(class2);
}

function toggleClass(element, classe) {
  element.classList.toggle(classe);
}

let titreTache;
let spanDuBoutonClique;
let inputTask;

function inputEditTask(nameTask) {
  let input = document.createElement("input");
  input.classList.add("form-control","rename-task");
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
        span.classList.add("titre-tache","w-50");
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
  li.setAttribute("draggable",true);
  li.setAttribute("data-drop",false);
  li.setAttribute("id",Date.now());
  let span = document.createElement("span");
  span.classList.add("titre-tache","w-50");
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
  let ulCorrespondant = inputAjouter.parentElement.parentElement.previousElementSibling;

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

  liAll.forEach(li => {
    li.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text", e.target.id);
    });
    li.addEventListener("dragover", e => {
      e.preventDefault();
    });
    li.addEventListener("drop", e => {
      let id = e.dataTransfer.getData("text");
      let draggableElement = document.getElementById(id);
      let dropzone = e.target.closest("li");
      e.target.closest("ul").insertBefore(draggableElement, dropzone);
    });
  });
}

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
