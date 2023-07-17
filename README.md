# Sobre o Projeto

Este é um projeto de um sistema de gestão de contratos e documentos desenvolvido como produção temática no PSI para **ASSISTENTE JÚNIOR** na unidade **FCVS**. O projeto foi desenvolvido em Laravel e o sistema é executado localmente em sua máquina usando o XAMPP como servidor web e o MySQL como banco de dados.

**Funcionalidades disponíveis:**

- Cadastro de Contratos
- Busca e listagem de contratos
- Edição de contratos 
- Gravação de dados em BD
- Upload de documentos em PDF
- Visualização / Download de documentos
- Validação de dados
    - Nome do contrato - mínimo três caracteres
    - Número do contrato - nove caracteres numéricos
    - Valor do contrato - numérico e com duas casas decimais
    - Data da assinatura - datas válida e não futura
    - Upload de documento - extensão .PDF

Foram utilizados princípios **SOLID** buscando organização, otimização e facilidade na manutenção do código. O sistema foi estruturado para a aplicação funcionar com uma camada frontend separada da camada do backend, sendo ambas independentes.

No frontend a navegação, estruturação da página, captação dados e comunicação com o servidor (via API) são feitos através de HTML, Javascript e Ajax. Enquanto no servidor (backend em php) as APIs ficam responsáveis pela manipulação das informações com o BD. Por segurança, em ambas as camadas, ocorrem o tratamento e a validação dos dados.

# Requisitos

- **XAMPP:** Certifique-se de ter o XAMPP instalado em sua máquina. Ele fornece o servidor web Apache e o banco de dados MySQL necessários para executar o sistema.
- **Composer**

# Configuração

*1. Navegue no terminal até o diretório htdocs do XAMPP e execute o seguinte comando:*

    git clone https://github.com/mglessa/gestaocontratos

*2. Inicie o servidor Apache e o MySQL no XAMPP.*

*3. Crie um banco de dados vazio no MySQL para o sistema. Você pode usar o phpMyAdmin ou qualquer outra ferramenta de gerenciamento de banco de dados.*

*4. Abra o arquivo .env e configure as seguintes variáveis de ambiente:*

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=nome-do-banco-de-dados
    DB_USERNAME=seu-usuario-do-mysql
    DB_PASSWORD=sua-senha-do-mysql

*5. No terminal, navegue até o diretório do projeto e execute os seguintes comandos:*

    # Instale as dependências do Composer
    composer install

    # Gere a chave de criptografia do aplicativo
    php artisan key:generate

    # Execute as migrações do banco de dados
    php artisan migrate

*6. O sistema agora está configurado e pronto para ser executado.*

# Executando o Sistema

*1. Inicie o servidor Apache e o MySQL no XAMPP.*

*2. No terminal, navegue até o diretório do projeto.*

*3. Execute o seguinte comando para iniciar o servidor de desenvolvimento do Laravel:*

    php artisan serve

*4. Abra um navegador da web e acesse http://localhost:8000 para acessar o sistema.*

# Agradecimento
Agradeço a todos a oportunidade de participar deste processo seletivo, principalmente nesta etapa que sou desafiado a colocar em prática o que venho tanto estudando.

Abraços,<br/>
Matheus Lessa
