package logistics.giaglobal.app.owner;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OwnerService {
	@Autowired
	private OwnerRepository userRepository;
	
	public Owner addUser(Owner user) {
		return userRepository.save(user);
	}

	public Optional<Owner> getUser(String userName, String password) {
		return userRepository.findByUserNameAndPassword(userName, password);
	}

}
