<div class="popup" id="popup-files">
    <div class="popup-header">
        <h2>Anexos</h2>
        <img class="btn-close--popup" src="{{ asset('images/closered.png') }}" onclick="closePopup()"> 
    </div>
        <form class="files-form">
            <input id="contract-id--files" hidden>
            <div class="form-line">
                <label for="document-title" id="contractTitle--files"><label>
            </div>
            <hr>
            
            <div class="form-files--inputs">

                <div class="form-files--inputs-line">
                    <label for="document-name">Nome do Arquivo</label>
                    <input type="text" id="document--name" name="name" required pattern="^(?![0-9]*$)[A-Za-z ]{2,}$" title="Este campo deve conter pelo menos 2 caracteres">
                    <img id="action-file" class="btn-actions" src="../images/upload.png" title="Enviar arquivo" onclick="uploadDocument()">
                </div>

                <input type="file" id="document--files" name="pdf_file" accept=".pdf">
            </div>
            <div class="table-files">
                <table>
                    <thead>
                        <tr>
                            <th>Documento</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="table-files">
                    </tbody>
                </table>
            </div>
        </form>
    </div>
</div>