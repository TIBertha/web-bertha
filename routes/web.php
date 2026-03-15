<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MasterController;
use App\Http\Controllers\BuscoTrabajoController;
use App\Http\Controllers\SeleccionController;
use App\Http\Controllers\FichaTrabajadorController;
use App\Http\Controllers\ShortURLController;
use App\Http\Controllers\RegistroRequerimientoController;
use App\Http\Controllers\RegistroPostulanteController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\WebController;
use App\Http\Controllers\ReclamoController;

//ruta subir archivos
Route::post('/ajax-upload-file', [MasterController::class, 'ajaxUploadFile']);


//ruta de Inicio
Route::get('/', [WebController::class, 'index'])->name('inicio');
Route::get('/es-pe', [WebController::class, 'viewPeru'])->name('inicio-pe');
Route::post('/ajax-disable-modal-seleccion', [WebController::class, 'ajaxDisableModal']);
Route::post('/ajax-verify-disable-modal-seleccion', [WebController::class, 'ajaxVerifyDisableModal']);
Route::post('/ajax-get-data-prensa', [WebController::class, 'ajaxGetDataPrensa']);
Route::post('/ajax-get-testimoniales-empleador', [WebController::class, 'ajaxGetTestimonialesEmpleador']);
Route::post('/ajax-get-testimoniales-trabajador', [WebController::class, 'ajaxGetTestimonialesTrabajador']);
Route::post('/ajax-get-country-code', [WebController::class, 'ajaxGetCountryCode']);
Route::post('/ajax-get-views', [WebController::class, 'ajaxGetViews']);
Route::post('/ajax-get-redes-sociales', [WebController::class, 'ajaxGetRedesSociales']);

//ruta de condiciones
Route::get('/condiciones', [WebController::class, 'condiciones'])->name('condiciones');

//ruta de privacidad
Route::get('/privacidad', [WebController::class, 'viewPrivacidad'])->name('privacidad');

//ruta post reclamos
Route::get('/reclamos', [ReclamoController::class, 'viewLibroReclamaciones'])->name('libro-reclamaciones');
Route::post('/ajax-reclamos-new', [ReclamoController::class, 'ajaxNew']);
Route::post('/ajax-get-data-reclamos', [ReclamoController::class, 'ajaxGetData']);

//rutas comerciales
Route::get('/cuenta-bancaria', [WebController::class, 'cuentaBancariaView'])->name('cuenta-bancaria');

//ruta de seleccionar
Route::get('/seleccionar', [SeleccionController::class, 'index'])->name('pedidos');
Route::get('/es-pe/seleccionar', [SeleccionController::class, 'viewPeru'])->name('pedidos-pe');
Route::post('/ajax-procesar-seleccion', [SeleccionController::class, 'ajaxProcesarSeleccion']);
Route::post('/ajax-save-cart-seleccion', [SeleccionController::class, 'ajaxSaveCartSeleccion']);
Route::post('/ajax-get-seleccion-card-trabajadores', [SeleccionController::class, 'ajaxGetSeleccionCard']);
Route::post('/ajax-iniciar-registro-requerimiento', [SeleccionController::class, 'ajaxIniciarRegistroRequerimiento']);
Route::post('/ajax-registrar-empleador-requerimiento', [SeleccionController::class, 'ajaxRegistrarEmpleadorRequerimiento']);

//ruta de registro usuario
Route::post('/ajax-check-phone', [UsuarioController::class, 'ajaxCheckPhone']);

//CONFIRMACION DE PEDIDO(SIN INICIAR REQUERIMIENTO)
Route::get('/confirmar-seleccion', [SeleccionController::class, 'viewSeleccionConfirmar'])->name('seleccion-confirmar');
Route::post('/ajax-get-cart-seleccion', [SeleccionController::class, 'ajaxGetCartSeleccion']);
Route::post('/ajax-finalizar-seleccion', [SeleccionController::class, 'ajaxFinalizarSeleccion']);
Route::post('/ajax-delete-cart-seleccion', [SeleccionController::class, 'ajaxDeleteCartSeleccion']);
Route::post('/ajax-continuar-cart-seleccion', [SeleccionController::class, 'ajaxContinuarCartSeleccion']);


