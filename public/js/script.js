const popupSection = document.querySelector('.section-popup');
const popups = document.querySelectorAll('.popup');
const popupRegister = document.getElementById('popup-register');
const popupEdit = document.getElementById('popup-edit');
const popupFile = document.getElementById('popup-file');

const contractNumberInputRegister = document.getElementById('contract-number--register');
const contractNameInputRegister = document.getElementById('contract-name--register');
const contractValueInputRegister = document.getElementById('contract-value--register');
const contractDateInputRegister = document.getElementById('contract-date--register');

const contractIdInputEdit = document.getElementById('contract-id--edit');
const contractNumberInputEdit = document.getElementById('contract-number--edit');
const contractNameInputEdit = document.getElementById('contract-name--edit');
const contractValueInputEdit = document.getElementById('contract-value--edit');
const contractDateInputEdit = document.getElementById('contract-date--edit');

const contractIdInputFiles = document.getElementById('contract-id--files');
const contractTitleFiles = document.getElementById('contractTitle--files');
const documentInputFiles = document.getElementById('document--files');

const searchInput = document.getElementById('search-input');

// -------- EXECUTA AO CARREGAR A PÁGINA --------

document.addEventListener('DOMContentLoaded', function () {
  readContracts();
  validateDate();
});

// -------- FUNÇÕES DE MANIPULAÇÃO DE HTML --------

