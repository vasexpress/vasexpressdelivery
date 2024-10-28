let selectedHistoryId;

let hasShipmentId = new URLSearchParams(window.location.search).has(
	"shipmentid"
);
if (hasShipmentId) {
	document.getElementById("add-container").style.display = "none";
	document.getElementById("update-container").style.display = "block";
	let shipmentId = new URLSearchParams(window.location.search).get(
		"shipmentid"
	);
	getCountries(shipmentId);

} else {
	document.getElementById("update-container").style.display = "none";
	document.getElementById("add-container").style.display = "block";
	getCountries2();
	getStatuses2();
}

let countries = [];

function getCountries2() {
	let countriesXhr = new XMLHttpRequest();
	countriesXhr.open("GET", "/countries", true);
	countriesXhr.send();

	countriesXhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			countries = JSON.parse(this.response);
			countries.forEach(function(country) {
				document.getElementById("depature").innerHTML += bindCountries(
					country,
					""
				);
			});

			countries.forEach(function(country) {
				document.getElementById("sender-address").innerHTML += bindCountries(
					country,
					""
				);
			});

			countries.forEach(function(country) {
				document.getElementById("destination").innerHTML += bindCountries(
					country,
					""
				);
			});

			countries.forEach(function(country) {
				document.getElementById("receiver-address").innerHTML += bindCountries(
					country,
					""
				);
			});

			countries.forEach(function(country) {
				document.getElementById("history-location").innerHTML += bindCountries(
					country,
					""
				);
			});

			stopSpinner();
		}
	};
}

function getStatuses(shipmentStatusId) {
	let statusesXhr = new XMLHttpRequest();
	statusesXhr.open("GET", `/shipmentstatuses`, true);
	statusesXhr.send();

	statusesXhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(this.response);
			response.forEach(function(status) {
				let selected = "";
				if (status.shipmentStatusId == shipmentStatusId) {
					selected = "selected";
				}
				document.getElementById("status").innerHTML += bindStatus(status, selected)
			})
		}
	};
}

function getStatuses2() {
	let statusesXhr = new XMLHttpRequest();
	statusesXhr.open("GET", `/shipmentstatuses`, true);
	statusesXhr.send();

	statusesXhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(this.response);
			response.forEach(function(status) {
				document.getElementById("status").innerHTML += bindStatus(status, "")
			})
		}
	};
}

function getCountries(shipmentId) {
	let countriesXhr = new XMLHttpRequest();
	countriesXhr.open("GET", "/countries", true);
	countriesXhr.send();

	countriesXhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			countries = JSON.parse(this.response);
			getShipment(shipmentId);
		}
	};
}

function getShipmentHistory(shipmentId) {
	let shipmentHistoryXhr = new XMLHttpRequest();
	shipmentHistoryXhr.open(
		"GET",
		`/shipment/${shipmentId}/histories/`,
		true
	);
	shipmentHistoryXhr.send();

	shipmentHistoryXhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(this.response);
			if (response.length > 0) {
				response.forEach(function(history) {
					document.getElementById("histories-root").innerHTML +=
						bindHistories(history);
				});
			}
		}
	};
}

function getShipment(shipmentId) {
	let shipmentXhr = new XMLHttpRequest();
	shipmentXhr.open("GET", `/shipment/${shipmentId}`, true);
	shipmentXhr.send();

	shipmentXhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(this.response);
			getStatuses(response.shipmentStatus.shipmentStatusId);
			document.getElementById("tracking-id").textContent = response.shipmentId;
			let shipmentStage;
			if (response.shipmentStage.shipmentStageId == 1) {
				shipmentStage = "received";
			} else if (response.shipmentStage.shipmentStageId == 2) {
				shipmentStage = "dispatched";
			} else if (response.shipmentStage.shipmentStageId == 3) {
				shipmentStage = "middle";
			} else if (response.shipmentStage.shipmentStageId == 4) {
				shipmentStage = "delivered";
			}

			changeStage(document.getElementById(shipmentStage));
			countries.forEach(function(country) {
				let selected = "";
				if (country.countryId == response.senderAddress.countryId) {
					selected = "selected";
				}
				document.getElementById("depature").innerHTML += bindCountries(
					country,
					selected
				);
			});

			document.getElementById("shipment-date").value = response.shipmentDate;
			document.getElementById("arrival-date").value = response.deliveryDate;
			document.getElementById("sender-name").value = response.senderName;

			countries.forEach(function(country) {
				let selected = "";
				if (country.countryId == response.senderAddress.countryId) {
					selected = "selected";
				}
				document.getElementById("sender-address").innerHTML += bindCountries(
					country,
					selected
				);
			});
			countries.forEach(function(country) {
				document.getElementById("history-location").innerHTML += bindCountries(
					country,
					""
				);
			});

			countries.forEach(function(country) {
				let selected = "";
				if (country.countryId == response.shipmentDestination.countryId) {
					selected = "selected";
				}
				document.getElementById("destination").innerHTML += bindCountries(
					country,
					selected
				);
			});

			document.getElementById("receiver-name").value = response.receiverName;

			document.getElementById("receiver-address").value = response.receiverAddress;

			document.getElementById("receiver-phone").value = response.receiverPhone;
			document.getElementById("receiver-email").value = response.receiverEmail;
			document.getElementById("sender-phone").value = response.senderPhone;
			document.getElementById("sender-email").value = response.senderEmail;
			document.getElementById("package").value = response.shipmentPackage;
			document.getElementById("reference-code").value = response.referenceCode;
			document.getElementById("weight").value = response.weight;
			document.getElementById("shipment-mode").value = response.shipmentMode;
			document.getElementById("service-type").value = response.serviceType;


			getShipmentHistory(shipmentId);

			setTimeout(function() {
				stopSpinner();
			}, 100);
		}
	};
}

