getShipmentCount();

function getShipmentCount() {
    let shipmentXhr = new XMLHttpRequest();
    shipmentXhr.open("GET", "/shipments", true);
    shipmentXhr.send();

    shipmentXhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let received = 0
            let dispatched = 0
            let middle = 0;
            let delivered = 0;
            let response = JSON.parse(this.response);
            response.forEach(function(shipment) {
                if (shipment.shipmentStage.shipmentStageId == 1) {
                    received++
                }
                else if(shipment.shipmentStage.shipmentStageId == 2) {
                    dispatched++
                }
                else if(shipment.shipmentStage.shipmentStageId == 3) {
                    middle++
                }
                else if(shipment.shipmentStage.shipmentStageId == 4) {
                    delivered++
                }
            })

            document.getElementById("received").textContent = received;
            document.getElementById("dispatched").textContent = dispatched;
            document.getElementById("middle").textContent = middle;
            document.getElementById("delivered").textContent = delivered;

            setTimeout(function() {
                stopSpinner();
            }, 100)
        }
    }
}

function stopSpinner() {
    document.getElementById("spinner").style.display = "none";
    document.getElementById("content").style.display = "block";
}