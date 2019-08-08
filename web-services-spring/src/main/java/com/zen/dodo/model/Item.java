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
import java.time.LocalDate;
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
    private LocalDate deadline;
    private String name;
    private String description;
    private boolean status;//false: not completed, true: completed.
    @OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    private Set<Item> dependencies;
}

/*
        emptyItem = {
    name: '',
    user: null,
    items: [
      {
          id: '',
          deadline: '',
          name: '',
          description: '',
          dependencies: []
      }
    ]
  };

*/