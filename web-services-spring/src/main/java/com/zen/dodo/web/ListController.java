package com.zen.dodo.web;

import com.zen.dodo.model.List;
import com.zen.dodo.model.ListRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api")
class ListController {

    private final Logger log = LoggerFactory.getLogger(ListController.class);
    private ListRepository listRepository;

    public ListController(ListRepository listRepository) {
        this.listRepository = listRepository;
    }

    @GetMapping("/lists")
    Collection<List> lists() {
        return listRepository.findAll();
    }

    @GetMapping("/list/{id}")
    ResponseEntity<?> getList(@PathVariable Long id) {
        Optional<List> list = listRepository.findById(id);
        return list.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/list")
    ResponseEntity<List> createList(@Valid @RequestBody List list) throws URISyntaxException {
        log.info("Request to create list: {}", list);
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
        log.info("Request to delete group: {}", id);
        listRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}