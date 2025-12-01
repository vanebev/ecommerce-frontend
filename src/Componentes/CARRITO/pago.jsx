import { initMercadoPago } from '@mercadopago/sdk-react';


//console.log('VITE_APP_MP_PUBLIC_KEY:', import.meta.env.VITE_APP_MP_PUBLIC_KEY)
// Inicializa Mercado Pago con tu Public Key
initMercadoPago(import.meta.env.VITE_APP_MP_PUBLIC_KEY);


//..............Documentacion pasarela de pagos con MP


//Seller Test User
//user: TESTUSER3349146042096688804
//pass: UKFW1Y4FTt
//id: 2985544489
//Email: test_user_3349146042096688804@testuser.com

//Buyer Test User
//User: TESTUSER7607268244080878428
//Pass: V5rzjILXkg
//ID: 2986354706
//Email: //Email: test_user_7607268244080878428@testuser.com

//Tarjetas de credito de prueba
/* 
Tarjeta              Número           Codigo de seguridad    Fecha de caducidad
Mastercard          5031 7557 3453 0604        123                    11/30
Visa                4509 9535 6623 3704        123                    11/30
American Express    3711 803032 57522          1234                   11/30
*/

//Usuarios para disimular estado pago
/* 
Estado de pago	  Descripción	                Documento de identidad
APRO              Pago aprobado                  (DNI) 12345678
OTHE              Rechazado por error general    (DNI) 12345678
*/