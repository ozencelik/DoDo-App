package com.zen.dodo.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "user_list")
public class List {

    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String name;
    @ManyToOne(cascade=CascadeType.PERSIST)
    private User user;// Each user may have multiple list but a list belongs only one user.

    @OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    private Set<Item> items; // To Do Items of the specific lists
}