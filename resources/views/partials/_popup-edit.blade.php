<div class="popup" id="popup-edit">
    <div class="popup-header">
        <h2>Editar Contrato</h2>
        <img class="btn-close--popup" src="{{ asset('images/closered.png') }}" onclick="closePopup()"> 
    </div>
    <div class="popup-form">
        <form class="contract-form">
            <input id="contract-id--edit" hidden>
            <div class="form-line">
                <label for="contract-number">Nº Contrato</label>
                <input type="text" class="readonly-field" id="contract-number--edit" name="number" required pattern="[0-9]{9}" maxlength="9" oninput="sanitizeOnlyNumberInput(this)" readonly>
            </div>

            <div class="form-line">
                <label for="contract-name">Nome</label>
                <input type="text" class="readonly-field" id="contract-name--edit" name="name" required pattern="^(?![0-9]*$)[A-Za-z ]{3,}$" oninput="sanitizeOnlyTextInput(this)" readonly>
            </div>

            <div class="form-line">
                <label for="contract-value">Valor</label>
                <input type="number" id="contract-value--edit" name="value" required step="0.01">                
            </div>                        
            
            <div class="form-line">
                <label for="contract-date">Data Assinatura</label>
                <input type="date" id="contract-date--edit" name="date" required>
            </div>
            
            <div class="form-line buttons">
                <button class="btn orange" id="btn-send--edit">SALVAR</button>
            </div>
        </form>
    </div>
</div>