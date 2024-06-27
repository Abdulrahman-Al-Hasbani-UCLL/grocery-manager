package com.family;

import org.springframework.stereotype.Component;

import com.family.model.Item;
import com.family.model.User;
import com.family.service.ItemService;
import com.family.service.UserService;

import jakarta.annotation.PostConstruct;

@Component
public class DbInitilizer {
    private final UserService userService;
    private final ItemService itemService;

    public DbInitilizer(UserService userService, ItemService itemService) {
        this.userService = userService;
        this.itemService = itemService;
    }

    @PostConstruct
    public void initDb() {
        if (userService.count() == 0) { // Check if the database is empty
            // Add the users
            userService.addUser(new User("Test User", "password123"));
            userService.addUser(new User("DemoX200", "t"));
        }

        if (itemService.count() == 0) { // Check if the database is empty
            // Add a few items
            itemService.addItem(new Item("Milk", "Groceries store", "1 gallon of milk", "Test User", 1));
            itemService.addItem(new Item("Bread", "Groceries store", "Whole wheat bread", "Test User", 3));
            itemService.addItem(new Item("Apples", "Groceries store", "A dozen of green apples", "Test User", 1));

            itemService.addItem(new Item("Battery", "Appliances store", "AAA", "DemoX200",1));
            itemService.addItem(new Item("TV", "Appliances store 2", "Big 80 inch tv please", "DemoX200",1));
            
            itemService.addItem(new Item("Sheep", "Farm", "1x", "Test User"));
        }
    }
}