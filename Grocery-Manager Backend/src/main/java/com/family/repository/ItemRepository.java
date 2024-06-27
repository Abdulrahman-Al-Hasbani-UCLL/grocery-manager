package com.family.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.family.model.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    public Item findByName(String name);
}
