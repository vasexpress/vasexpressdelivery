package logistics.giaglobal.app.owner;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OwnerRepository extends CrudRepository<Owner, Integer> {
	public Optional<Owner> findByUserNameAndPassword(String userName, String password);

}
