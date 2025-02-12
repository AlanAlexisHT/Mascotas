package com.users.usuarios.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.users.usuarios.entities.Usuario;
import com.users.usuarios.repositories.UserRepository;

@Service
public class UsuarioService {

    private static final Logger logger = LoggerFactory.getLogger(UsuarioService.class);
    private final UserRepository usuarioRepository;

    public UsuarioService(UserRepository usuarioRepository){
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> getUsuarios() {
        logger.debug("Buscando a los usuarios.");
        return usuarioRepository.findAll();
    }

    public Usuario crearUsuario(Usuario usuario) {
        logger.info("Guardando en la base de datos: {}", usuario.getEmail());
        return usuarioRepository.save(usuario);
    }
    
}