let orderStages = document.querySelectorAll(".order-stage");

document.body.addEventListener("click", function(e) {
	let target = e.target;

	if (target.classList.contains("order-stage-icon")) {
		changeStage(target.parentElement.parentElement);
	} else if (target.id == "reset") {
		reset();
	} else if (target.id == "add") {
		openModal("history-modal");
	} else if (target.id == "close-history-modal") {
		closeModal("history-modal");
	} else if (target.id == "update") {
		update();
	} else if (target.id == "add-shipment") {
		addShipment();
	} else if (target.id == "add-history") {
		addHistory();
	} else if (target.id == "delete") {
		deleteShipment();
	}
	else if (target.classList.contains("history-id")) {
		openModal2(target.textContent);
	}
	else if (target.id == "update-history") {
		updateHistory(selectedHistoryId)
	}
});

function deleteShipment() {
	startSpinner();
	let shipmentId = new URLSearchParams(window.location.search).get(
		"shipmentid"
	);
	let deleteShipmentXhr = new XMLHttpRequest();
	deleteShipmentXhr.open(
		"DELETE",
		`/shipment/${shipmentId}/delete`,
		true
	);
	deleteShipmentXhr.send();

	deleteShipmentXhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			location.href = "/admin.html";
		}
	};
}

function addHistory() {
	startSpinner();
	let shipmentId = new URLSearchParams(window.location.search).get(
		"shipmentid"
	);
	let historyDate = document.getElementById("history-date").value;
	let historyTime = document.getElementById("history-time").value;
	let historyLocation = document.getElementById("history-location").value;
	let historyActivity = document.getElementById("history-activity").value;
	let history = {
		shipment: { shipmentId: shipmentId },
		date: historyDate,
		time: historyTime,
		country: { countryId: historyLocation },
		activity: historyActivity,
	};

	// console.log(history);

	let historyXhr = new XMLHttpRequest();
	historyXhr.open("POST", "/history", true);
	historyXhr.setRequestHeader("Content-type", "application/json");
	historyXhr.send(JSON.stringify(history));

	historyXhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(this.response);
			location.reload();
		}
	};
}

function updateHistory(historyId) {
	startSpinner();
	let shipmentId = new URLSearchParams(window.location.search).get(
		"shipmentid"
	);
	let historyDate = document.getElementById("history-date").value;
	let historyTime = document.getElementById("history-time").value;
	let historyLocation = document.getElementById("history-location").value;
	let historyActivity = document.getElementById("history-activity").value;
	let history = {
		shipment: { shipmentId: shipmentId },
		historyId: historyId,
		date: historyDate,
		time: historyTime,
		country: { countryId: historyLocation },
		activity: historyActivity,
	};

	let historyXhr = new XMLHttpRequest();
	historyXhr.open("PUT", "/history", true);
	historyXhr.setRequestHeader("Content-type", "application/json");
	historyXhr.send(JSON.stringify(history));

	historyXhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			let response = JSON.parse(this.response);
			location.reload();
		}
	};
}

