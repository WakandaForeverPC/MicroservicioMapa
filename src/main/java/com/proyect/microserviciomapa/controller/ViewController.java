package com.proyect.microserviciomapa.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController {

    @GetMapping("/")
    public String showBoard() {
        return "board"; // Busca un archivo llamado board.html en src/main/resources/templates/
    }
}
