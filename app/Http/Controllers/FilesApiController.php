<?php

namespace App\Http\Controllers;

use App\Models\File;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class FilesApiController extends Controller {

    //LISTA TODOS OS DOCUMENTOS
    public function index($contractId) {
        $documents = File::where('contract_id', $contractId)->get();
        return $documents;
    }

    //CREATE
    public function uploadFile(Request $r) {
        // Validar os dados do request
        $validatedData = $r->validate([
            'name' => 'required|string|min:2',
            'contract_id' => 'required|integer',
            'pdf_file' => 'required|mimes:pdf|max:2048', // Exemplo: limite de 2 MB
        ]);
    
        // Gerar o nome do arquivo
        $keyName = Str::slug($validatedData['name'], '') . '_' . now()->format('YmdHis');
    
        // Obter o arquivo enviado
        $file = $r->file('pdf_file');
    
        // Salvar o arquivo na pasta correta com o nome gerado
        $filePath = $file->storeAs('files', $keyName . '.' . $file->getClientOriginalExtension());
    
        // Criar o registro no banco de dados
        $document = File::create([
            'name' => $validatedData['name'],
            'path' => $filePath,
            'contract_id' => $validatedData['contract_id'],
        ]);
    
        return response()->json(['message' => 'Documento enviado com sucesso.'], 201);
    }

    //READ
    public function findOne(Request $r) {
        $document = File::find($r->id);
        return $document;
    }

    //DELETE
    public function deleteFile($id) {
        $document = File::find($id);
    
        if (!$document) {
            return response()->json(['error' => 'Contrato não encontrado'], 404);
        }
    
        // Obter o caminho do arquivo
        $filePath = storage_path('app/' . $document->path);

        // Verificar se o arquivo existe
        if (file_exists($filePath)) {
            // Excluir o arquivo do disco
            Storage::delete($document->path);
        }
    
        // Excluir o registro do banco de dados
        $document->delete();
    
        return response()->json(['message' => 'Contrato excluído com sucesso'], 200);
    }

    //DELETA TODOS OS ARQUIVOS DE UM CONTRATO
    public function deleteAllFiles($contractId) {
    
        $documents = File::where('contract_id', $contractId)->get();
        
        if ($documents->isEmpty()) {
            return response()->json(['message' => 'Nenhum arquivo encontrado para exclusão'], 404);
        }
    
        foreach ($documents as $document) {

            $filePath = storage_path('app/' . $document->path);
    
            if (file_exists($filePath)) {
                Storage::delete($document->path);
            }
        }

        return response()->json(['message' => 'Contratos excluídos com sucesso'], 200);
    }

}
