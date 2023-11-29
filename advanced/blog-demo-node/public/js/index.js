const deleteBlog = document.querySelector("div#delete");

deleteBlog.addEventListener("click", (e) => {
  const endpoint = `/blogs/${deleteBlog.getAttribute("data-doc")}`;
  fetch(endpoint, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => (window.location.href = data.redirect))
    .catch((error) => console.log(error));
});
