import axios from "axios";

// 1번 문제 ------------------------------------------------------------------------------------------

const key = "7051f228650924504c4f9f387acf9812";
export const getDaily = async (date) => {
  return await instance.get(
    `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${key}`,
    date
  );
};

// ---------------------------------------------------------------------------------------------------

const instance = axios.create({
  baseURL: "http://192.168.10.51:8080/api/",
});

export const getMovies = async () => {
  return await instance.get("movie");
};

export const addMovie = async (data) => {
  return await instance.post("movie", data);
};

export const delMovie = async (id) => {
  return await instance.delete("movie/" + id);
};

export const getMovie = async (id) => {
  return await instance.get("movie/" + id);
};

export const updateMovie = async (data) => {
  return await instance.put("movie", data);
};
