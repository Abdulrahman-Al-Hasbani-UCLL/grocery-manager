package com.family.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.family.model.DomainException;
import com.family.model.User;
import com.family.repository.UserRepository;

@Service
public class UserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    private boolean existingUserByName(String name) {
        if (getUserByName(name) != null) {
            return true; 
        }
        return false;
    }
    private boolean checkCorrectPassword(String name,String password) {
        User temp = userRepository.findByName(name);
        if (password == temp.getPassword()) {
            return true;
        }
        return false;
    }
        

    public User getUserByName(String name) {    
        return userRepository.findByName(name);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User addUser(User user) {
        if (existingUserByName(user.getName())) {
            System.out.println("User already exists.");
            throw new DomainException("User already exists.");
        }
        return userRepository.save(user);
    }

    public void ResetRepository() {
        userRepository.deleteAll();
    }

    public boolean checkUserLogin(User user) {
        if (existingUserByName(user.getName()) == false ) {
            return false;
        }
        if (checkCorrectPassword(user.getName(), user.getPassword())) {
            return false;
        }

        return true;
    }

    public int count() {
        List<User> templ = new ArrayList<>();
        templ.addAll(getAllUsers());
        return templ.size();
    }

}
