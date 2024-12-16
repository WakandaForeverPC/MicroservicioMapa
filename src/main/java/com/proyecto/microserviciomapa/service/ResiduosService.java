package com.proyecto.microserviciomapa.service;

import com.proyecto.microserviciomapa.model.RecyclingPoint;
import com.proyecto.microserviciomapa.repository.RecyclingPointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResiduosService {
    @Autowired
    private RecyclingPointRepository recyclingPointRepository;

    public List<RecyclingPoint> getResiduos() {
        return recyclingPointRepository.findAll();
    }
}
