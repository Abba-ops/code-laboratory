const cafeList = document.querySelector("#cafe-list");
const form = document.querySelector("#add-cafe-form");
const loadingIndicator = document.querySelector("#loading-indicator");
let isEditing = false;

const updateCafe = (id) => {
  db.collection("cafes").doc(id).update({
    name: form.name.value,
    city: form.city.value,
  });
};

const addCafe = (e) => {
  e.preventDefault();
  db.collection("cafes").add({
    name: e.target.name.value.trim(),
    city: e.target.city.value.trim(),
  });
  form.reset();
};

const editCafe = (editIcon) => {
  const li = editIcon.parentElement.parentElement;
  const name = li.children[0].textContent;
  const city = li.children[1].textContent;

  form.name.value = name;
  form.city.value = city;
  isEditing = true;
};

const handleSubmit = (e) => {
  e.preventDefault();

  if (isEditing) {
    const id = form.getAttribute("data-id");
    updateCafe(id);
    isEditing = false;
    form.reset();
  } else {
    addCafe(e);
  }
};

form.addEventListener("submit", handleSubmit);

const renderCafe = (doc) => {
  const li = document.createElement("li");
  const name = document.createElement("span");
  const city = document.createElement("span");
  const options = document.createElement("div");
  const cross = document.createElement("i");
  const editIcon = document.createElement("i");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.classList.add("bi", "bi-x-circle-fill");
  editIcon.classList.add("bi", "bi-pencil-square");

  options.append(cross, editIcon);

  li.append(name, city);
  li.append(options);

  const existingLi = document.querySelector(`li[data-id="${doc.id}"]`);
  if (existingLi) {
    existingLi.remove();
  }

  cafeList.append(li);

  loadingIndicator.style.display = "none";
  cafeList.style.display = "block";

  cross.addEventListener("click", (e) => {
    const id = e.target.parentElement.parentElement.getAttribute("data-id");
    db.collection("cafes").doc(id).delete();
  });

  editIcon.addEventListener("click", (e) => {
    editCafe(editIcon);
    form.setAttribute("data-id", li.getAttribute("data-id"));
  });
};

db.collection("cafes")
  .orderBy("city")
  .onSnapshot((snapshot) => {
    const changes = snapshot.docChanges();
    changes.forEach((change) => {
      if (change.type === "added" || change.type === "modified") {
        renderCafe(change.doc);
      } else if (change.type === "removed") {
        const li = document.querySelector(`[data-id="${change.doc.id}"]`);
        li.remove();
      }
    });
  });

cafeList.style.display = "none";
loadingIndicator.style.display = "flex";
