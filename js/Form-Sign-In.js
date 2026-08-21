// Esperar a que todo el HTML esté cargado en el navegador
document.addEventListener('DOMContentLoaded', () => {
    
    // --- ELEMENTOS DEL DOM ---
    const contenedor = document.querySelector('.container');
    const btnSignIn = document.getElementById('btn-sign-in');
    const btnSignUp = document.getElementById('btn-sign-up');
    const formSignIn = document.getElementById('form-sign-in');
    const formSignUp = document.getElementById('form-sign-up');

    // Verificar en la consola si el script cargó bien
    console.log("Script cargado correctamente.");

    // --- 1. ANIMACIÓN DE PANELES ---
    if (btnSignUp && contenedor) {
        btnSignUp.addEventListener('click', () => {
            contenedor.classList.add('active');
        });
    }

    if (btnSignIn && contenedor) {
        btnSignIn.addEventListener('click', () => {
            contenedor.classList.remove('active');
        });
    }

    // --- 2. LOGICA DE REGISTRO ---
    if (formSignUp) {
        formSignUp.addEventListener('submit', (event) => {
            event.preventDefault();

            // Buscar inputs dentro de este formulario específico
            const inputs = formSignUp.querySelectorAll('input');
            const nombre = inputs[0].value;
            const email = inputs[1].value;
            const password = inputs[2].value;

            const nuevoUsuario = { nombre, email, password };

            // Guardar en la base de datos local del navegador
            localStorage.setItem(email, JSON.stringify(nuevoUsuario));

            alert(`¡Registro exitoso, ${nombre}! Ahora inicia sesión.`);
            formSignUp.reset();
            
            if(contenedor) contenedor.classList.remove('active');
        });
    }

    // --- 3. LOGICA DE INICIO DE SESIÓN ---
    if (formSignIn) {
        formSignIn.addEventListener('submit', (event) => {
            event.preventDefault();

            // Buscar inputs dentro de este formulario específico
            const inputs = formSignIn.querySelectorAll('input');
            const emailLogin = inputs[0].value;
            const passwordLogin = inputs[1].value;

            // Buscar en localStorage
            const usuarioGuardado = localStorage.getItem(emailLogin);

            if (usuarioGuardado) {
                const usuarioObjeto = JSON.parse(usuarioGuardado);

                if (usuarioObjeto.password === passwordLogin) {
                    alert(`¡Bienvenido/a, ${usuarioObjeto.nombre}!`);
                     window.location.href = "../index.html";
                } else {
                    alert("La contraseña no coincide.");
                }
            } else {
                alert("Este correo no está registrado.");
            }
        });
    }
});
