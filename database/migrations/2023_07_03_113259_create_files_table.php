<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nome do arquivo
            $table->string('path'); // Caminho para o arquivo no sistema de arquivos
            $table->unsignedBigInteger('contract_id'); // Chave estrangeira para a tabela "contracts"
            $table->timestamps(); // Colunas de data de criação e atualização
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
