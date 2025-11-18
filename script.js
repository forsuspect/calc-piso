function showAlert(message, type = "error") {
    const container = document.getElementById("toast-container");

    const toast = document.createElement("div");
    toast.classList.add("toast", type);

    const icons = {
        success: '<i class="bx bx-check-circle"></i>',
        error: '<i class="bx bx-x-circle"></i>',
        warning: '<i class="bx bx-error-circle"></i>',
        info: '<i class="bx bx-info-circle"></i>'
    };

    toast.innerHTML = `
        ${icons[type]}
        <span>${message}</span>
        <i class="bx bx-x close-btn" onclick="closeToast(this.parentElement)"></i>
    `;

    container.appendChild(toast);

    setTimeout(() => closeToast(toast), 3500);
}

function closeToast(toast) {
    toast.style.animation = "fadeOut .4s forwards";
    setTimeout(() => toast.remove(), 400);
}


function calcular() {
    console.log('[ ? ] - Função calcular chamada');
    
    const area = parseFloat(document.getElementById('area').value);

    console.log('[ ? ] - Área digitada:', area);

    // Validação com Toasts Modernos 🚀
    if (!area || isNaN(area)) {
        showAlert("Por favor, preencha a área!", "warning");
        return;
    }

    if (area <= 0) {
        showAlert("A área deve ser maior que zero!", "error");
        return;
    }

    const consumoArgamassa = area / 3;
    const consumoArgamassaArredondado = Math.ceil(consumoArgamassa);
    const sacosArgamassa = Math.ceil(consumoArgamassaArredondado); // Sacos de 20kg

    const consumoRejunte = area / 5;
    const sacosRejunte1kg = Math.ceil(consumoRejunte);
    const sacosRejunte5kg = Math.ceil(consumoRejunte / 5);

    console.log('[ ? ] - Consumo argamassa:', consumoArgamassa);
    console.log('[ ? ] - Consumo rejunte:', consumoRejunte);

    document.getElementById('argamassa-kg').textContent = `${consumoArgamassa.toFixed(2)} kg`;
    document.getElementById('argamassa-sacos').textContent = `≈ ${sacosArgamassa} sacos de 20kg`;

    document.getElementById('rejunte-kg').textContent = `${consumoRejunte.toFixed(2)} kg`;
    document.getElementById('rejunte-sacos').textContent = `≈ ${sacosRejunte1kg} sacos de 1kg ou ${sacosRejunte5kg} sacos de 5kg`;

    // Mostrar seção de resultados com animação
    const resultsSection = document.getElementById('results');
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    console.log('[ ? ] - Resultados exibidos');
}

function fazerLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    console.log("[ ? ] - User: digitado:", `"${username}"`);
    console.log("[ ? ] - Senha: digitada:", `"${password}"`);

    if (!username || !password) {
        showAlert("Preencha usuário e senha!", "warning");
        return;
    }

    const loginOk =
        (username === "admin" && password === "1234") ||
        (username === "felipe" && password === "2223");

    if (loginOk) {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('calculatorContainer').style.display = 'block';

        localStorage.setItem('loggedIn', 'true');
        showAlert("Login realizado com sucesso!", "success");
    } else {
        showAlert("Usuário ou senha incorretos!", "error");
    }
}


function fazerLogout() {
    // Fazer logout
    localStorage.removeItem('loggedIn');
    document.getElementById('loginContainer').style.display = 'flex';
    document.getElementById('calculatorContainer').style.display = 'none';

    // Limpar campos de login
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('area').value = '';
    document.getElementById('results').style.display = 'none';
}

function verificarLogin() {
    if (localStorage.getItem('loggedIn') === 'true') {
        document.getElementById('loginContainer').style.display = 'none';
        document.getElementById('calculatorContainer').style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Verificar login ao carregar
    verificarLogin();

    // Permitir login com Enter
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                fazerLogin();
            }
        });
    }

    // Permitir calcular com Enter
    const areaInput = document.getElementById('area');
    if (areaInput) {
        areaInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                calcular();
            }
        });
    }
});
