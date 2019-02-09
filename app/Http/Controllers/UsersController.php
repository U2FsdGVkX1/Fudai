<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    public function login (Request $request) {
        $this->validate($request, [
            'name' => 'required',
            'password' => 'required',
        ]);
        
        $user = User::where('name', $request->input('name'))->first();
        if (!$user || !Hash::check($request->input('password'), $user['password'])) {
            abort(401);
        }
        
        session(['uid' => $user->id]);
        return response()->json([]);
    }

    public function loginQRCode (Request $request) {
        $baiduinfo = [];
        $bduss = TiebaController::bdusslogin($request->input('channel_v'), $baiduinfo);
        if (!$bduss) {
            abort(401);
        }
        
        $user = User::firstOrNew([
            'name' => $baiduinfo['data']['userName']
        ], [
            'password' => '',
            'coins' => TiebaController::getyinhua($bduss)
        ]);
        $user->bduss = $bduss;
        $user->save();
        
        session(['uid' => $user->id]);
        return response()->json([]);
    }
    
    public function show (Request $request) {
        return response()->json([
            'name' => $request->user->name,
            'coins' => $request->user->coins,
            'conname' => $request->user->conname,
            'conaddress' => $request->user->conaddress,
            'conphone' => $request->user->conphone,
            'isadmin' => $request->user->isadmin
        ]);
    }
    
    public function update (Request $request) {
        $this->validate($request, [
            'conname' => 'required',
            'conaddress' => 'required',
            'conphone' => 'required|min:11|max:11'
        ]);
        
        $request->user->password = $request->has('password') ? Hash::make($request->input('password')) : $request->user->password;
        $request->user->conname = $request->input('conname');
        $request->user->conaddress = $request->input('conaddress');
        $request->user->conphone = $request->input('conphone');
        $request->user->save();
        return response()->json($request->user);
    }
}
