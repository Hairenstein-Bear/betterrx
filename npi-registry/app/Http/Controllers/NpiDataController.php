<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\NpiData;
class NpiDataController extends Controller
{
    function search(Request $request, $page = 1){
        $first_name = $request->input('first_name');
        $last_name = $request->input('last_name');
        $number = $request->input('number');
        $taxonomy_desc = $request->input('taxonomy_desc');
        $city = $request->input('city');
        $state = $request->input('state');
        $zip = $request->input('postal_code');
        $skip = $request->input('skip');

        $response = Http::get('https://npiregistry.cms.hhs.gov/api/', [
            'limit' => '50',
            'version' => '2.1',
            'address_purpose' => 'Location',
            'first_name' => $first_name,
            'last_name' => $last_name,
            'number' => $number,
            'taxonomy_description' => $taxonomy_desc,
            'city' => $city,
            'state' => $state,
            'postal_code' => $zip,
            'skip' => $skip
        ]);
        $data = json_decode($response->getBody());
        // dd($data);
        return response()->json(['data' => $data]);
    }
}
