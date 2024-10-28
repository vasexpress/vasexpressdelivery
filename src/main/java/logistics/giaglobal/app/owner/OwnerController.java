package logistics.giaglobal.app.owner;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OwnerController {

	@Autowired
	private OwnerService userService;
	
	
	@RequestMapping(method = RequestMethod.POST, value="/user")
	public Owner addUser(@RequestBody Owner user) {
		return userService.addUser(user);
	}
	
	@CrossOrigin(maxAge = 3600)
	@RequestMapping("/user/{userName}/{password}")
	public Optional<Owner> getUser(@PathVariable String userName, @PathVariable String password) {
		return userService.getUser(userName, password);
	}
}
