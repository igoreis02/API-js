const containerVideos = document.querySelector('.videos__container')

async function buscarEMostrarVideos() {
    //esta buscando os dados da api 
    //await é abordar por issoi nao precisar do then
    try{
        const busca =  await fetch('http://localhost:3000/videos')
        const videos = await busca.json()
        //.then(res => res.json(res))
        //.then( (videos) => 
            videos.forEach((video) =>{
                if(videos.categoria == ""){
                    throw new Error('Video não tem categoria')
                }
                containerVideos.innerHTML += `
                <li class = "videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class ="descricao-video">
                        <img class = "img-canal" src="${video.imagem}" alt="Logo do canal">
                        <h3 class = "titulo-video">${video.titulo}</h3>
                        <p class = "titulo-canal">${video.descricao}</p>
                        <p class = "categoria" hidden>${video.categoria}</p>
                    </div>
                </li>
                `;
        })
    }catch(error){
        containerVideos.innerHTML = `<p>Houve um erro ao carregar os videos: ${error}</p>`
    }
    //)
    //.catch((error) => {
        //containerVideos.innerHTML = `<p>Houve um erro ao carregar os videos: ${error} <p/>`
    //})
}

buscarEMostrarVideos();

const barraDePesquisa = document.querySelector('.pesquisar__input');

barraDePesquisa.addEventListener('input', filtrarPesquisa);

function filtrarPesquisa(){
    const videos = document.querySelectorAll('.videos__item');

    if(barraDePesquisa.value != ""){
        for(let video of videos){
            let titulo = video.querySelector('.titulo-video').textContent.toLocaleLowerCase();
            let valorFiltro = barraDePesquisa.value.toLocgit initaleLowerCase();

            if(!titulo.includes(valorFiltro)){
                video.style.display = "none"
            }else{
                video.style.display = 'block'
            }
        }
    }else{
        videos.style.display = 'block'
    }
}

const botaoCategoria = document.querySelectorAll(".superior__item");

botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute("name");
    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria));
})

function filtrarPorCategoria(filtro){
    const videos = document.querySelectorAll(".videos__item");
    for(let video of videos){
        let categoria = video.querySelector(".categoria").textContent.toLowerCase();
        let valorFiltro = filtro.toLowerCase();

        if(!categoria.includes(valorFiltro) && valorFiltro != 'tudo'){
            video.style.display = "none";
        } else {
            video.style.display = "block";
        }
    }
}
