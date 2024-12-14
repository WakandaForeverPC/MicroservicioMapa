package com.proyect.microserviciomapa.service;

import com.proyect.microserviciomapa.model.Building;
import com.proyect.microserviciomapa.repository.BuildingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService {

    @Autowired
    private BuildingRepository buildingRepository;

    public List<Building> getBuildings() {
        return buildingRepository.findAll();
    }
}