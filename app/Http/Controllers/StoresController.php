<?php

namespace App\Http\Controllers;

use App\Store;
use App\Trade;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class StoresController extends Controller
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

        $data = Store::getModel();
        if ($order)
            $data = $data->orderBy($sortby, $order);
        if ($count)
            $data = $data->count();
        else
            $data = $data->paginate($per_page);
        return response()->json($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Store $store)
    {
        return response()->json($store);
    }

    /**
     * 
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function trades(Request $request)
    {
        return response()->json($request->user->stores);
    }

    public function storeTrades(Request $request, Store $store)
    {
        if ($request->user->coins < $store->coins) {
            abort(400);
        }
        if (!$store->stock) {
            abort(400);
        }
        if (!$store->enabled) {
            abort(400);
        }
        if (!Carbon::now()->between(Carbon::parse($store->stime), Carbon::parse($store->etime))) {
            abort(400);
        }
        if ($request->user->stores->find($store->id)) {
            abort(400);
        }

        $request->user->coins -= $store->coins;
        $request->user->save();
        $store->stock--;
        $store->save();
        $request->user->stores()->attach($store->id);

        return response()->json($store);
    }
}
