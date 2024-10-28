package logistics.giaglobal.app.shipmenttrack;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import logistics.giaglobal.app.shipment.Shipment;

@Entity
public class ShipmentTrack {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int shipmentTrackId;
	private String shipmentStatus;
	private String date;
	private String time;
	private String currentLocation;
	private String expectedLocation;
	@OneToOne
	private Shipment shipment;
	public int getShipmentTrackId() {
		return shipmentTrackId;
	}
	public void setShipmentTrackId(int shipmentTrackId) {
		this.shipmentTrackId = shipmentTrackId;
	}
	public String getShipmentStatus() {
		return shipmentStatus;
	}
	public void setShipmentStatus(String shipmentStatus) {
		this.shipmentStatus = shipmentStatus;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getCurrentLocation() {
		return currentLocation;
	}
	public void setCurrentLocation(String currentLocation) {
		this.currentLocation = currentLocation;
	}
	public String getExpectedLocation() {
		return expectedLocation;
	}
	public void setExpectedLocation(String expectedLocation) {
		this.expectedLocation = expectedLocation;
	}
	public Shipment getShipment() {
		return shipment;
	}
	public void setShipment(Shipment shipment) {
		this.shipment = shipment;
	}
	
	
	
	
	

}
