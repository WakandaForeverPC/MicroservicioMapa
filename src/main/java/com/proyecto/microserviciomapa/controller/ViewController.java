package com.proyecto.microserviciomapa.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

    @GetMapping("/mapa")
    public String showBoard() {
        return "board"; // Busca un archivo llamado board.html en src/main/resources/templates/
    }
}
