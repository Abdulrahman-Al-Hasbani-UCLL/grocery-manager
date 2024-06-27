package com.family.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.family.model.DomainException;
import com.family.model.Item;
import com.family.repository.ItemRepository;

@Service
public class ItemService {
    private ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public boolean existingItemByName(String name) {
        if (itemRepository.findByName(name)!= null) {
            return true;
        }
        return false;
    }

    public Item addItem(Item item) {
        if (existingItemByName(item.getName())) {
            System.out.println("Item already exists.");
            throw new DomainException("Item already exists.");
        }
        return itemRepository.save(item);
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Item getItemByName(String name) {
        return itemRepository.findByName(name);
    }

    public void deleteItemByName(String name) {
        itemRepository.delete(getItemByName(name));
    }
}
