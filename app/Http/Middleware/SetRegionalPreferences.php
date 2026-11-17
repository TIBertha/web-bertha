<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

class SetRegionalPreferences
{
    public function handle(Request $request, Closure $next)
    {
        $countries = array_keys(config('regions.countries'));
        $languages = array_keys(config('regions.languages'));

        $session = $request->session();

        $routeCountry = $request->route('country');

        // Entrar a una URL regional cuenta como elegir ese país.
        if (in_array($routeCountry, $countries, true)) {
            $session->put('country_selected', true);
        }

        $country = $this->firstValid(
            [
                $request->route('country'),
                $session->get('country'),
            ],
            $countries,
            config('regions.default_country')
        );

        $lang = $this->firstValid(
            [
                $session->get('lang'),
                $request->getPreferredLanguage($languages),
            ],
            $languages,
            config('regions.default_language')
        );

        if (
            $session->has('country')
            && $session->get('country') !== $country
        ) {
            $session->forget([
                'cart-seleccion',
                'filtros-seleccion',
            ]);
        }

        $session->put([
            'country' => $country,
            'lang' => $lang,
        ]);

        $session->forget([
            'cookie_preferences_decided',
            'cookie_preferences_remember',
        ]);

        // Retirar las cookies de preferencias creadas anteriormente.
        foreach (['bertha_country', 'bertha_lang'] as $name) {
            if ($request->cookies->has($name)) {
                Cookie::queue(Cookie::forget($name, '/'));
            }
        }

        app()->setLocale($lang);

        return $next($request);
    }

    private function firstValid(
        array $values,
        array $allowed,
        string $default
    ): string {
        foreach ($values as $value) {
            if (in_array($value, $allowed, true)) {
                return $value;
            }
        }

        return $default;
    }
}
