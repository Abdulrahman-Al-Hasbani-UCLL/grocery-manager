package com.family.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;

@Entity
@Table(name = "items")
public class Item {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name", nullable = false)
    @NotBlank(message = "Name can't be blank.")
    private String name;
    
    @Column(name = "list_name", nullable = false)
    @NotBlank(message = "listName can't be blank.")
    private String listName;
    
    @Column(name = "description", columnDefinition = "TEXT")
    @NotBlank(message = "Description can't be blank.")
    private String description;

    @Column(name= "author_name")
    @NotBlank(message = "Author can't be blank.")
    private String author;

    @Column(name = "importance", columnDefinition = "SMALLINT")
    @Min(value = 1, message = "Priority can't be lower than 1.")
    @Max(value= 3, message = "Priority can't be higher than 3.")
    private int importance;

    protected Item() {
    }

    public Item(String name, String listName, String description, String author, int importance) {
        this.name = name;
        this.listName = listName;
        this.description = description;
        this.author = author;
        this.importance = importance;
    }

    public Item(String name, String listName, String description, String author) {
        this.name = name;
        this.listName = listName;
        this.description = description;
        this.author = author;
        this.importance = 2;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getListName() {
        return listName;
    }

    public void setListName(String listName) {
        this.listName = listName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getImportance() {
        return importance;
    }

    public void setImportance(int priority) {
        this.importance = priority;
    }
}