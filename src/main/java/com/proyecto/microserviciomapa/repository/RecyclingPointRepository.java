package com.proyecto.microserviciomapa.repository;

import com.proyecto.microserviciomapa.model.Building;
import com.proyecto.microserviciomapa.model.RecyclingPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecyclingPointRepository extends JpaRepository<RecyclingPoint, Long> {
}
