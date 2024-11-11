let senderName = document.getElementById("sender-name");
let senderEmail = document.getElementById("sender-email");
let senderMobile = document.getElementById("sender-mobile");
let senderAddress = document.getElementById("sender-address");
let receiverName = document.getElementById("receiver-name");
let receiverEmail = document.getElementById("receiver-email");
let receiverMobile = document.getElementById("receiver-mobile");
let receiverAddress = document.getElementById("receiver-address");
let shipmentTrace = document.getElementById("shipment-trace");
let trackingNumber = document.getElementById("tracking-no");
let trackingNumber2 = document.getElementById("tracking-no-2");
let deliveryDate = document.getElementById("delivery-date");
let serviceArea = document.getElementById("service-area");
let destinationArea = document.getElementById("destination-area");
let lading = document.getElementById("lading");
let shipmentType = document.getElementById("shipment-type");
let shipmentContent = document.getElementById("shipment-content");
let shipmentQuantity = document.getElementById("shipment-quantity");
let shipmentWeight = document.getElementById("shipment-weight");
let shipmentMode = document.getElementById("shipment-mode");
let totalCharge = document.getElementById("total-charge");
let trackModal = document.getElementById("track-modal");
let date = document.getElementById("date");
let time = document.getElementById("time");
let currentLocation = document.getElementById("current-location");
let expectedLocation = document.getElementById("expected-location");
let shipmentStatus = document.getElementById("shipment-status");
let shipmentTraceInput = document.getElementById("shipment-trace-input");
let pageSpinner = document.getElementById("page-spinner");
let pageContent = document.getElementById("page-content");
let shipmentTrackElement = document.getElementById("shipment-track");
let shipmentAction = document.getElementById("shipment-action");
let updateShipmentContainer = document.getElementById(
  "update-shipment-container"
);
let createShipmentContainer = document.getElementById(
  "create-shipment-container"
);
let tracks = [];

let hasTrackingNumber = new URLSearchParams(window.location.search).has(
  "tracking"
);
if (hasTrackingNumber) {
  pageContent.style.display = "none";
  pageSpinner.style.display = "flex";
  createShipmentContainer.style.display = "none";
  updateShipmentContainer.style.display = "block";
  shipmentAction.textContent = "Update Shipment"
  trackingNumber = new URLSearchParams(window.location.search).get("tracking");
  getShipment(trackingNumber);
}

document.body.addEventListener("click", function (e) {
  let targetId = e.target.id;
  if (e.target.classList.contains("fa-close")) {
    let shipmentTrackId =
      e.target.parentElement.parentElement.parentElement.children[0].value;
    if (shipmentTrackId != 0) {
      deleteShipmentTrack(shipmentTrackId);
    }
  }
  if (targetId == "add-track") {
    trackModal.style.display = "block";
  } else if (targetId == "close-modal") {
    trackModal.style.display = "none";
  } else if (targetId == "create-shipment") {
    pageSpinner.style.display = "flex";
    pageContent.style.display = "none";
    createShipment();
  } else if (targetId == "create-track") {
    createTrack();
    trackModal.style.display = "none";
  }
  else if(targetId == "update-shipment") {
    updateShipment(trackingNumber)
  }
  else if(targetId == "delete-shipment") {
    deleteShipment(trackingNumber)
  }
});

function createTrack() {
  trackObj = {
    date: date.value,
    time: time.value,
    currentLocation: currentLocation.value,
    expectedLocation: expectedLocation.value,
    shipmentStatus: shipmentStatus.value,
  };

  tracks.push(trackObj);

  shipmentTrackElement.innerHTML += generateShipmentTrack(trackObj);
}