//ruta de formulario de Requerimiento
Route::get('/requerimiento/{codigo}', [RegistroRequerimientoController::class, 'viewRegistroRequerimiento'])->name('requerimiento-form');
Route::post('/ajax-load-data-registro-requerimiento', [RegistroRequerimientoController::class, 'ajaxLoadDataRegistroRequerimiento']);
Route::post('/ajax-refresh-options-registro-requerimiento', [RegistroRequerimientoController::class, 'ajaxRefreshOptionsRegistroRequerimiento']);
Route::post('/ajax-save-registro-requerimiento', [RegistroRequerimientoController::class, 'ajaxSaveRegistroRequerimiento']);
Route::post('/ajax-send-mail-req', [RegistroRequerimientoController::class, 'ajaxSendMailReq']);


//ruta registro de postulante
Route::get('/registro-postulante/{token}', [RegistroPostulanteController::class, 'viewRegistroPostulante']);
Route::post('/ajax-get-actividades-by-genero', [RegistroPostulanteController::class, 'ajaxGetActividadesByGenero']);
Route::post('/ajax-load-data-registro-postulante', [RegistroPostulanteController::class, 'ajaxLoadDataRegistroPostulante']);
Route::post('/ajax-save-registro-postulante', [RegistroPostulanteController::class, 'ajaxSaveRegistroPostulante']);
Route::post('/ajax-search-departamentos-list', [RegistroPostulanteController::class, 'ajaxSearchDepartamentosList']);
Route::post('/ajax-upload-youtube-registro-postulante', [RegistroPostulanteController::class, 'ajaxUploadYoutubeRegistroPostulante']);
Route::post('/ajax-delete-youtube-registro-postulante', [RegistroPostulanteController::class, 'ajaxDeleteYoutubeRegistroPostulante']);


//ruta de visualización de perfil Trabajador
Route::get('/ficha/{token}', [FichaTrabajadorController::class, 'viewFichaRestringidaTrabajador']);
Route::get('/ficha-postulante/{token}', [FichaTrabajadorController::class, 'viewFichaCRMTrabajador']);
Route::post('/ajax-get-data-ficha-restringida', [FichaTrabajadorController::class, 'ajaxGetDataFichaRestringidaTrabajador']);
Route::post('/ajax-get-likes-and-views', [FichaTrabajadorController::class, 'ajaxGetLikesAndViews']);
Route::post('/ajax-add-like-ficha', [FichaTrabajadorController::class, 'ajaxAddLikeFicha']);
Route::post('/ajax-remove-like-ficha', [FichaTrabajadorController::class, 'ajaxRemoveLikeFicha']);

//ShortURLController
Route::get('/ver-domicilio/{link}', [ShortURLController::class, 'ajaxOpenEncondeDomicilio']);
Route::get('/empleador/ver-direccion/{link}', [ShortURLController::class, 'ajaxOpenEncodeEmpleadorDireccion']);
Route::get('/contrato/ver-direccion/{link}', [ShortURLController::class, 'ajaxOpenEncodeDireccionContrato']);
Route::get('/contrato/ver-constancia/{link}', [ShortURLController::class, 'ajaxOpenEncodeConstanciaColocacion']);
Route::get('/pdf/ver-contrato/{link}', [ShortURLController::class, 'ajaxOpenEncodePDFContrato']);
Route::get('/pdf/ver-curriculo/{link}', [ShortURLController::class, 'ajaxOpenEncodePDFCurriculo']);
Route::get('/pdf/ver-comprobante/{link}', [ShortURLController::class, 'ajaxOpenEncodePDFComprobante']);
Route::get('/pdf/ver-comprobante-adelanto/{link}', [ShortURLController::class, 'ajaxOpenEncodePDFComprobanteAdelanto']);
Route::get('/pdf/ver-adelanto/{link}', [ShortURLController::class, 'ajaxOpenEncodePDFVerAdelanto']);
Route::get('/docs/foto-referencial', [ShortURLController::class, 'ajaxOpenFotoReferencial']);
