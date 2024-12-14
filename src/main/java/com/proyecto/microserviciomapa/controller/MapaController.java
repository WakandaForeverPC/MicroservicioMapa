package com.proyecto.microserviciomapa.controller;

import com.proyecto.microserviciomapa.model.Building;
import com.proyecto.microserviciomapa.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/mapa")
public class MapaController {

    @Autowired
    private CityService cityService;

    public MapaController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping("/edificios")
    public ResponseEntity<List<Building>> getBuildings() {
        List<Building> edificios = cityService.getBuildings();
        return ResponseEntity.ok(edificios);
    }
}