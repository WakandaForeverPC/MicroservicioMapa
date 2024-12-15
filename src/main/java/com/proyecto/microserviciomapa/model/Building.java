package com.proyecto.microserviciomapa.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;


@Entity
public class Building {

    @Id
    private Long id;
    private int x;
    private int y;
    private int z;
    private int width;
    private int height;
    private String color;

    // No-argument constructor
    public Building() {
    }

    // Constructor with parameters
    public Building(Long id, int x, int y, int z, int width, int height, String color) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.z = z;
        this.width = width;
        this.height = height;
        this.color = color;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public int getZ() {
        return z;
    }

    public void setZ(int z) {
        this.z = z;
    }

    public int getWidth() {
        return width;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}
