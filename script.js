console.log('Testando JS');
const biblioteca = {
    usuarios: [
        {
            username: 'danubio',
        }
    ],
    livros: [
        {
            id: Date.now(),
            owner: 'danubio',
            titulo: 'Meu primeiro livro'
        }
    ],
    readPosts() {
        biblioteca.livros.forEach(({ id, owner, titulo }) => {
            biblioteca.criaLivro({ id, owner: owner, titulo: titulo }, true);
        })
    },
    criaLivro(dados, htmlOnly = false) {
        const idInternoAqui = Date.now();
        if (!htmlOnly) {
            // Cria Posts na Memória (Array/Objeto)
            biblioteca.livros.push({
                id: dados.id || idInternoAqui,
                owner: dados.owner,
                titulo: dados.titulo
            });
        }
        // Cria Post no HTML
        const $listaDeLivros = document.querySelector('.listaDeLivros');
        $listaDeLivros.insertAdjacentHTML('afterbegin', `
            <li data-id="${idInternoAqui}">
                <button class="btn-delete">Delete</button>
                <span contenteditable>
                    ${dados.titulo}
                <span>
            </li>
        `);
    },
    apagaPost(id) {
        const listaDePostsAtualizada = biblioteca.livros.filter((postAtual) => {
            return postAtual.id !== Number(id);
        })
        console.log(listaDePostsAtualizada);
        biblioteca.livros = listaDePostsAtualizada;
    },
    atualizaContentDoPost(id, novoConteudo) {
        const postQueVaiSerAtualizado = biblioteca.livros.find((post) => {
            return post.id === Number(id);
        });
        console.log(postQueVaiSerAtualizado)
        postQueVaiSerAtualizado.titulo = novoConteudo
    }
};

// [Código de Front End: Web]
const $meuForm = document.querySelectorAll('form');
console.log($meuForm);

// CRUD: [READ]
biblioteca.readPosts();

// CRUD: [CREATE]
$meuForm.addEventListener('submit', function criaPostController(infosDoEvento) {
    infosDoEvento.preventDefault();
    console.log('Estamos criando um post novo!')
    const $campoCriaPost = document.querySelector('input[name="campoCriaPost"]');

    biblioteca.criaLivro({ owner: 'danubio', titulo: $campoCriaPost.value });

    $campoCriaPost.value = '';
})