<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\ContractsApiController;

class ContractsController extends Controller
{
    public function index() {
        return view('home');
    }

    public function openPopUp(Request $request)
    {
        $action = $request->input('action');
        return view('home', ['action' => $action]);
    }
}
