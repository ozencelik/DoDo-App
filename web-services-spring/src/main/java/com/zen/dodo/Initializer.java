package com.zen.dodo;

import com.zen.dodo.model.Item;
import com.zen.dodo.model.List;
import com.zen.dodo.model.ListRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.stream.Stream;
import java.util.HashSet;

@Component
class Initializer implements CommandLineRunner {

    private final ListRepository repository;

    public Initializer(ListRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) {
        Stream.of("List I", "List II", "List III",
                "List IV", "List V").forEach(name ->
                repository.save(new List(name))
        );
        
        //Create a demo dependency item for "Job V.I"
        Item dependecyItem = Item.builder().name("Job Dependency")
                .description("Dependency Description")
                .deadline(LocalDate.parse("2018-12-13"))
                .build();

        List list = repository.findByName("List V");
        Item item = Item.builder().name("Job V.I")
                .description("This the demo description")
                .deadline(LocalDate.parse("2018-12-12"))
                .dependencies(Collections.singleton(dependecyItem))
                .build();

        list.setItems(new HashSet<Item>(Arrays.asList(item, dependecyItem)));
        
        repository.save(list);

        repository.findAll().forEach(System.out::println);
    }
}