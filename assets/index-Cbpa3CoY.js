(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.querySelector(`.header__phonemenu`),t=document.querySelector(`.header__menuletter`),n=document.querySelector(`.hero__cards`),r=document.querySelector(`.catalog__inner`),i=document.querySelector(`.modal`),a=document.querySelector(`.modal__inner`),o=async()=>{try{let e=await(await fetch(`https://docs.google.com/spreadsheets/d/1lPVZj7uUhAJF6j0g2yLBceOSf1N9WpW-hDRvwXLUR50/gviz/tq?tqx=out:json`)).text(),t=e.indexOf(`{`),n=e.lastIndexOf(`}`)+1,r=e.substring(t,n);return JSON.parse(r).table.rows.map(e=>({id:e.c[0]?.v,name:e.c[1]?.v,price:e.c[2]?.v,published:e.c[3]?.v,description:e.c[4]?.v,category:e.c[5]?.v,imageurl:e.c[6]?.v}))}catch(e){return console.error(`Error leyendo Google Sheets:`,e),[]}},s=(e,t)=>e.map(e=>{if(e.published&&e.category===t)return`<div class='catalog__item'>
                          <img class="catalog__img" data-id=${e.id} src=${e.imageurl} alt=${e.name}>
                          <h3>${e.name}</h3>
                          <p><b>Precio:</b>$${e.price}</p>
                          <a class="button round" href="https://wa.me/593998636447?text=Hola%20necesito%20información%20sobre%20${e.name}" target="_blank">Pedir</a>
                          </div>`}).join(``),c=async()=>{let e=await o(),t=e.map(e=>e.category),n=new Set(t),i=Array.from(n).sort();r&&(r.innerHTML=`
    ${i.map(t=>`
      <section class="catalog__categoryitem">
        <h2>${String(t).toUpperCase()}</h2>
        <article class="catalog__prods">
          ${s(e,String(t))}
        </article>
        
      </section>
      `).join(``)}
    
    
    `)},l=async e=>{try{let t=(await o()).find(t=>String(t.id)===e);if(!t)throw Error(`can get modal id`);return t}catch(e){let t=e instanceof Error?e.message:`error filling modal`;console.log(t)}};document.addEventListener(`click`,async n=>{let r=n.target;if(n.target!==null&&e&&t&&(r.closest(`.header__buttonmenu`)&&(e.classList.toggle(`header__phonemenu--show`),t.textContent=t.textContent===`Menú`?`Cerrar`:`Menú`),r.closest(`.cta`)&&document.querySelector(`.catalog`)?.scrollIntoView({behavior:`smooth`})),r.closest(`.catalog__img`)&&r.dataset.id&&a){let e=await l(r.dataset.id);e?a.innerHTML=`
        <img src=${e.imageurl} alt=${e.name}>
      `:(console.log(`error modal data`),a.innerHTML=`
        <p>No image available</p>
      `),i&&i.classList.add(`modal--show`)}r.closest(`.modal__closebtn`)&&i&&i.classList.remove(`modal--show`)}),document.addEventListener(`DOMContentLoaded`,()=>{n&&n.classList.add(`hero__cards--show`),c()});