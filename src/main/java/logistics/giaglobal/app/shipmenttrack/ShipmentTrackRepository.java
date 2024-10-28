package logistics.giaglobal.app.shipmenttrack;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ShipmentTrackRepository extends CrudRepository<ShipmentTrack, Integer> {
	public List<ShipmentTrack> findByShipmentShipmentId(String shipmentId);
}
