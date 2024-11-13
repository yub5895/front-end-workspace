package com.kh.movie.service;

import com.kh.movie.domain.Movie;
import com.kh.movie.repo.MovieDAO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mapping.AccessOptions;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
// import org.springframework.transaction.annotation.Propagation;

import java.util.List;

@Service
public class MovieService {

    @Autowired
    private MovieDAO dao;

    public void change(Movie vo) {
        dao.save(vo);
    }

    public List<Movie> viewAll() {
        return dao.findAll();
    }

    public Movie view(int id) {
        return dao.findById(id).get();
    }

    public void delete(int id) {
        dao.deleteById(id);
    }
}
