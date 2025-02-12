package com.users.usuarios.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.users.usuarios.entities.Usuario;
import com.users.usuarios.services.UsuarioService;



@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    
    private static final Logger logger = LoggerFactory.getLogger(UsuarioController.class);
    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService){
        this.usuarioService = usuarioService;
    }

    @GetMapping("")
    public List<Usuario> getUsuarios() {
        logger.info("Se solicitó la lista de todos los usuarios.");
        return usuarioService.getUsuarios();
    }
    
    @PostMapping("")
    public Usuario crearUsuario(@RequestBody Usuario usuario) {
        logger.info("Se crea al usuario: {}", usuario.getEmail());
        return usuarioService.crearUsuario(usuario);
    }
    
}
