import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { createMarkup } from "./js/render-functions.js";
import { gallery } from "./js/pixabay-api.js";


const form = document.querySelector(".form-inline");
const list = document.querySelector(".js-list");
const loader = document.querySelector(".loader");
const btnload = document.querySelector(".btn-load");

form.addEventListener("submit", searchImages);
btnload.addEventListener("click", imagesMore);

function loaderShow() {
    loader.classList.toggle("visible");
}

function btnShow() {
    btnload.classList.toggle("visible-btn");
}
const lightbox = new SimpleLightbox('.images a', {
    captionsData: 'alt',
    captionDelay: 250,
});

let page = 1;
let totalPages = 0;
let searchInput = "";

async function searchImages(evt) {
    evt.preventDefault();
    list.innerHTML = '';
    page = 1;



    const { query } = evt.currentTarget.elements;
    searchInput = query.value.trim();

    if (searchInput === '') {
        iziToast.error({
            title: 'Error',
            message: 'The field cannot be empty!!!',
            position: 'topRight',
        });
        return;
    };

    loaderShow();

    try {
        const data = await gallery(searchInput, page);
        if (data.hits.length === 0) {
            iziToast.warning({
                title: '',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
                timeout: '2000'
            });
            return;
        }
       
        list.insertAdjacentHTML("beforeend", createMarkup(data.hits));
        lightbox.refresh();
        totalPages = Math.ceil(data.totalHits / 15);

        if (page < totalPages) {
            btnShow();
        }
        form.reset();
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'An error occurred while fetching data. Please try again later.',
            position: 'topRight',
        });
    } finally {
        loaderShow();
    }
}
async function imagesMore() {
    page += 1;
    loaderShow();

    try {
        const data = await gallery(searchInput, page);
        list.insertAdjacentHTML("beforeend", createMarkup(data.hits));
        const { height } = list.firstElementChild.getBoundingClientRect();
        window.scrollBy({
            top: height * 2,
            behavior: "smooth",
        });
        lightbox.refresh();

        if (page === totalPages) {
            btnShow();
            return iziToast.info({
                position: "topRight",
                message: "We're sorry, but you've reached the end of search results."
            });
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'An error occurend while fetching data. Pleasa try again later.',
            position: 'topRight',
        });
    } finally {
        loaderShow();
    }
}