package com.kh.movie.repo;

import com.kh.movie.domain.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieDAO extends JpaRepository<Movie, Integer> {
}
