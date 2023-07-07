// FUNÇÕES DE FORMULÁRIO

// VALIDADOR CAMPO NÚMERO - Remover todos os caracteres não numéricos
function sanitizeOnlyNumberInput(input) {
    input.value = input.value.replace(/[^0-9]/g, '');
}

// VALIDADOR CAMPO NOME - Remover todos os caracteres que não sejam letras, exceto espaços
function sanitizeOnlyTextInput(input) {
    input.value = input.value.replace(/[^A-Za-z ]/g, '');
}

// VALIDADOR CAMPO DATA
document.addEventListener("DOMContentLoaded", function () {
    const contractDateInput = document.getElementById("contract-date");

    if (contractDateInput) {
      // Adicionamos um evento para escutar mudanças no input de data
      contractDateInput.addEventListener("change", function () {
        const selectedDate = new Date(this.value);
        const today = new Date();
  
        // Comparamos a data selecionada com a data atual
        if (selectedDate > today) {
          alert("A data de assinatura não pode ser uma data futura.");
          this.value = ""; // Limpa o valor do input
        }
      });
    }
});