function addShipment() {
	startSpinner();
	let orderStage2;
	for (let i = 0; i < orderStages.length; i++) {
		if (
			orderStages[i].children[1].children[1].textContent == "local_shipping"
		) {
			let orderStageId = orderStages[i].id;
			if (orderStageId == "received") {
				orderStage2 = 1;
			} else if (orderStageId == "dispatched") {
				orderStage2 = 2;
			} else if (orderStageId == "middle") {
				orderStage2 = 3;
			} else if (orderStageId == "delivered") {
				orderStage2 = 4;
			}
		}
	}
	let shipmentDate = document.getElementById("shipment-date").value;
	let arrivalDate = document.getElementById("arrival-date").value;
	let senderName = document.getElementById("sender-name").value;
	let trackingId = document.getElementById("tracking-id").textContent;
	let status = document.getElementById("status").value;
	let receiverPhone = document.getElementById("receiver-phone").value;
	let receiverEmail = document.getElementById("receiver-email").value;
	let senderPhone = document.getElementById("sender-phone").value;
	let senderEmail = document.getElementById("sender-email").value;
	let package = document.getElementById("package").value;
	let referenceCode = document.getElementById("reference-code").value;
	let weight = document.getElementById("weight").value;
	let shipmentMode = document.getElementById("shipment-mode").value;
	let serviceType = document.getElementById("service-type").value;
	let receiverName = document.getElementById("receiver-name").value;
	let receiverAddress = document.getElementById("receiver-address").value;
	let destination = document.getElementById("destination").value;
	let senderAddress = document.getElementById("sender-address").value;
	let depature = document.getElementById("depature").value;



	let shipment = {
		shipmentStage: { shipmentStageId: orderStage2 },
		shipmentDate: shipmentDate,
		deliveryDate: arrivalDate,
		senderName: senderName,
		shipmentStatus: { shipmentStatusId: status },
		receiverPhone: receiverPhone,
		receiverEmail: receiverEmail,
		senderPhone: senderPhone,
		senderEmail: senderEmail,
		shipmentPackage: package,
		referenceCode: referenceCode,
		weight: weight,
		serviceType: serviceType,
		shipmentMode: shipmentMode,
		receiverName: receiverName,
		receiverAddress: receiverAddress,
		shipmentDestination: { countryId: destination },
		senderAddress: { countryId: depature },
	};

	let updateShipmentXhr = new XMLHttpRequest();
	updateShipmentXhr.open("POST", "/shipment", true);
	updateShipmentXhr.setRequestHeader("Content-type", "application/json");
	updateShipmentXhr.send(JSON.stringify(shipment));

	updateShipmentXhr.onreadystatechange = function() {
		if (this.status == 200 && this.readyState == 4) {
			let response = JSON.parse(this.response);
			location.replace(
				`create-shipment.html?shipmentid=${response.shipmentId}`
			);
		}
	};
}

function update() {
	startSpinner();
	let orderStage2;
	for (let i = 0; i < orderStages.length; i++) {
		if (
			orderStages[i].children[1].children[1].textContent == "local_shipping"
		) {
			let orderStageId = orderStages[i].id;
			if (orderStageId == "received") {
				orderStage2 = 1;
			} else if (orderStageId == "dispatched") {
				orderStage2 = 2;
			} else if (orderStageId == "middle") {
				orderStage2 = 3;
			} else if (orderStageId == "delivered") {
				orderStage2 = 4;
			}
		}
	}
	let shipmentDate = document.getElementById("shipment-date").value;
	let arrivalDate = document.getElementById("arrival-date").value;
	let senderName = document.getElementById("sender-name").value;
	let trackingId = document.getElementById("tracking-id").textContent;
	let status = document.getElementById("status").value;
	let receiverPhone = document.getElementById("receiver-phone").value;
	let receiverEmail = document.getElementById("receiver-email").value;
	let senderPhone = document.getElementById("sender-phone").value;
	let senderEmail = document.getElementById("sender-email").value;
	let package = document.getElementById("package").value;
	let referenceCode = document.getElementById("reference-code").value;
	let weight = document.getElementById("weight").value;
	let shipmentMode = document.getElementById("shipment-mode").value;
	let serviceType = document.getElementById("service-type").value;
	let receiverName = document.getElementById("receiver-name").value;
	let receiverAddress = document.getElementById("receiver-address").value;
	let destination = document.getElementById("destination").value;
	let senderAddress = document.getElementById("sender-address").value;
	let depature = document.getElementById("depature").value;

	//	if (status == "moving") {
	//		status = 2;
	//	} else {
	//		status = 1;
	//	}

	let shipment = {
		shipmentStage: { shipmentStageId: orderStage2 },
		shipmentId: trackingId,
		shipmentDate: shipmentDate,
		deliveryDate: arrivalDate,
		senderName: senderName,
		shipmentStatus: { shipmentStatusId: status },
		receiverPhone: receiverPhone,
		receiverEmail: receiverEmail,
		senderPhone: senderPhone,
		senderEmail: senderEmail,
		shipmentPackage: package,
		referenceCode: referenceCode,
		weight: weight,
		serviceType: serviceType,
		shipmentMode: shipmentMode,
		receiverName: receiverName,
		receiverAddress: receiverAddress,
		shipmentDestination: { countryId: destination },
		senderAddress: { countryId: depature },
	};


	let updateShipmentXhr = new XMLHttpRequest();
	updateShipmentXhr.open("PUT", "/shipment", true);
	updateShipmentXhr.setRequestHeader("Content-type", "application/json");
	updateShipmentXhr.send(JSON.stringify(shipment));

	updateShipmentXhr.onreadystatechange = function() {
		if (this.status == 200 && this.readyState == 4) {
			let response = JSON.parse(this.response);
			location.reload();
		}
	};
}

