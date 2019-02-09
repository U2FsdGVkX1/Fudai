<?php

namespace App\Http\Controllers\Admin;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UsersController extends Controller
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

        $data = User::with('stores');
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
            'password' => 'required',
            'coins' => 'required',
            'bduss' => 'required'
        ]);

        $user = new User;
        $user->name = $request->input('name');
        $user->password = Hash::make($request->input('password'));
        $user->coins = $request->input('coins');
        $user->bduss = $request->input('bduss');
        $user->save();

        return response()->json($user);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json(User::with('stores')->find($id));
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
        $user = User::find($id);
        $user->name = $request->input('name', $user->name);
        $user->password = $request->has('password') ? Hash::make($request->input('password')) : $user->password;
        $user->coins = $request->input('coins', $user->coins);
        $user->conname = $request->input('conname', $user->conname);
        $user->conaddress = $request->input('conaddress', $user->conaddress);
        $user->conphone = $request->input('conphone', $user->conphone);
        $user->bduss = $request->input('bduss', $user->bduss);
        $user->save();

        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $store = User::find($id);
        $store->delete();

        return response()->json([]);
    }
}
