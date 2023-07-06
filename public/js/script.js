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

  function sanitizeOnlyNumberInput(input) {
      // Remover todos os caracteres não numéricos
      input.value = input.value.replace(/[^0-9]/g, '');
  }

  function sanitizeOnlyTextInput(input) {
      // Remover todos os caracteres que não sejam letras, exceto espaços
      input.value = input.value.replace(/[^A-Za-z ]/g, '');
  }

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

  function getContractById(contractId) {
      const endpoint = `/api/contract/${contractId}`;

      return fetch(endpoint)
          .then(response => response.json())
          .then(contract => {
          return contract;
          })
          .catch(error => {
          console.error(`Erro ao obter contrato com ID ${contractId}:`, error);
          });
  }

  function deleteContract(contractId) {
      const endpoint = `/api/contract/${contractId}`;
    
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

  function registerContract(contractData) {
    const endpoint = '/api/contract';

    // Faça a requisição para a API usando fetch
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contractData),
    })
      .then(response => {
        if (response.ok) {
          return response.json(); // Somente chame response.json() se a resposta for bem-sucedida
        } else {
          throw new Error('Erro na requisição'); // Lançar uma exceção para ser capturada no bloco catch
        }
      })
      .then(responseData => {
        // Aqui você pode tratar a resposta da API, se necessário
        console.log('Contrato registrado com sucesso:', responseData);

        // Redirecionar para a página inicial
        window.location.href = '/';
      })
      .catch(error => {
        console.error('Erro ao registrar contrato:', error);
      });
  }

  function updateContract(contractId, contractData) {
    const endpoint = `/api/contract/${contractId}`;

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
          // Faça algo após o contrato ser atualizado com sucesso
          window.location.href = '/';
        } else {
          console.error(`Falha ao atualizar contrato com ID ${contractId}.`);
          // Faça algo caso ocorra uma falha ao atualizar o contrato
        }
      })
      .catch(error => {
        console.error(`Erro ao atualizar contrato com ID ${contractId}:`, error);
        // Faça algo caso ocorra um erro durante a requisição
      });
  }

  function uploadFile(file) {
    // Crie um objeto FormData
    var formData = new FormData();
  
    // Adicione o arquivo ao objeto FormData
    formData.append('file', arquivo);
  
    // Faça a requisição para a API usando o método POST
    fetch('/files/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        // O arquivo foi enviado com sucesso
        console.log('Arquivo enviado com sucesso');
      } else {
        // Ocorreu um erro no envio do arquivo
        console.error('Erro ao enviar arquivo');
      }
    })
    .catch(error => {
      // Ocorreu um erro na requisição
      console.error('Erro na requisição:', error);
    });
  }
  

