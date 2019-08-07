package com.zen.dodo.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;// Used for dependencies between item OnetoMany

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.time.Instant;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Item {

    @Id
    @GeneratedValue
    private Long id;
    private Instant deadline;
    private String name;
    private String description;
    @OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    private Set<Item> dependencies;
}

/*

package com.zen.dodo.web;

import com.zen.dodo.model.List;
import com.zen.dodo.model.ListRepository;
import com.zen.dodo.model.User;
import com.zen.dodo.model.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.security.Principal;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
class ListController {

    private final Logger log = LoggerFactory.getLogger(ListController.class);
    private ListRepository listRepository;
    private UserRepository userRepository;

    public ListController(ListRepository listRepository, UserRepository userRepository) {
        this.listRepository = listRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/lists")
    Collection<List> lists(Principal principal) {
        return listRepository.findAllByUserId(principal.getName());
    }

    @GetMapping("/list/{id}")
    ResponseEntity<?> getList(@PathVariable Long id) {
        Optional<List> list = listRepository.findById(id);
        return list.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/list")
    ResponseEntity<List> createList(@Valid @RequestBody List list,
    @AuthenticationPrincipal OAuth2User principal) throws URISyntaxException {
        log.info("Request to create list: {}", list);
        Map<String, Object> details = principal.getAttributes();
        String userId = details.get("sub").toString();

        // check to see if user already exists
        Optional<User> user = userRepository.findById(userId);

        list.setUser(user.orElse(new User(userId,
                        details.get("name").toString(), details.get("email").toString())));

        List result = listRepository.save(list);
        return ResponseEntity.created(new URI("/api/list/" + result.getId()))
                .body(result);
    }

    @PutMapping("/list/{id}")
    ResponseEntity<List> updateList(@Valid @RequestBody List list) {
        log.info("Request to update list: {}", list);
        List result = listRepository.save(list);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/list/{id}")
    public ResponseEntity<?> deleteList(@PathVariable Long id) {
        log.info("Request to delete list: {}", id);
        listRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}

*/