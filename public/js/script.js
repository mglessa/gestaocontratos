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
const documentInputFiles = document.getElementById('document--files');

const searchInput = document.getElementById('search-input');

document.addEventListener('DOMContentLoaded', readContracts()); 

// -------- FUNÇÕES DE MANIPULAÇÃO DE HTML --------

function renderContracts(contracts) {
  const tableBody = document.getElementById('contracts-table');
  const tableInfo = document.querySelector('.table-info');
  
  let tableHTML = '';

  contracts.forEach(contract => {
    const contractDate = new Date(contract.date);
    const formattedDate = contractDate.toLocaleDateString('pt-BR'); //corrigir erro

    tableHTML += `
      <tr>
          <td>${contract.number}</td>
          <td class="big">${contract.name}</td>
          <td>${contract.value}</td>
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

      // Carregao ID e limpa o file input
      contractIdInputFiles.value = contract.id;
      documentInputFiles.value = '';
      break;

    default:
      console.log("Valor não corresponde a nenhum caso");
  }
}


// -------- FUNÇÕES DE REQUISIÇÃO --------

// CREATE CONTRACT
function registerContract(contractData) {
  const endpoint = '/api/contract';

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

  console.log(searchTerm);
  // const searchInput = document.getElementById('search-input');
  // const searchTerm = searchInput.value;

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


// DELETE CONTRACT
function deleteContract(contractId) {
  const endpoint = `/api/contract/${contractId}`;

  // Exibe uma caixa de diálogo de confirmação
  const confirmDelete = confirm("Tem certeza que deseja excluir o contrato?");

  if (confirmDelete) {
    fetch(endpoint, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          alert(`Contrato excluído com sucesso.`);
          location.reload(); // Atualiza a página
        } else {
          console.error(`Falha ao excluir contrato com ID ${contractId}.`);
        }
      })
      .catch(error => {
        console.error(`Erro ao excluir contrato com ID ${contractId}:`, error);
      });
  }
} 

// UPLOAD DOCUMENT

// VIEW DOCUMENT

// DELETE DOCUMENT






