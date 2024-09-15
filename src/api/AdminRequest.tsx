import axios from "axios";
const URL = process.env.NEXT_PUBLIC_BACKEND_API;
const API = axios.create({ baseURL: URL });

// -----------------------------------------PROVERBS-----------------------------
// GET
export const provebsGetApi = async ({ language = "uz" }) => API.get(`/general/proverbs?language=${language}`);

// -----------------------------------------WORKERS-----------------------------
// GET
export const workersGetApi = async () => API.get(`/general/workers`);

// -----------------------------------------FILTERS-----------------------------
// GET
export const filtersGetApi = async () => API.get(`/general/filters`);

// -----------------------------------------DEVONS-----------------------------
// GET
export const devonsGetApi = async ({ search = "", devan_id = "", genre_detail_number = "", genre_id = "", second = "", poetic_art_id = "", auditory_age__in = "", text_type_id__in = "", page = 1, page_size = 10 }) =>
    API.get(`/general/?search=${search}&devan_id=${devan_id}&genre_detail_number=${genre_detail_number}&genre_id=${genre_id}&poetic_art_id=${poetic_art_id}&auditory_age__in=${auditory_age__in}&text_type_id__in=${text_type_id__in}&second=${second}&page=${page}&page_size=${page_size}`);

// -----------------------------------------DEVONS-----------------------------
// GET
export const biographyGetApi = async () => API.get(`/general/biography`);

// -----------------------------------------GENRES-----------------------------
// GET BY ID
export const genresGetOneAPI = async ({ id = "", search = "" }: { id: any, search: string }) =>
    API.get(`/genres/${id}/?search=${search}`);

// -----------------------------------------NEWS-----------------------------
// GET
export const newsGetApi = async ({ search = "", page_size = 6, page = 1 }) => API.get(`/news/?search=${search}&page=${page}&page_size=${page_size}`);

// GET BY ID
export const newsGetOneAPI = async ({ id = "" }: { id: any }) =>
    API.get(`/news/${id}/`);

// -----------------------------------------QUESTIONS-----------------------------
// GET
export const questionsGetApi = async ({ page = 1, page_size = 100 }) => API.get(`/questions/?page=${page}&page_size=${page_size}`);

// GET BY ID
export const questionGetOneAPI = async ({ id = "" }: { id: any }) =>
    API.get(`/questions/${id}/`);

// -----------------------------------------RESEARCH-----------------------------
// GET
export const researchGetApi = async ({ search = "", page = 1, page_size = 10 }) => API.get(`/researches/?search=${search}&page=${page}&page_size=${page_size}`);

// -----------------------------------------WORKS-----------------------------
// GET
export const worksGetApi = async ({ search = "", page = 1, auditory_age__in = "", text_type_id__in = "", page_size = 10 }) => API.get(`/works/?search=${search}&page=${page}&auditory_age__in=${auditory_age__in}&text_type_id__in=${text_type_id__in}&page_size=${page_size}`);