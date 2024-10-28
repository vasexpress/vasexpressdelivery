package logistics.giaglobal.app.shipment;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Shipment {

	@Id
	@Column(length = 128)
	private String shipmentId;
	private String senderName;
	private String senderEmail;
	private String senderMobile;
	private String senderAddress;
	private String receiverName;
	private String receiverEmail;
	private String receiverMobile;
	private String receiverAddress;
	private String shipmentTrace;
	private String deliveryDate;
	private String serviceArea;
	private String destinationArea;
	private String lading;
	private String shipmentType;
	private String shipmentContent;
	private String shipmentQuantity;
	private String shipmentWeight;
	private String shipmentMode;
	private String totalCharge;
	public String getShipmentId() {
		return shipmentId;
	}
	public void setShipmentId(String shipmentId) {
		this.shipmentId = shipmentId;
	}
	public String getSenderName() {
		return senderName;
	}
	public void setSenderName(String senderName) {
		this.senderName = senderName;
	}
	public String getSenderEmail() {
		return senderEmail;
	}
	public void setSenderEmail(String senderEmail) {
		this.senderEmail = senderEmail;
	}
	public String getSenderMobile() {
		return senderMobile;
	}
	public void setSenderMobile(String senderMobile) {
		this.senderMobile = senderMobile;
	}
	public String getSenderAddress() {
		return senderAddress;
	}
	public void setSenderAddress(String senderAddress) {
		this.senderAddress = senderAddress;
	}
	public String getReceiverName() {
		return receiverName;
	}
	public void setReceiverName(String receiverName) {
		this.receiverName = receiverName;
	}
	public String getReceiverEmail() {
		return receiverEmail;
	}
	public void setReceiverEmail(String receiverEmail) {
		this.receiverEmail = receiverEmail;
	}
	public String getReceiverMobile() {
		return receiverMobile;
	}
	public void setReceiverMobile(String receiverMobile) {
		this.receiverMobile = receiverMobile;
	}
	public String getReceiverAddress() {
		return receiverAddress;
	}
	public void setReceiverAddress(String receiverAddress) {
		this.receiverAddress = receiverAddress;
	}
	public String getShipmentTrace() {
		return shipmentTrace;
	}
	public void setShipmentTrace(String shipmentTrace) {
		this.shipmentTrace = shipmentTrace;
	}
	public String getDeliveryDate() {
		return deliveryDate;
	}
	public void setDeliveryDate(String deliveryDate) {
		this.deliveryDate = deliveryDate;
	}
	public String getServiceArea() {
		return serviceArea;
	}
	public void setServiceArea(String serviceArea) {
		this.serviceArea = serviceArea;
	}
	public String getDestinationArea() {
		return destinationArea;
	}
	public void setDestinationArea(String destinationArea) {
		this.destinationArea = destinationArea;
	}
	public String getLading() {
		return lading;
	}
	public void setLading(String lading) {
		this.lading = lading;
	}
	public String getShipmentType() {
		return shipmentType;
	}
	public void setShipmentType(String shipmentType) {
		this.shipmentType = shipmentType;
	}
	public String getShipmentContent() {
		return shipmentContent;
	}
	public void setShipmentContent(String shipmentContent) {
		this.shipmentContent = shipmentContent;
	}
	public String getShipmentQuantity() {
		return shipmentQuantity;
	}
	public void setShipmentQuantity(String shipmentQuantity) {
		this.shipmentQuantity = shipmentQuantity;
	}
	public String getShipmentWeight() {
		return shipmentWeight;
	}
	public void setShipmentWeight(String shipmentWeight) {
		this.shipmentWeight = shipmentWeight;
	}
	public String getShipmentMode() {
		return shipmentMode;
	}
	public void setShipmentMode(String shipmentMode) {
		this.shipmentMode = shipmentMode;
	}
	public String getTotalCharge() {
		return totalCharge;
	}
	public void setTotalCharge(String totalCharge) {
		this.totalCharge = totalCharge;
	}
	
	
	
	
	
}
