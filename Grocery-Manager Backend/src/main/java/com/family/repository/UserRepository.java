package com.family.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.family.model.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    public User findByName(String name);
}
