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
        buildingRepository.save(new Building(1L, 0, 0, 0, 90, 100, "#33bdff")); // Casilla 0x0 azul
        buildingRepository.save(new Building(2L, 0, 1, 0, 90, 100, "#744e3b")); // Marrón específico
        buildingRepository.save(new Building(3L, 0, 2, 0, 90, 100, "#744e3b"));
        buildingRepository.save(new Building(4L, 0, 4, 0, 90, 100, "#744e3b"));
        buildingRepository.save(new Building(5L, 0, 5, 0, 90, 100, "#744e3b"));
        buildingRepository.save(new Building(6L, 0, 6, 0, 90, 100, "#744e3b"));

        buildingRepository.save(new Building(7L, 2, 0, 0, 90, 100, "#744e3b"));
        buildingRepository.save(new Building(8L, 2, 1, 0, 90, 100, "#744e3b"));
        buildingRepository.save(new Building(9L, 2, 2, 0, 90, 100, "#744e3b"));
        buildingRepository.save(new Building(10L, 2, 4, 0, 90, 100, "#744e3b"));
        buildingRepository.save(new Building(11L, 2, 5, 0, 90, 100, "#744e3b"));
        buildingRepository.save(new Building(12L, 2, 6, 0, 90, 100, "#744e3b"));

        buildingRepository.save(new Building(13L, 4, 0, 0, 90, 100, "#744e3b"));
        buildingRepository.save(new Building(14L, 4, 1, 0, 90, 100, "#744e3b"));
        buildingRepository.save(new Building(15L, 4, 2, 0, 90, 100, "#744e3b"));
        buildingRepository.save(new Building(16L, 4, 4, 0, 90, 100, "#744e3b"));
        buildingRepository.save(new Building(17L, 4, 5, 0, 90, 100, "#744e3b"));
        buildingRepository.save(new Building(18L, 4, 6, 0, 90, 100, "#744e3b"));

        buildingRepository.save(new Building(19L, 6, 0, 0, 90, 100, "#744e3b"));
        buildingRepository.save(new Building(20L, 6, 1, 0, 90, 100, "#744e3b"));
        buildingRepository.save(new Building(21L, 6, 2, 0, 90, 100, "#744e3b"));
        buildingRepository.save(new Building(22L, 6, 4, 0, 90, 100, "#744e3b"));
        buildingRepository.save(new Building(23L, 6, 5, 0, 90, 100, "#744e3b"));
        buildingRepository.save(new Building(24L, 6, 6, 0, 90, 100, "#744e3b"));

        buildingRepository.save(new Building(25L, 8, 0, 0, 90, 100, "#744e3b"));
        buildingRepository.save(new Building(26L, 8, 1, 0, 90, 100, "#744e3b"));
        buildingRepository.save(new Building(27L, 8, 2, 0, 90, 100, "#744e3b"));
        buildingRepository.save(new Building(28L, 8, 4, 0, 90, 100, "#744e3b"));
        buildingRepository.save(new Building(29L, 8, 5, 0, 90, 100, "#744e3b"));
        buildingRepository.save(new Building(30L, 8, 6, 0, 90, 100, "#744e3b"));
    }
    }
