package com.proyect.microserviciomapa;

import com.proyect.microserviciomapa.model.Building;
import com.proyect.microserviciomapa.repository.BuildingRepository;
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
        buildingRepository.save(new Building(2L, 0, 3, 0, 90, 100));
        buildingRepository.save(new Building(3L, 2, 4, 0, 90, 100));
        buildingRepository.save(new Building(4L, 4, 3, 0, 90, 100));
    }
}