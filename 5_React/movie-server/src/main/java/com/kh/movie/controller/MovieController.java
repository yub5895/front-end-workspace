package com.kh.movie.controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.kh.movie.domain.Movie;
import com.kh.movie.service.MovieService;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.sql.Array;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/*")
@CrossOrigin(origins={"*"}, maxAge = 6000)
public class MovieController {

    @Autowired
    private MovieService service;

    // URL -> JSON 객체
    public JSONObject convert(String url) throws Exception {
        URL requestUrl = new URL(url);
        HttpURLConnection urlConnection = (HttpURLConnection) requestUrl.openConnection();
        urlConnection.setRequestMethod("GET");

        BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
        String line = null;

        StringBuffer responseBuffer = new StringBuffer();

        while((line = br.readLine())!=null) {
            responseBuffer.append(line);
        }
        br.close();
        urlConnection.disconnect();

        String responseData = responseBuffer.toString();

        return new JSONObject(responseData);
    }

    @GetMapping("/movie-api")
    public ResponseEntity movieApi() throws Exception {
        String key = "7051f228650924504c4f9f387acf9812";
        String listUrl = "https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=" + key + "&itemPerPage=5&openStartDt=2024";


        JSONObject jsonResponse = convert(listUrl);
        JSONObject movieListResult = jsonResponse.getJSONObject("movieListResult");
        JSONArray movieList = movieListResult.getJSONArray("movieList");

        log.info("movieList: " + movieList);

        List<Movie> list = new ArrayList<>();

        for(int i = 0; i < movieList.length(); i++) {
            JSONObject result = movieList.getJSONObject(i);
            int movieCd = result.getInt("movieCd");
            log.info("movieCd : " + movieCd);
            String url = "https://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=" + key + "&movieCd=" + movieCd;

            JSONObject jsonData = convert(url);
            JSONObject movieInfoResult = jsonData.getJSONObject("movieInfoResult");
            JSONObject movieInfo = movieInfoResult.getJSONObject("movieInfo");

            log.info("movieInfo:" + movieInfo);
           String title = movieInfo.getString("movieNm");


            JSONArray actors = movieInfo.getJSONArray("actors");
            String actor = "";
            for(int j = 0; j < actors.length(); j++) {
                JSONObject actorObject = actors.getJSONObject(j);
                actor += actorObject.getString("peopleNm");
                if(j < actors.length() - 1) {
                    actor += ", ";
                }
            };
            log.info("actors:" + actors);

            JSONArray genres = movieInfo.getJSONArray("genres");
            String genre = "";
            for(int j = 0; j < genres.length(); j++) {
                JSONObject genreObject = genres.getJSONObject(j);
                genre += genreObject.getString("genreNm");
                if(j < genres.length() - 1) {
                    genre += ", ";
                }
            };
            log.info("genres:" + genres);

            list.add(Movie.builder()
                            .id(movieCd)
                            .title(title)
                            .actor(actor)
                            .genre(genre)
                    .build());

        }

        return ResponseEntity.ok(list);
    }

}
