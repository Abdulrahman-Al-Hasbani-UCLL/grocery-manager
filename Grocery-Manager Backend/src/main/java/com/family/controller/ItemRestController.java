package com.family.controller;

import org.springframework.web.bind.annotation.RestController;

import com.family.model.Item;
import com.family.service.ItemService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@CrossOrigin
@RestController
@RequestMapping("/items")
public class ItemRestController {
    private ItemService itemService;

    public ItemRestController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public List<Item> getAllItems() {
        return itemService.getAllItems();
    }
    
    @GetMapping(params = "name")
    public Item getItemByName(@RequestParam(required = false) String name) {
        return itemService.getItemByName(name);
    }

    @PostMapping
    public Item addItem(@Valid @RequestBody Item item) {
        return itemService.addItem(item);
    }

    @DeleteMapping
    public void deleteItem(@RequestParam String name) {
        itemService.deleteItemByName(name);
    }

}
