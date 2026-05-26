import './style.css'

interface Product {
  id?: string | number;
  name?: string | number;
  price?: string | number;
  published?: string | number;
  description?: string | number;
  category?: string | number;
  imageurl?: string | number;
}


interface Celda {
  v?: string | number;
}

interface Fila {
  c: Celda[];
}

interface GoogleSheetJSON {
  table: {
    rows: Fila[];
  };
}

let $movilmenu=document.querySelector('.header__phonemenu')
let $menuletter=document.querySelector('.header__menuletter')
let $herocards=document.querySelector('.hero__cards')
let $catalogsection=document.querySelector('.catalog__inner')

const cleanbaseformdrive=async ()=>{
  const SHEET_ID = '1lPVZj7uUhAJF6j0g2yLBceOSf1N9WpW-hDRvwXLUR50'; // Pon aquí tu ID real
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

   try {
        const respuesta = await fetch(url);
        const textoPlano = await respuesta.text();
        
        // Este truco limpia el texto raro que mete Google al inicio y al final
        const inicioJson = textoPlano.indexOf('{');
        const finJson = textoPlano.lastIndexOf('}') + 1;
        const jsonLimpio = textoPlano.substring(inicioJson, finJson);
        //console.log(jsonLimpio)
        const datos: GoogleSheetJSON = JSON.parse(jsonLimpio);
        
        // Aquí adentro Google Sheets esconde las filas de tu Excel
        const filas = datos.table.rows;
        
        // Mapeamos las filas para que queden como objetosJS legibles
        const productos = filas.map(fila => {
            return {
                id: fila.c[0]?.v,          // Columna A (id)
                name: fila.c[1]?.v,      // Columna B (nombre)
                price: fila.c[2]?.v,      // Columna C (precio)
                published: fila.c[3]?.v,      // Columna D (link de la foto)
                description: fila.c[4]?.v,  // Columna E (descripcion)
                category: fila.c[5]?.v,
                imageurl: fila.c[6]?.v 
            };
        });

        return productos;

    } catch (error) {
        console.error("Error leyendo Google Sheets:", error);
        return [];
    }
}

const generateproducts=(base:Product[],category:string):string=>{
  return base.map(el=>{
              if(el.published){
                if(el.category === category){
                  return `<div class='catalog__item'>
                          <img src=${el.imageurl} alt=${el.name}>
                          <h3>${el.name}</h3>
                          <p><b>Precio:</b>$${el.price}</p>
                          <a class="button round" href="https://wa.me/593998636447?text=Hola%20necesito%20información%20sobre%20${el.name}" target="_blank">Pedir</a>
                          </div>`
                }
              }
                
            }).join('')
}



const loadproducts=async ()=>{
  let base:Product[]=await cleanbaseformdrive()
  let categoriesraw=base.map(el=>el.category)
  let cat=new Set(categoriesraw)
  let categories=Array.from(cat).sort()
  //console.log(categories)
  
  if($catalogsection){
    $catalogsection.innerHTML=`
    ${categories.map(ele=>
      `
      <section class="catalog__categoryitem">
        <h2>${String(ele).toUpperCase()}</h2>
        <article class="catalog__prods">
          ${generateproducts(base,String(ele))}
        </article>
        
      </section>
      `
      
      
    ).join('')}
    
    
    `
  }
  
}

document.addEventListener('click',(e)=>{
  const target = e.target as Element;
  if(e.target !== null && $movilmenu && $menuletter){
    if(target.closest('.header__buttonmenu')){
      $movilmenu.classList.toggle('header__phonemenu--show')
      $menuletter.textContent=$menuletter.textContent === 'Menú'?'Cerrar':'Menú'
    }


    if(target.closest('.cta')){
      document.querySelector('.catalog')?.scrollIntoView({behavior:'smooth'})
    }
  }

  
  
})

document.addEventListener('DOMContentLoaded',()=>{
  if($herocards){
    $herocards.classList.add('hero__cards--show')
  }
  loadproducts()
})

/*// ${base.map(el=>{
    //   if(el.published){
    //     return `<div class='catalog__item'>
    //       <h3>${el.name}</h3>
    //       <img src="" alt="">
    //       <p>${el.description}</p>
    //       <p><b>Precio:</b>$${el.price}</p>
    //       <button class="button">Pedir</button>
    //     </div>`
    //   }
        
    // }).join('')}*/