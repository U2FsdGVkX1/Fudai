<?php

namespace App\Http\Controllers;

use App\ActionLog;
use Illuminate\Http\Request;

class LogsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $order = $request->input('order');
        $sortby = $request->input('sortby', 'id');
        $per_page = $request->input('per_page', '100');
        $count = $request->input('count', '0');

        $data = ActionLog::where('user_id', $request->user->id);
        if ($order)
            $data = $data->orderBy($sortby, $order);
        if ($count)
            $data = $data->count();
        else
            $data = $data->paginate($per_page);
        return response()->json($data);
    }
}
