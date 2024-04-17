import{a as w,S,i as c}from"./assets/vendor-6e0bf343.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();function f(s){return s.map(({webformatURL:r,largeImageURL:i,tags:o,likes:e,views:t,comments:n,downloads:L})=>`
    <li class="gallery-item">
      <div class="gallery">
       <a class="gallery-link" href="${i}">
       <img class="gallery-image"
         src="${r}"
         alt="${o}"
        />
       </a>
       
      <ul class="card-description">
        <li class="description">Likes <span class="accent">${e} </span></li>
        <li class="description">Views <span class="accent">${t} </span></li>
        <li class="description">Comments <span class="accent">${n} </span></li>
        <li class="description">Downloads <span class="accent">${L} </span></li>
      </ul>
      </div>
    </li>
    `).join("")}async function g(s,r){const i="https://pixabay.com/api/",o="43214840-c1c575028749116cdd7e0c5e8",e=new URLSearchParams({key:o,q:s,image_typ:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}),{data:t}=await w.get(`${i}?${e}`);return t}const h=document.querySelector(".form-inline"),u=document.querySelector(".js-list"),v=document.querySelector(".loader"),m=document.querySelector(".btn-load");h.addEventListener("submit",P);m.addEventListener("click",E);function d(){v.classList.toggle("visible")}function y(){m.classList.toggle("visible-btn")}const b=new S(".images a",{captionsData:"alt",captionDelay:250});let a=1,p=0,l="";async function P(s){s.preventDefault(),u.innerHTML="",a=1;const{query:r}=s.currentTarget.elements;if(l=r.value.trim(),l===""){c.error({title:"Error",message:"The field cannot be empty!!!",position:"topRight"});return}d();try{const i=await g(l,a);if(i.hits.length===0){c.warning({title:"",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:"2000"});return}u.insertAdjacentHTML("beforeend",f(i.hits)),b.refresh(),p=Math.ceil(i.totalHits/15),a<p&&y(),h.reset()}catch{c.error({title:"Error",message:"An error occurred while fetching data. Please try again later.",position:"topRight"})}finally{d()}}async function E(){a+=1,d();try{const s=await g(l,a);u.insertAdjacentHTML("beforeend",f(s.hits));const{height:r}=u.firstElementChild.getBoundingClientRect();if(window.scrollBy({top:r*2,behavior:"smooth"}),b.refresh(),a===p)return y(),c.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})}catch{c.error({title:"Error",message:"An error occurend while fetching data. Pleasa try again later.",position:"topRight"})}finally{d()}}
//# sourceMappingURL=commonHelpers.js.map
