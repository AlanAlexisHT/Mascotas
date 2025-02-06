package com.users.usuarios.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.users.usuarios.entities.Usuario;

@Repository
public interface UserRepository extends JpaRepository<Usuario,Long> {
    
}
