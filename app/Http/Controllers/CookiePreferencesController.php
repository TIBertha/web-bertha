<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Validation\Rule;

class CookiePreferencesController extends Controller
{
    public function save(Request $request)
    {
        $data = $request->validate([
            'country' => [
                'required',
                Rule::in(array_keys(config('regions.countries'))),
            ],
            'lang' => [
                'required',
                Rule::in(array_keys(config('regions.languages'))),
            ],
            'remember' => [
                'required',
                'boolean',
            ],
        ]);

        $remember = $request->boolean('remember');

        // El carrito y los filtros pertenecen al país seleccionado.
        if (
            $request->session()->has('country')
            && $request->session()->get('country') !== $data['country']
        ) {
            $request->session()->forget([
                'cart-seleccion',
                'filtros-seleccion',
            ]);
        }

        // Ambas opciones conservan la elección durante la sesión.
        $request->session()->put([
            'country' => $data['country'],
            'lang' => $data['lang'],
            'cookie_preferences_decided' => true,
            'cookie_preferences_remember' => $remember,
        ]);

        if ($remember) {
            $preferences = [
                'bertha_country' => $data['country'],
                'bertha_lang' => $data['lang'],
            ];

            foreach ($preferences as $name => $value) {
                Cookie::queue(
                    Cookie::make(
                        $name,
                        $value,
                        config('regions.cookie_minutes'),
                        '/',
                        null,
                        $request->isSecure(),
                        true,
                        false,
                        'lax'
                    )
                );
            }
        } else {
            // Elimina preferencias persistentes si existían.
            Cookie::queue(Cookie::forget('bertha_country', '/'));
            Cookie::queue(Cookie::forget('bertha_lang', '/'));
        }

        return response()->json([
            'code' => 200,
            'country' => $data['country'],
            'lang' => $data['lang'],
            'remember' => $remember,
        ]);
    }
}