function renderContracts(contracts) {
  const tableBody = document.getElementById('contracts-table');
  const tableInfo = document.querySelector('.table-info');
  
  let tableHTML = '';

  contracts.forEach(contract => {

    const formattedValue = Number(contract.value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const contractDate = new Date(contract.date + "T00:00:00");
    const formattedDate = contractDate.toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    tableHTML += `
      <tr>
          <td>${contract.number}</td>
          <td class="table-big">${contract.name}</td>
          <td class="table-number">${formattedValue}</td>
          <td>${formattedDate}</td>
          <td>
              <img id="action-edit" class="btn-actions" src="../images/edit.png" title="Editar contrato" onclick="openPopup('popup-edit', '${encodeURIComponent(JSON.stringify(contract))}')">
              <img id="action-file" class="btn-actions" src="../images/anexo.png" title="Anexos" onclick="openPopup('popup-files', '${encodeURIComponent(JSON.stringify(contract))}')">
              <img id="action-delete" class="btn-actions" src="../images/remove.png" title="Excluir contrato" onclick="deleteContract('${contract.id}')">
          </td>
      </tr>
    `;
  });

  tableBody.innerHTML = tableHTML;
  tableInfo.textContent = 'Qtd. Registros: ' + contracts.length;
}

function clearSearch() {
  searchInput.value = '';
  readContracts();
}

function searchContracts() {
  if(searchInput.value) {
    readContracts(searchInput.value);
  }
}

function openPopup(popupName, encodedContract = null) {
  
  // Garante o fechamento de todos os POPUPs
  closePopup();

  // Prepara os inputs dos formulários
  loadInputs(popupName, encodedContract);

  // Ativa a seção popup
  popupSection.classList.add('active');

  // Ativa apenas o popup selecionado
  document.getElementById(popupName).classList.add('active');

}

function closePopup() {

  // Ativa a seção popup
  popupSection.classList.remove('active');

  // Desativa todos os popups
  popups.forEach(popup => {
    popup.classList.remove('active')
  })
}

function loadInputs(popupName, encodedContract) {

  const contract = JSON.parse(decodeURIComponent(encodedContract));
  switch(popupName) {

    case 'popup-register':

      // Apagar os dados dos campos de input
      contractNumberInputRegister.value = '';
      contractNameInputRegister.value = '';
      contractValueInputRegister.value = '';
      contractDateInputRegister.value = '';
      break;

    case 'popup-edit':

      // Carregar os dados do contrato para os respectivos campos de input
      contractIdInputEdit.value = contract.id;           
      contractNumberInputEdit.value = contract.number;
      contractNameInputEdit.value = contract.name;
      contractValueInputEdit.value = contract.value;
      contractDateInputEdit.value = contract.date;
      break;

    case 'popup-files':

      // Carrega a lista de documentos
      readFiles(contract.id);

      // Carregao ID e limpa o file input
      contractIdInputFiles.value = contract.id;
      contractTitleFiles.innerText = `Contrato nº ${contract.number} - ${contract.name}`;
      documentInputFiles.value = '';
      break;

    default:
      console.log("Valor não corresponde a nenhum caso");
  }
}

function renderFiles(files) {
  const tableBody = document.getElementById('table-files');
  
  let tableHTML = '';

  files.forEach(file => {

    tableHTML += `
      <tr>
          <td class="table-big">${file.name}</td>
          <td>
          <img id="action-view" class="btn-actions" src="../images/view.png" title="Visualizar documento" onclick="viewDocument('${file.path}')">
          <img id="action-download" class="btn-actions" src="../images/download.png" title="Baixar documento" onclick="downloadDocument('${file.path}')">
          <img id="action-delete" class="btn-actions" src="../images/remove.png" title="Excluir documento" onclick="deleteFile('${file.id}', '${file.contract_id}')">
          </td>
      </tr>
    `;
  });

  tableBody.innerHTML = tableHTML;
}


// -------- FUNÇÕES DE VALIDAÇÃO FRONTEND --------

// VALIDADOR CAMPO NÚMERO DO CONTRATO
function sanitizeOnlyNumberInput(input) {
  input.value = input.value.replace(/[^0-9]/g, '');
}

// VALIDADOR CAMPO DATA DE ASSINATURA
function validateDate() {
  const contractDateInputs = document.querySelectorAll(".contract-date");

  if (contractDateInputs.length > 0) {

    contractDateInputs.forEach(function (contractDateInput) {

      contractDateInput.addEventListener("change", function () {
        const selectedDate = new Date(this.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Define a hora para 00:00:00

        if (selectedDate > today) {
          alert("A data de assinatura não pode ser uma data futura.");
          this.value = "";
        }
      });
    });
  }
}

// VALIDADOR CAMPO INPUT FILES
documentInputFiles.addEventListener('change', function() {
  if (!documentInputFiles.files[0].name.toLowerCase().endsWith('.pdf')) {
    alert('Por favor, selecione um arquivo PDF válido.');
    documentInputFiles.value = '';
  }
});

// -------- FUNÇÕES DE REQUISIÇÃO PARA A API CONTRACTS --------

// CREATE CONTRACT
function registerContract() {

  const endpoint = '/api/contract';
  let contractData;

  contractData = {
    number: contractNumberInputRegister.value,
    name:   contractNameInputRegister.value,
    value:  contractValueInputRegister.value,
    date:   contractDateInputRegister.value,
  };

  fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contractData),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Erro na requisição');
      }
    })
    .then(responseData => {
      console.log('Contrato registrado com sucesso:', responseData);
      window.location.href = '/';
    })
    .catch(error => {
      console.error('Erro ao registrar contrato:', error);
    });
}

// READ CONTRACT
async function readContracts(searchTerm) {

  let endpoint = '/api/contract';

  if (searchTerm) {
      endpoint = 'api/list?search=' + encodeURIComponent(searchTerm);
  }

  try {
    const response = await fetch(endpoint);
    const contracts = await response.json();
    renderContracts(contracts);
  } catch (error) {
    console.error('Erro ao obter os contratos:', error);
    console.log(error);
  }
}

// UPDATE CONTRACT
function updateContract() {

  const contractId = contractIdInputEdit.value;
  const endpoint = `/api/contract/${contractId}`;
  let contractData;

  contractData = {
    number: contractNumberInputEdit.value,
    name:   contractNameInputEdit.value,
    value:  contractValueInputEdit.value,
    date:   contractDateInputEdit.value,
  };

  fetch(endpoint, {
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(contractData),
  })
      .then(response => {
      if (response.ok) {
          console.log(`Contrato com ID ${contractId} atualizado com sucesso.`);
          window.location.href = '/';
      } else {
          console.error(`Falha ao atualizar contrato com ID ${contractId}.`);
      }
      })
      .catch(error => {
      console.error(`Erro ao atualizar contrato com ID ${contractId}:`, error);
      });
}

