<div class="popup" id="popup-files">
    <div class="popup-header">
        <h2>Anexos</h2>
        <img class="btn-close--popup" src="{{ asset('images/closered.png') }}" onclick="closePopup()"> 
    </div>
    <form class="contract-form" enctype="multipart/form-data">
        <form class="contract-form">
            <input id="contract-id--files" hidden>

            <label for="document-input" id="document-label">Selecione o arquivo</label>
            <input type="file" id="document--files" name="pdf_file" accept=".pdf">

            <div class="table-files">
                <table>
                    <thead>
                        <tr>
                            <th>Documento</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>

            <div class="form-line buttons">
                <button class="btn orange" id="btn-send">SALVAR</button>
            </div>
        </form>
    </div>
</div>