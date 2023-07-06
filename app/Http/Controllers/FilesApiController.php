<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FilesApiController extends Controller
{
    public function uploadFile(Request $request) {
        
        if ($request->hasFile('pdf_file')) {
            $file = $request->file('pdf_file');
            $filename = $file->pdf_file.name;
            $file->storeAs('files', $filename, 'local'); // Armazena o arquivo localmente na pasta 'storage/app/files'
            
            // Aqui você pode fazer outras operações, como salvar informações sobre o arquivo no banco de dados, etc.
            
            return response()->json(['message' => 'Arquivo enviado com sucesso'], 200);
        } else {
            return response()->json(['message' => 'Nenhum arquivo enviado'], 400);
        }
    }
}
