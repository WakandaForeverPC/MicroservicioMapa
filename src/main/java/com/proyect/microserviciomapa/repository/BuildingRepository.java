package com.proyect.microserviciomapa.repository;

import com.proyect.microserviciomapa.Building;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuildingRepository extends JpaRepository<Building, Long> {
}