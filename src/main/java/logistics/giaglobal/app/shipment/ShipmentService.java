package logistics.giaglobal.app.shipment;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShipmentService {
	
	@Autowired
	private ShipmentRepository shipmentRepository;
	
	public Shipment addShipment(Shipment shipment) {
		
		return shipmentRepository.save(shipment);
	}
	
	public Optional<Shipment> getShipment(String shipmentId) {
		return shipmentRepository.findById(shipmentId);
	}
	
	public List<Shipment> getShipments() {
		return (List<Shipment>) shipmentRepository.findAll();
	}
	
	
	
	public void deleteShipment(String shipmentId) {
		shipmentRepository.deleteById(shipmentId);
	}

}