function openModal(modal) {
	document.getElementById(modal).style.display = "block";
}

function openModal2(historyId) {
	selectedHistoryId = historyId;
	startSpinner();
	let updateHistoryXhr = new XMLHttpRequest();
	updateHistoryXhr.open("GET", `/history/${historyId}`, true);
	updateHistoryXhr.send();

	updateHistoryXhr.onreadystatechange = function() {
		if (this.status == 200 && this.readyState == 4) {
			let response = JSON.parse(this.response);
			stopSpinner();
			openModal("history-modal");
			document.getElementById("add-history").innerHTML = "Update"
			document.getElementById("add-history").id = "update-history"

			document.getElementById("history-date").value = response.date
			document.getElementById("history-time").value = response.time;
			countries.forEach(function(country) {
				let selected = "";
				if (country.countryId == response.country.countryId) {
					selected = "selected";
				}
				document.getElementById("history-location").innerHTML += bindCountries(
					country,
					selected
				);
			});
			document.getElementById("history-activity").value = response.activity;
		}
	}
}

function closeModal(modal) {
	document.getElementById(modal).style.display = "none";
}

function changeStage(selectedStage) {
	console.log(selectedStage)
	for (let i = 0; i < orderStages.length; i++) {
		orderStages[i].children[0].classList.add("text-primary");
		orderStages[i].children[1].classList.replace(
			"background-primary-light",
			"background-primary"
		);
		orderStages[i].children[1].children[0].style.display = "none";
		orderStages[i].children[1].children[1].style.display = "block";

		if (orderStages[i].id == selectedStage.id) {
			orderStages[i].children[1].children[1].textContent = "local_shipping";
			break;
		}
	}
}

function reset() {
	for (let i = 0; i < orderStages.length; i++) {
		orderStages[i].children[0].classList.remove("text-primary");
		orderStages[i].children[1].classList.replace(
			"background-primary",
			"background-primary-light"
		);
		orderStages[i].children[1].children[0].style.display = "block";
		orderStages[i].children[1].children[1].style.display = "none";
		orderStages[i].children[1].children[1].textContent = "check";
	}
}

function bindCountries(country, selected) {
	return `
    <option value="${country.countryId}" ${selected}>${country.countryName}</option>
    `;
}

function bindStatus(shipmentStatus, selected) {
	return `
    <option value="${shipmentStatus.shipmentStatusId}" ${selected}>${shipmentStatus.shipmentStatus}</option>
    `;
}

function bindHistories(history) {
	console.log(history)
	return `<div class="w3-row" style="border-bottom: 1px solid rgb(245, 245, 245);">
			  <div
                class="w3-col s1"
                style="
                  padding-left: 6px;
                "
              >
                <p class="no-margin-2 history-id">${history.historyId}</p>
              </div>
              <div
                class="w3-col s3"
                style="
                  padding-left: 6px;
                "
              >
                <p class="no-margin-2">${history.date}</p>
              </div>
              <div
                class="w3-col s2"
                style="
                  border-right: 1px solid rgb(245, 245, 245);
                  padding-left: 6px;
                "
              >
                <p class="no-margin-2">${history.time}</p>
              </div>
              <div
                class="w3-col s3"
                style="
                  border-right: 1px solid rgb(245, 245, 245);
                  padding-left: 6px;
                "
              >
                <p class="no-margin-2">${history.country.countryName}</p>
              </div>
              <div
                class="w3-col s3"
                style="
                  border-right: 1px solid rgb(245, 245, 245);
                  padding-left: 6px;
                "
              >
                <p class="no-margin-2">${history.activity}</p>
              </div>
            </div>`;
}

function stopSpinner() {
	document.getElementById("spinner").style.display = "none";
	document.getElementById("content").style.display = "block";
}
function startSpinner() {
	document.getElementById("content").style.display = "none";
	document.getElementById("spinner").style.display = "block";
}
