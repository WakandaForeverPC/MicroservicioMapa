package com.proyecto.microserviciomapa.service;

import com.proyecto.microserviciomapa.model.Building;
import com.proyecto.microserviciomapa.repository.BuildingRepository;
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