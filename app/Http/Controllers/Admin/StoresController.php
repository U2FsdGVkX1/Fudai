<?php

namespace App\Http\Controllers\Admin;

use App\Store;
use App\Trade;
use App\ActionLog;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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

        $data = Store::with('users');
        if ($order)
            $data = $data->orderBy($sortby, $order);
        if ($count)
            $data = $data->count();
        else
            $data = $data->paginate($per_page);
        return response()->json($data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'text' => 'required',
            'image' => 'required',
            'stock' => 'integer',
            'coins' => 'integer',
            'stime' => 'date',
            'etime' => 'date'
        ]);

        $store = new Store;
        $store->name = $request->input('name');
        $store->text = $request->input('text');
        $store->image = $request->input('image');
        $store->stock = $request->input('stock');
        $store->coins = $request->input('coins');
        $store->stime = $request->input('stime');
        $store->etime = $request->input('etime');
        $store->save();

        return response()->json($store);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json(Store::with('users')->find($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $store = Store::find($id);
        $store->name = $request->input('name', $store->name);
        $store->text = $request->input('text', $store->text);
        $store->image = $request->input('image', $store->image);
        $store->stock = $request->input('stock', $store->stock);
        $store->coins = $request->input('coins', $store->coins);
        $store->stime = $request->input('stime', $store->stime);
        $store->etime = $request->input('etime', $store->etime);
        $store->enabled = $request->input('enabled', $store->enabled);
        $store->save();

        return response()->json($store);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $store = Store::find($id);
        $store->delete();
        return response()->json([]);
    }

    public function trades()
    {
        return response()->json(Trade::with(['user', 'store'])->get());
    }

    public function clearTrades()
    {
        Trade::truncate();
        return response()->json([]);
    }

    public function updateTrades(Request $request, $id)
    {
        $this->validate($request, [
            'tno' => 'integer',
        ]);

        $trade = Trade::find($id);

        ActionLog::create([
            'user_id' => $trade->user->id,
            'type' => 3,
            'text' => $trade->store->name . ' 已发货，快递单号：' . $request->input('tno'),
        ]);
        
        return response()->json([]);
    }
}
