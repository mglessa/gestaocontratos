@include('partials._head')

<body>

    <section class="section-popup">
        @include('partials._popup')
        @include('partials._popup-files')
    </section>

    {{-- <button onclick="window.location.href='/popup?action=editar'">Enviar</button> --}}

    @include('partials._header')

    <section class="section-main">
        <div class="main">
            <h2>Contratos</h2>
            <hr><br/>
            <div class="main-tools">
                <div class="search-box">
                    <input type="text" id="search-input" placeholder="Pesquisar contrato">
                    <button id="btn-search" class="btn">BUSCAR</button>
                    <button id="btn-clear" class="btn grey">LIMPAR</button>
                    <button id="btn-register" class="btn orange">CADASTRAR</button>
                </div>
            </div>
            @include('partials._table')
        </div>
    </section>

    <script src="{{ asset('js/script.js') }}"></script>
</body>
</html>