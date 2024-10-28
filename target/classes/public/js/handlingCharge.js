let companyName = document.getElementById("company-name-etx");
let companyStreet = document.getElementById("company-street-address-etx");
let companyPhone = document.getElementById("company-phone-etx");
let companyMail = document.getElementById("company-mail-etx");
let clientName = document.getElementById("client-name-etx");
let date = document.getElementById("date-etx");
let payment = document.getElementById("payment-etx");
let total = document.getElementById("total-etx");
let totalText = document.getElementById("total-text-etx");
let balance = document.getElementById("balance-etx");

document.body.addEventListener("click", function (e) {
  let targetId = e.target.id;

  if (targetId == "create") {
    createReceipt();
  } else if (targetId == "download") {
    let pdf = document.getElementById("pdf");
    let opt = {
      filename: "GIA-COURIER Invoice.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(pdf).save();
  }
});

function createReceipt() {
  document.getElementById("receipt-creator").style.display = "none";

  document.getElementById("company-name").textContent = companyName.value;
  document.getElementById("street-address").textContent = companyStreet.value;
  document.getElementById("phone").textContent = companyPhone.value;
  document.getElementById("email").textContent = companyMail.value;
  document.getElementById("date").textContent = date.value;
  document.getElementById("name").textContent = clientName.value;
  document.getElementById("payment").textContent = payment.value;
  document.getElementById("amount").textContent = totalText.value;
  document.getElementById("total-amount").textContent = total.value;
  document.getElementById("balance").textContent = balance.value;


  document.getElementById("receipt").style.display = "block";
}
