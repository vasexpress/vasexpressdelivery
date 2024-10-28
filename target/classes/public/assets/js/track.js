let senderName = document.getElementById("sender-name");
let senderEmail = document.getElementById("sender-email");
let senderMobile = document.getElementById("sender-mobile");
let senderAddress = document.getElementById("sender-address");
let receiverName = document.getElementById("receiver-name");
let receiverEmail = document.getElementById("receiver-email");
let receiverMobile = document.getElementById("receiver-mobile");
let receiverAddress = document.getElementById("receiver-address");
let shipmentTrace = document.getElementById("shipment-trace");
let trackingNumber1 = document.getElementById("tracking-no");
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
let shipmentTrack = document.getElementById("shipment-track")

let hasTrackingNumber = new URLSearchParams(window.location.search).has("tracking");
if (hasTrackingNumber) {
    trackingNumber = new URLSearchParams(window.location.search).get("tracking");
    getShipment(trackingNumber);
}

function getShipment(shipmentId) {
  let shipmentXhr = new XMLHttpRequest();
  shipmentXhr.open("GET", `http://127.0.0.1:3000/shipment/${shipmentId}`);
  shipmentXhr.send();
  shipmentXhr.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      let response = JSON.parse(this.response);
      senderName.innerText = response.senderName;
      senderEmail.innerText = response.senderEmail;
      senderMobile.innerText = response.senderMobile;
      senderAddress.innerText = response.senderAddress;
      receiverName.innerText = response.receiverName;
      receiverEmail.innerText = response.receiverEmail;
      receiverMobile.innerText = response.receiverMobile;
      receiverAddress.innerText = response.receiverAddress;
      trackingNumber1.innerText = response.shipmentId
      deliveryDate.innerText = response.deliveryDate;
      serviceArea.innerText = response.serviceArea;
      destinationArea.innerText = response.destinationArea;
      lading.innerText = response.lading;
      shipmentType.innerText = response.shipmentType;
      shipmentContent.innerText = response.shipmentContent;
      shipmentQuantity.innerText = response.shipmentQuantity;
      shipmentWeight.innerText = response.shipmentWeight;
      shipmentMode.innerText = response.shipmentMode;
      totalCharge.innerText = response.totalCharge;

      let shipmentTraces = response.shipmentTrace.split(',');
      shipmentTraces.forEach(function(trace) {
        shipmentTrace.innerHTML += generateShipmentTrace(trace)
      })
      getShipmentTracksByShipment(shipmentId)
    }
  };
}

function getShipmentTracksByShipment(shipmentId) {
  let shipmentTrackXhr = new XMLHttpRequest();
  shipmentTrackXhr.open("GET",  `http://127.0.0.1:3000/shipmenttrack/${shipmentId}`, true);
  shipmentTrackXhr.send();

  shipmentTrackXhr.onreadystatechange = function() {
    if (this.status == 200 & this.readyState == 4) {
      let response = JSON.parse(this.response);
      response.forEach(function(track) {
        shipmentTrack.innerHTML += generateShipmentTrack(track)
      })
    }
  }
}

function generateShipmentTrack(track) {
  return `<div class="w3-row" style="padding: 0px 0px">
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
            </div>`
}

function generateShipmentTrace(trace) {
  return `<span
              ><img src="./assets/img/arw.gif" alt="" style="width: 30px"
            /></span><span style="padding: 0px 6px">${trace}</span>
            `
}
