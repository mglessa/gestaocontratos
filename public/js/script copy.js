  const btnSearch = document.getElementById('btn-search');
  const btnClearSearchbar = document.getElementById('btn-clear');
  const btnEdit = document.getElementById('btn-edit');
  const btnClosePopups = document.querySelectorAll('.btn-close--popup');
  const btnNewRegister = document.getElementById('btn-register');
  const sectionPopup = document.querySelector('.section-popup');
  const popup = document.querySelector('.popup');
  const contractIdInput = document.getElementById('contract-id')
  const contractNumberInput = document.getElementById('contract-number')
  const contractNameInput = document.getElementById('contract-name')
  const contractValueInput = document.getElementById('contract-value')
  const contractDateInput = document.getElementById('contract-date')
  const searchInput = document.getElementById('search-input');
  const popupFile = document.getElementById('popup-file');
  const popupContract = document.getElementById('popup');
  const contractId = document.getElementById('contract-id').value;
  const forms = document.querySelectorAll('.contract-form');

  let popupform = '';

  document.addEventListener('DOMContentLoaded', searchContracts); // Executar a pesquisa quando a página carregar inicialmente

  btnClosePopups.forEach(btnClosePopup => {
    btnClosePopup.addEventListener('click', function() {
      sectionPopup.classList.remove('active');
    });
  });

  btnNewRegister.addEventListener('click', function() {
      openPopup(false, false,'new'); // Passando false para indicar que é um novo registro
  }); 

  btnClearSearchbar.addEventListener('click', () => {
    searchInput.value = '';
    searchContracts();
  });

  btnSearch.addEventListener('click', searchContracts); // Executar a pesquisa quando o botão buscar for clickado

  forms.forEach(form => {
    form.addEventListener('submit', FormSubmit);
  });

  function openPopup(contract, contractId, typeform) {
      const sectionPopup = document.querySelector('.section-popup');
      const popupTitle = document.querySelector('.popup h2');
      const btnSend = document.getElementById('btn-send');

      sectionPopup.classList.add('active');

      if(typeform === 'file') {
        popupFile.style.display = '';
        popupContract.style.display = 'none';
        contractIdInput.value = contractId;
        popupform = 'file';

      } else {
        popupFile.style.display = 'none';
        popupContract.style.display = '';

        contractIdInput.value = '';
        contractNumberInput.value = '';
        contractNameInput.value = '';
        contractValueInput.value = '';
        contractDateInput.value = '';
        
        if (contract) {
          popupTitle.textContent = 'Editar Contrato';
          popupform = 'edit';
          contractIdInput.value = contract.id;
          contractNumberInput.value = contract.number;
          contractNameInput.value = contract.name;
          contractValueInput.value = contract.value;
          contractDateInput.value = contract.date;
          btnSend.textContent = 'ALTERAR';

          contractNumberInput.setAttribute('readonly', 'readonly');
          contractNameInput.setAttribute('readonly', 'readonly');

          contractNumberInput.classList.add('readonly-field');
          contractNameInput.classList.add('readonly-field');
    
        } else {
          popupTitle.textContent = 'Cadastrar Contrato';
          popupform = 'register';
          btnSend.textContent = 'CADASTRAR';

          contractNumberInput.removeAttribute('readonly');
          contractNameInput.removeAttribute('readonly');
        }
      }
  }



  async function searchContracts() {
      const searchTerm = searchInput.value;
      let endpoint = '/api/contract';

      if (searchTerm) {
          endpoint = 'api/list?search=' + encodeURIComponent(searchTerm);
      }

      fetch(endpoint)
          .then(response => response.json())
          .then(contracts => {
            
              const tableBody = document.getElementById('contracts-table');
              const tableInfo = document.querySelector('.table-info');
              
              let tableHTML = '';

              contracts.forEach(contract => {

                const contractDate = new Date(contract.date);
                const formattedDate = contractDate.toLocaleDateString('pt-BR');

                  tableHTML += `
                      <tr>
                          <td>${contract.number}</td>
                          <td class="big">${contract.name}</td>
                          <td>${contract.value}</td>
                          <td>${formattedDate}</td>
                          <td>
                              <img id="action-edit" class="btn-actions" src="../images/edit.png" title="Editar contrato" data-value=${contract.id}>
                              <img id="action-file" class="btn-actions" src="../images/anexo.png" title="Anexos" data-value=${contract.id}>
                              <img id="action-delete" class="btn-actions" src="../images/remove.png" title="Excluir contrato" data-value=${contract.id}>
                          </td>
                      </tr>
                  `;
              });

              tableBody.innerHTML = tableHTML;
              tableInfo.textContent = 'Qtd. Registros: ' + contracts.length;

              const btnActions = document.querySelectorAll('.btn-actions');
              for (let i = 0; i < btnActions.length; i++) {
                btnActions[i].addEventListener('click', async function() {
                  const id = this.id;
                  const dataValue = this.dataset.value;
              
                  switch (id) {
                    case 'action-delete':
                      if (confirm(`Deseja realmente excluir o contrato?`)) {
                        deleteContract(dataValue);
                      }
                      break;
                      case 'action-edit':
                        try {
                          const contract = await getContractById(dataValue);
                          openPopup(contract, dataValue, 'edit');
                        } catch (error) {
                          console.error(`Erro ao obter contrato com ID ${dataValue}:`, error);
                        }
                      break;
                      case 'action-file':
                        openPopup(false, dataValue, 'file');
                      break;
                    default:
                      alert(`Botão ${id} clicado. Valor do data-value: ${dataValue}`);
                  }
                });
              }
          })
          .catch(error => {
              console.error('Erro ao obter os contratos:', error);
              console.log(error);
          });
  }





    function createSendData(typeform) {
      let sendData; // Declaração da variável sendData
      const contractId = document.getElementById('contract-id').value;
    
      if (typeform === "file") {

        var fileInput = document.querySelector('input[type="file"]');
        const filePath = 'localhost:8000/storage/app/files/'

        if (fileInput.files.length > 0) {
          var file = fileInput.files[0];

          sendData = new FormData();
          sendData.append('name', document.getElementById('file-name').value);
          sendData.append('pdf_file', file);
          sendData.append('contract_id', contractId);
        
        } else {
          console.log("Nenhum arquivo selecionado");
        };

      } else {
        // Obtenha os valores dos campos do formulário
        const contractNumber = document.getElementById('contract-number').value;
        const contractName = document.getElementById('contract-name').value;
        const contractValue = document.getElementById('contract-value').value;
        const contractDate = document.getElementById('contract-date').value;
    
        // Construa o objeto com os dados do contrato
        sendData = {
          number: contractNumber,
          name: contractName,
          value: contractValue,
          date: contractDate,
        };
      }
    
      const data = {
        id: contractId,
        sendData: sendData,
      };
    
      return data;
    }    

    
  function FormSubmit(event) {
    event.preventDefault(); // Evita que o formulário seja enviado normalmente
    
    switch (popupform) {
      case 'register':
        contractData = createSendData(popupform);
        registerContract(contractData.sendData);
        break;
      case 'edit':
        contractData = createSendData(popupform);
        updateContract(contractData.id, contractData.sendData);
        break;
      case 'file':
        var file = fileInput.files[0];
        // fileData = createSendData(popupform);
        uploadFile(file);
        break;
      default:
        console.log('Caso não reconhecido');
    }
  }






  

