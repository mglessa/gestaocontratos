
// ENVIA REQUISIÇÕES A API


// CREATE


// READ
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

// UPDATE
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






// UPLOAD FILE
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