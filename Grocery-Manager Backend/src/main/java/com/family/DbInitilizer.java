package com.family;

import org.springframework.stereotype.Component;

import com.family.model.Item;
import com.family.model.User;
import com.family.service.ItemService;
import com.family.service.UserService;

import jakarta.annotation.PostConstruct;

@Component
public class DbInitilizer {
    private UserService userService;
    private ItemService itemService; // Assuming an ItemService exists

    public DbInitilizer(UserService userService, ItemService itemService) {
        this.userService = userService;
        this.itemService = itemService;
    }

    @PostConstruct
    public void initDb() {
        // Add a user
        userService.addUser(new User("Test User", "password123"));

        // Add a few items
        itemService.addItem(new Item("Milk", "Groceries", "1 gallon of milk", "Test User"));
        itemService.addItem(new Item("Bread", "Groceries", "Whole wheat bread", "Test User"));
        itemService.addItem(new Item("Apples", "Groceries", "A dozen of green apples", "Test User"));
    }
}