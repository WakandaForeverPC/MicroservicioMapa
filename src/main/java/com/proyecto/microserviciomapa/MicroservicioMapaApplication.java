package com.proyecto.microserviciomapa;

import com.proyecto.microserviciomapa.model.Building;
import com.proyecto.microserviciomapa.repository.BuildingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MicroservicioMapaApplication implements CommandLineRunner {

    @Autowired
    private BuildingRepository buildingRepository;

    public static void main(String[] args) {
        SpringApplication.run(MicroservicioMapaApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        buildingRepository.save(new Building(1L, 0, 0, 0, 90, 100));
        buildingRepository.save(new Building(2L, 0, 4, 0, 90, 100));
        buildingRepository.save(new Building(3L, 2, 4, 0, 90, 100));
        buildingRepository.save(new Building(4L, 4, 5, 0, 90, 100));
    }
}