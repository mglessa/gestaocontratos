<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContractsApiController extends Controller
{

    // LISTA TODOS OS CONTRATOS
    public function index(Request $r) {
        $contracts = Contract::all();
        return $contracts;
    }

    // LOCALIZA UM CONTRATO COM BASE NO ID
    public function findOne(Request $r) {
        $contract = Contract::find($r->id);
        return $contract;
    }

    // REGISTRA UM NOVO CONTRATO
    public function register(Request $r) {

        $sanitizedData = $this->sanitizeData($r->all());
        if ($sanitizedData instanceof \Illuminate\Http\JsonResponse) {
            return $sanitizedData; // Retorna o erro de validação em caso de falha
        }
        
        // Se a validação passar, prosseguir com o registro no banco de dados
        $contract = Contract::create($sanitizedData);
        return response()->json(['message' => 'Contrato registrado com sucesso.'], 201);
    }

    // BUSCA POR NOME E Nº DE CONTRATO ----------------------------> PENDENTE
    public function list(Request $r)
    {
        $validator = Validator::make($r->all(), [
            'search' => 'string',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => 'Parâmetro de pesquisa inválido'], 400);
        }
    
        $term = $r->input('search');
    
        try {
            if (empty($term)) {
                $results = Contract::all();
            } else {
                $results = Contract::whereRaw('name LIKE ? OR number LIKE ?', ["%$term%", "%$term%"])
                    ->get();
            }
    
            return response()->json($results, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Ocorreu um erro ao processar a solicitação'], 500);
        }
    }
    
    // EDITA O CONTRATO COM BASE NO ID
    public function edit(Request $request, $id) {

        $sanitizedData = $this->sanitizeData($request->all());
        if ($sanitizedData instanceof \Illuminate\Http\JsonResponse) {
            return $sanitizedData; // Retorna o erro de validação em caso de falha
        }

        $contract = Contract::find($id);

        if (!$contract) {
            return response()->json(['error' => 'Contrato não encontrado'], 404);
        }

        // Atualizar o contrato com os dados sanitizados
        $contract->update($sanitizedData);

        return response()->json(['message' => 'Contrato atualizado com sucesso'], 200);
    }

    // DELETA O CONTRATO COM BASE NO ID
    public function delete($id) {
        $contract = Contract::find($id);

        if (!$contract) {
            return response()->json(['error' => 'Contrato não encontrado'], 404);
        }

        $contract->delete();

        return response()->json(['message' => 'Contrato excluído com sucesso'], 200);
    }   

    // VALIDA E LIMPA OS DADOS QUE SERÃO REGISTRADOS NO BD
    private function sanitizeData($data) {
        $validator = Validator::make($data, [
            'name' => 'required|string|min:3',
            'number' => 'required|numeric|digits:9',
            'value' => 'required|numeric|between:0,999999.99',
            'date' => 'required|before_or_equal:today',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Sanitização dos dados antes de registrar no banco de dados
        $sanitizedData = $validator->validated();
        
        // Remover tags HTML do campo 'name'
        $sanitizedData['name'] = strip_tags($sanitizedData['name']);

        // Formatação da data para o formato aceito pelo banco de dados
        //$sanitizedData['date'] = date_format(date_create_from_format('d-m-Y', $sanitizedData['date']), 'Y-m-d');

        return $sanitizedData;
    }

}
