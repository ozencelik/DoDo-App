package com.zen.dodo.model;

import org.springframework.data.jpa.repository.JpaRepository;
//import java.util.List;

public interface ListRepository extends JpaRepository<List, Long> {
    List findByName(String name);
    java.util.List<List> findAllByUserId(String id);
}