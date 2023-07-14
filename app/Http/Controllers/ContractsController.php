<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\ContractsApiController;



class ContractsController extends Controller
{
    public function index() {
        return view('home');
    }

    public function viewPDF($filename) {

        $path = storage_path('app/files/' . $filename);
        return response()->file($path, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline',
        ]);
    }

    public function downloadPDF($filename) {
        $path = storage_path('app/files/' . $filename);
        $response = Response::download($path, $filename, [
            'Content-Type' => 'application/pdf'
        ]);
        return $response;
    }
    
}
