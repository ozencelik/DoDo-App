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



*/