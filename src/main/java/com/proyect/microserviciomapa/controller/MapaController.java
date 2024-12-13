package com.proyect.microserviciomapa.controller;

import com.proyect.microserviciomapa.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/ciudad")
public class MapaController {

    @Autowired
    private CityService cityService;

    @GetMapping("/edificios")
    public String getBuildings(Model model) {
        model.addAttribute("buildings", cityService.getBuildings());
        return "mapa";
    }
}