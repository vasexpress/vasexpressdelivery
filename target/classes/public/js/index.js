let isCounterStarted;
let valueDisplays = document.querySelectorAll(".num");
let interval = 1000;
let isNavOpened;

function startCounter() {
  valueDisplays.forEach(function (valueDisplay) {
    let startValue = 0;
    let endValue = parseInt(valueDisplay.getAttribute("data-val"));

    let duration = Math.floor(interval / endValue);
    let counter = setInterval(function () {
      startValue += 87;
      valueDisplay.textContent = numberWithCommas(startValue);
      if (startValue > endValue) {
        valueDisplay.textContent = numberWithCommas(endValue) + " +";
        clearInterval(counter);
      }
    }, duration);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

window.onscroll = function () {
  if (document.documentElement.scrollTop > 2070) {
    if (!isCounterStarted) {
      isCounterStarted = true;
      startCounter();
    }
  }
};

document.addEventListener("click", function (e) {
  let targetId = e.target.id;

  if (targetId == "track") {
    location.href = `/tracker.html?shipmentid=${
      document.getElementById("edit-pins").value
    }`;
  } else if (targetId == "sign-in") {
    signIn();
  } else if (targetId == "toggle-nav") {
    toggleNav(e.target);
  }
});

function toggleNav(target) {
  if (isNavOpened) {
    document.getElementById("nav-items").style.display = "none";
    isNavOpened = false;
    target.classList.replace("fa-times", "fa-bars");
    target.classList.remove("w3-text-red")
  } else {
    document.getElementById("nav-items").style.display = "block";
    isNavOpened = true;
    target.classList.replace("fa-bars", "fa-times");
    target.classList.add("w3-text-red")
  }
}

function signIn() {
  let userName = document.getElementById("edit-username").value;
  let password = document.getElementById("edit-password").value;
  console.log(userName, password);
  let signInXhr = new XMLHttpRequest();
  signInXhr.open("GET", `/user/${userName}/${password}`, true);
  signInXhr.send();

  signInXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);
      if (response != null) {
        location.replace("/admin.html");
      }
    }
  };
}
