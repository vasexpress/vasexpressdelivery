package logistics.giaglobal.app.shipmenttrack;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class ShipmentTrackController {
	
	@Autowired
	private ShipmentTrackService shipmentTrackService;
	
	@RequestMapping(method = RequestMethod.POST, value = "/shipmenttrack")
	public ShipmentTrack addShipmentTrack(@RequestBody ShipmentTrack shipmentTrack) {
		return shipmentTrackService.addShipmentTrack(shipmentTrack);
	}
	@RequestMapping("/shipmenttrack/{shipmentId}")
	public List<ShipmentTrack> getShipmentTracksByShipment(@PathVariable String shipmentId) {
		return (List<ShipmentTrack>) shipmentTrackService.getShipmentTracksByShipment(shipmentId);
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/shipmenttrack/{shipmentTrackId}/delete")
	public void deleteShipmentTrack(@PathVariable int shipmentTrackId) {
		shipmentTrackService.deleteShipmentTrack(shipmentTrackId);
	}

}