function createShipment() {
  let shipment = {
    senderName: senderName.value,
    senderEmail: senderEmail.value,
    senderMobile: senderMobile.value,
    senderAddress: senderAddress.value,
    receiverName: receiverName.value,
    receiverEmail: receiverEmail.value,
    receiverMobile: receiverMobile.value,
    receiverAddress: receiverAddress.value,
    shipmentTrace: shipmentTraceInput.value,
    deliveryDate: deliveryDate.value,
    serviceArea: serviceArea.value,
    destinationArea: destinationArea.value,
    lading: lading.value,
    shipmentType: shipmentType.value,
    shipmentContent: shipmentContent.value,
    shipmentQuantity: shipmentQuantity.value,
    shipmentWeight: shipmentWeight.value,
    shipmentMode: shipmentMode.value,
    totalCharge: totalCharge.value,
  };

  let shipmentXhr = new XMLHttpRequest();
  shipmentXhr.open("POST", "/shipment", true);
  shipmentXhr.setRequestHeader("Content-type", "application/json");
  shipmentXhr.send(JSON.stringify(shipment));

  shipmentXhr.onreadystatechange = function () {
    if ((this.status == 200) & (this.readyState == 4)) {
      let response = JSON.parse(this.response);
      tracks.forEach(function (track) {
        shipment = { shipmentId: response.shipmentId };
        track.shipment = shipment;
        createShipmentTrack(track);
      });
      pageSpinner.style.display = "none";
      pageContent.style.display = "block";
    }
  };
}

function createShipmentTrack(shipmentTrack) {
  let shipmentTrackXhr = new XMLHttpRequest();
  shipmentTrackXhr.open("POST", "/shipmenttrack", true);
  shipmentTrackXhr.setRequestHeader("Content-type", "application/json");
  shipmentTrackXhr.send(JSON.stringify(shipmentTrack));

  shipmentTrackXhr.onreadystatechange = function () {
    if ((this.status == 200) & (this.readyState == 4)) {
      let response = JSON.parse(this.response);
      let currentUrl = window.location.href;
          currentUrl += `?tracking=${shipmentTrack.shipment.shipmentId}`;
          window.location.href = currentUrl;
    }
  };
}

function getShipment(shipmentId) {
  let shipmentXhr = new XMLHttpRequest();
  shipmentXhr.open("GET", `/shipment/${shipmentId}`);
  shipmentXhr.send();
  shipmentXhr.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      let response = JSON.parse(this.response);
      senderName.value = response.senderName;
      senderEmail.value = response.senderEmail;
      senderMobile.value = response.senderMobile;
      senderAddress.value = response.senderAddress;
      receiverName.value = response.receiverName;
      receiverEmail.value = response.receiverEmail;
      receiverMobile.value = response.receiverMobile;
      receiverAddress.value = response.receiverAddress;
      trackingNumber2.innerText = response.shipmentId;
      deliveryDate.value = response.deliveryDate;
      serviceArea.value = response.serviceArea;
      destinationArea.value = response.destinationArea;
      lading.value = response.lading;
      shipmentType.value = response.shipmentType;
      shipmentContent.value = response.shipmentContent;
      shipmentQuantity.value = response.shipmentQuantity;
      shipmentWeight.value = response.shipmentWeight;
      shipmentMode.value = response.shipmentMode;
      totalCharge.value = response.totalCharge;
      shipmentTraceInput.value = response.shipmentTrace;

      getShipmentTracksByShipment(shipmentId);
    }
  };
}

function getShipmentTracksByShipment(shipmentId) {
  let shipmentTrackXhr = new XMLHttpRequest();
  shipmentTrackXhr.open(
    "GET",
    `/shipmenttrack/${shipmentId}`,
    true
  );
  shipmentTrackXhr.send();

  shipmentTrackXhr.onreadystatechange = function () {
    if ((this.status == 200) & (this.readyState == 4)) {
      let response = JSON.parse(this.response);
      response.forEach(function (track) {
        shipmentTrackElement.innerHTML += generateShipmentTrack2(track);
      });
      pageContent.style.display = "block";
      pageSpinner.style.display = "none";
    }
  };
}

function deleteShipmentTrack(shipmentTrackId) {
  let shipmentTrackXhr = new XMLHttpRequest();
  shipmentTrackXhr.open(
    "DELETE",
    `/shipmenttrack/${shipmentTrackId}/delete`,
    true
  );
  shipmentTrackXhr.send();

  shipmentTrackXhr.onreadystatechange = function () {
    if ((this.status == 200) & (this.readyState == 4)) {
      location.reload();
    }
  };
}

