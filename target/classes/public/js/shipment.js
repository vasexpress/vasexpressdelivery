let shipmentStage = new URLSearchParams(window.location.search).get("stage");

document.getElementById("snackbar").textContent = shipmentStage + " Shipments";

if (shipmentStage == "received") {
  getShipments("received");
} else if (shipmentStage == "dispatched") {
  getShipments("dispatched");
} else if (shipmentStage == "middle-staged") {
  getShipments("middle-staged");
} else if (shipmentStage == "delivered") {
  getShipments("delivered");
}

function getShipments(shipmentStage) {
  let shipmentsXhr = new XMLHttpRequest();
  shipmentsXhr.open("GET", `/shipment/stage/${shipmentStage}`, true);
  shipmentsXhr.send();

  shipmentsXhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let response = JSON.parse(this.response);

      if (response.length > 0) {
        response.forEach(function (shipment, index) {
          document.getElementById("shipments-root").innerHTML += bindShipments(
            index + 1,
            shipment
          );
        });
      }
      setTimeout(function () {
        stopSpinner();
      }, 100);
    }
  };
}

function bindShipments(index, shipment) {
  console.log(shipment);
  return `
    <div class="w3-row card w3-padding w3-margin-top">
    <a href="create-shipment.html?shipmentid=${shipment.shipmentId}">
    <div>
    <div>
      <p class="no-margin-2 small bold text-primary">
        Shipment ID: ${shipment.shipmentId}
      </p>
    </div>
    <div class="w3-col s1">
      <p class="small bold" style="margin-top: 12px">${index}</p>
    </div>
    <div class="w3-col s5">
      <div>
        <p class="no-margin-2 small bold">
          From: <span class="text-primary">${shipment.senderName}</span>
        </p>
        <p class="no-margin-2 small bold">
          To: <span class="text-primary">${shipment.receiverName}</span>
        </p>
      </div>
    </div>
    <div class="w3-col s6">
      <div>
        <p class="no-margin-2 small bold w3-right">
          Arrival: <span class="text-primary">${shipment.deliveryDate}</span>
        </p>
        <p class="no-margin-2 small bold w3-right">
          Type:
          <span class="text-primary">${shipment.shipmentMode}</span>
        </p>
      </div>
    </div>
    </div>
    </a>
  </div>
    `;
}

function stopSpinner() {
  document.getElementById("spinner").style.display = "none";
  document.getElementById("content").style.display = "block";
}
