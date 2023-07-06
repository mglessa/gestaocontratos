<div class="popup" id="popup-file" style="display: none;">
    <div class="popup-header">
        <h2>Anexos</h2>
        <img class="btn-close--popup" src="{{ asset('images/closered.png') }}"> 
    </div>
    <form class="contract-form" enctype="multipart/form-data">
        <form class="contract-form">
            <input id="contract-id" hidden>

            <div class="form-line">
                <label for="contract-name">Nome do Arquivo</label>
                <input type="text" id="file-name" name="name" required>
            </div>

            <input type="file" name="pdf_file" accept=".pdf">

            <div class="table-files">
                <table>
                    <thead>
                        <tr>
                            <th>Documento</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="big">Contrato</td>
                            <td>
                                <img id="btn-view" class="btn-action" src="../images/view.png" title="Visualiar" data-value=${contract.id}>
                                <img id="btn-download" class="btn-action" src="../images/download.png" title="Baixar" data-value=${contract.id}>
                                <img id="btn-delete" class="btn-action" src="../images/remove.png" title="Excluir" data-value=${contract.id}>
                            </td> 
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="form-line buttons">
                <button class="btn orange" id="btn-send">SALVAR</button>
            </div>
        </form>
    </div>
</div>