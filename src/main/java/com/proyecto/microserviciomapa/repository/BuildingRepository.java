package com.proyecto.microserviciomapa.repository;

import com.proyecto.microserviciomapa.model.Building;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuildingRepository extends JpaRepository<Building, Long> {
}