function updateShipment() {
  let shipment = {
    shipmentId: trackingNumber,
    senderName: senderName.value,
    senderEmail: senderEmail.value,
    senderMobile: senderMobile.value,
    senderAddress: senderAddress.value,
    receiverName: receiverName.value,
    receiverEmail: receiverEmail.value,
    receiverMobile: receiverMobile.value,
    receiverAddress: receiverAddress.value,
    shipmentTrace: shipmentTraceInput.value,
    deliveryDate: deliveryDate.value,
    serviceArea: serviceArea.value,
    destinationArea: destinationArea.value,
    lading: lading.value,
    shipmentType: shipmentType.value,
    shipmentContent: shipmentContent.value,
    shipmentQuantity: shipmentQuantity.value,
    shipmentWeight: shipmentWeight.value,
    shipmentMode: shipmentMode.value,
    totalCharge: totalCharge.value,
  };

  let shipmentXhr = new XMLHttpRequest();
  shipmentXhr.open("PUT", "/shipment", true);
  shipmentXhr.setRequestHeader("Content-type", "application/json");
  shipmentXhr.send(JSON.stringify(shipment));

  shipmentXhr.onreadystatechange = function () {
    if ((this.status == 200) & (this.readyState == 4)) {
      let response = JSON.parse(this.response);
      tracks.forEach(function (track) {
        shipment = { shipmentId: response.shipmentId };
        track.shipment = shipment;
        createShipmentTrack(track);
        
      });
      pageSpinner.style.display = "none";
      location.reload();
    }
  };
}

function deleteShipment() {
  pageContent.style.display = "none"
  pageSpinner.style.display = "flex";
  let shipmentXhr = new XMLHttpRequest();
  shipmentXhr.open(
    "DELETE",
    `/shipment/${trackingNumber}/delete`,
    true
  );
  shipmentXhr.send();

  shipmentXhr.onreadystatechange = function () {
    if ((this.status == 200) & (this.readyState == 4)) {
      location.href = "/admin.html"
    }
  };
}

function generateShipmentTrack(track) {
  return `<div class="w3-row" style="padding: 0px 0px">
              <input hidden value="0" />
              <div class="w3-col s3" style="text-align: right">
                <div>${track.date}</div>
                <div>${track.time}</div>
              </div>
              <div class="w3-col s2">
                <div style="text-align: center">
                  <img
                    src="./assets/img/current.svg"
                    alt=""
                    style="width: 20px"
                  />
                  <div style="display: flex; justify-content: center">
                    <div
                      style="
                        height: 130px;
                        width: 1px;
                        background-color: rgb(223, 223, 223);
                      "
                    ></div>
                  </div>
                </div>
              </div>
              <div class="w3-col s4">
                <div style="font-weight: 600">${track.shipmentStatus}</div>
                <div>${track.currentLocation}</div>
                <div>${track.expectedLocation}</div>
                <div
                  style="
                    padding: 0px 8px;
                    background-color: rgb(116, 116, 116);
                    color: white;
                    width: fit-content;
                    font-size: 10px;
                  "
                >
                  IN TRANSIT
                </div>
              </div>
              
            </div>`;
}

function generateShipmentTrack2(track) {
  return `<div class="w3-row" style="padding: 0px 0px">
              <input hidden value="${track.shipmentTrackId}" />
              <div class="w3-col s3" style="text-align: right">
                <div>${track.date}</div>
                <div>${track.time}</div>
              </div>
              <div class="w3-col s2">
                <div style="text-align: center">
                  <img
                    src="./assets/img/current.svg"
                    alt=""
                    style="width: 20px"
                  />
                  <div style="display: flex; justify-content: center">
                    <div
                      style="
                        height: 130px;
                        width: 1px;
                        background-color: rgb(223, 223, 223);
                      "
                    ></div>
                  </div>
                </div>
              </div>
              <div class="w3-col s4">
                <div style="font-weight: 600">${track.shipmentStatus}</div>
                <div>${track.currentLocation}</div>
                <div>${track.expectedLocation}</div>
                <div
                  style="
                    padding: 0px 8px;
                    background-color: rgb(116, 116, 116);
                    color: white;
                    width: fit-content;
                    font-size: 10px;
                  "
                >
                  IN TRANSIT
                </div>
              </div>
              <div class="w3-col s2">
                <div style="display: flex; justify-content: right; margin-top: 3px;">
                  <span class="fa fa-close w3-text-red"></span>
              </div>
            </div>`;
}
