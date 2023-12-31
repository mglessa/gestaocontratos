<div class="popup" id="popup-register">
    <div class="popup-header">
        <h2>Cadastrar Contrato</h2>
        <img class="btn-close--popup" src="{{ asset('images/closered.png') }}" onclick="closePopup()"> 
    </div>
    <div class="popup-form">
        <form class="contract-form">
            <div class="form-line">
                <label for="contract-number">Nº Contrato</label>
                <input type="text" id="contract-number--register" name="number" pattern="[0-9]{9}" maxlength="9" required oninput="sanitizeOnlyNumberInput(this)" title="Este campo deve conter 9 caracteres numéricos">
            </div>

            <div class="form-line">
                <label for="contract-name">Nome</label>
                <input type="text" id="contract-name--register" name="name" required pattern="^(?![0-9]*$)[A-Za-z ]{3,}$" title="Este campo deve conter pelo menos 3 caracteres não numéricos">
            </div>

            <div class="form-line">
                <label for="contract-value">Valor</label>
                <input type="number" id="contract-value--register" name="value" required step="0.01">                
            </div>                        
            
            <div class="form-line">
                <label for="contract-date">Data Assinatura</label>
                <input type="date" class="contract-date" id="contract-date--register" name="date" required>
            </div>
            
            <div class="form-line buttons">
                <button class="btn orange" id="btn-send--register" onclick="registerContract()">SALVAR</button>
            </div>
        </form>
    </div>
</div>