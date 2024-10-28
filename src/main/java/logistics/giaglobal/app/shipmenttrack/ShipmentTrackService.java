package logistics.giaglobal.app.shipmenttrack;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import logistics.giaglobal.app.shipment.ShipmentRepository;

@Service
public class ShipmentTrackService {
	@Autowired
	private ShipmentTrackRepository shipmentTrackRepository;
	
	
	public ShipmentTrack addShipmentTrack(ShipmentTrack shipmentTrack) {
		return shipmentTrackRepository.save(shipmentTrack);
	}
	
	public List<ShipmentTrack> getShipmentTracksByShipment(String shipmentId) {
		List<ShipmentTrack> shipmentTracks = (List<ShipmentTrack>) shipmentTrackRepository.findAll();
		List<ShipmentTrack> newShipmentTracks = new ArrayList<ShipmentTrack>();
		for (ShipmentTrack shipmentTrack : shipmentTracks) {
			if (shipmentTrack.getShipment().getShipmentId().contains(shipmentId)) {
				newShipmentTracks.add(shipmentTrack);
			}
		}
		return newShipmentTracks;
	}
	
	public void deleteShipmentTrack(int shipmentTrackId) {
		shipmentTrackRepository.deleteById(shipmentTrackId);
	}
}