// DELETE CONTRACT
async function deleteContract(contractId) {
  const endpoint = `/api/contract/${contractId}`;

  // Confirma a exclusão?
  const confirmDelete = confirm("Tem certeza que deseja excluir o contrato?");

  if (confirmDelete) {

    // Exclui todos os arquivos do contrato, caso exista
     await deleteAllFiles(contractId);

    // Envia a requisição para a exclusão do contrato
    fetch(endpoint, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          alert(`Contrato excluído com sucesso.`);
          location.reload();
        } else {
          console.error(`Falha ao excluir contrato com ID ${contractId}.`);
        }
      })
      .catch(error => {
        console.error(`Erro ao excluir contrato com ID ${contractId}:`, error);
      });
  }
}

// -------- FUNÇÕES DE REQUISIÇÃO PARA A API FILES --------

// UPLOAD FILE
function uploadDocument() {

  // Obter os dados do formulário
  const name = document.getElementById('document--name').value;
  const fileInput = document.getElementById('document--files');
  const contractId = document.getElementById('contract-id--files').value;
  const file = fileInput.files[0];

  // Verificar se o nome e o arquivo foram selecionados
  if (!name || !file) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  // Criar um objeto FormData para enviar os dados do formulário
  const formData = new FormData();
  formData.append('name', name);
  formData.append('contract_id', contractId);
  formData.append('pdf_file', file);

  const endpoint = 'api/files';

  // Enviar os dados do formulário usando o fetch
  fetch(endpoint, {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      readFiles(contractId);

      // Limpar os campos do formulário
      document.getElementById('document--name').value = '';
      document.getElementById('document--files').value = '';
    })
    .catch(error => {
      console.error('Erro ao enviar os dados do formulário:', error);
    });
}

// READ FILE
async function readFiles(contractId) {
  let endpoint = `/api/files/list/${contractId}`;

  try {
    const response = await fetch(endpoint);
    const files = await response.json();
    renderFiles(files);
  } catch (error) {
    console.error('Erro ao obter os arquivos:', error);
    console.log(error);
  }
}

// DELETE FILE
function deleteFile(fileId, contractId) {
  const endpoint = `/api/files/${fileId}`;

  // Exibe uma caixa de diálogo de confirmação
  const confirmDelete = confirm("Tem certeza que deseja excluir o contrato?");

  if (confirmDelete) {
    fetch(endpoint, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          alert(`Contrato excluído com sucesso.`);
          readFiles(contractId);
          // location.reload(); // Atualiza a página
        } else {
          console.error(`Falha ao excluir contrato com ID ${fileId}.`);
        }
      })
      .catch(error => {
        console.error(`Erro ao excluir contrato com ID ${fileId}:`, error);
      });
  }
} 

// DELETE ALL FILES
function deleteAllFiles(contractId) {
  const endpoint = `api/files/list/${contractId}`;

  return new Promise((resolve, reject) => {
    fetch(endpoint, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Falha ao excluir os arquivos do contrato com ID ${contractId}.`);
        }
        resolve(); // Resolva a promessa indicando que a exclusão foi concluída
      })
      .catch(error => {
        console.error(`Erro ao excluir os arquivos do contrato com ID ${contractId}:`, error);
        reject(error); // Rejeite a promessa em caso de erro
      });
  });
}

// VIEW DOCUMENT
function viewDocument(path) {
  const url = `view/${path}`;
  window.open(url, '_blank');
}

// DOWNLOAD DOCUMENT
function downloadDocument(path) {
  const url = `download/${path}`;
  window.open(url, '_blank');
}
