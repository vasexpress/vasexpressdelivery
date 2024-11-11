let pageSpinner = document.getElementById("page-spinner");
let pageContent = document.getElementById("page-content");

function getShipments() {
  let shipmentsXhr = new XMLHttpRequest();
  shipmentsXhr.open("GET", `/shipments/`);
  shipmentsXhr.send();
  shipmentsXhr.onreadystatechange = function () {
    if (this.status == 200 && this.readyState == 4) {
      let response = JSON.parse(this.response);
      response.forEach(function (shipment, index) {
        document.getElementById("shipments-root").innerHTML +=
          generateShipments(shipment, index + 1);
        pageSpinner.style.display = "none";
        pageContent.style.display = "block";
      });
    }
  };
}

function generateShipments(shipment, id) {
  return `<div class="w3-row card w3-padding w3-margin-top">
            <a href="/create-shipment.html?tracking=${shipment.shipmentId}">
              <div>
                <div>
                  <p class="no-margin-2 small red">Shipment ID: TX49940LX</p>
                </div>
                <div class="w3-col s1">
                  <p class="small" style="margin-top: 12px">${id}</p>
                </div>
                <div class="w3-col s5">
                  <div>
                    <p class="no-margin-2 small">
                      From: <span class="red">${shipment.senderName}</span>
                    </p>
                    <p class="no-margin-2 small">
                      To: <span class="red">${shipment.receiverName}</span>
                    </p>
                  </div>
                </div>
                <div class="w3-col s6">
                  <div>
                    <p class="no-margin-2 small w3-right">
                      Arrival: <span class="red">-</span>
                    </p>
                    <p class="no-margin-2 small w3-right">
                      Type:
                      <span class="red"></span>
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>
`;
}

getShipments();
