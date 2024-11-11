document.body.addEventListener("click", function(e) {
    if (e.target.name == "submit") {
        e.preventDefault();
       location.href = `/track-result.html?tracking=${e.target.previousElementSibling.value}`
    }
})