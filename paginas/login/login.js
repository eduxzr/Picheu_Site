// Função para atualizar a exibição com base no estado de autenticação do usuário
function updateUIOnAuthStateChanged(user) {
    const userDisplay = document.getElementById('user-display');
    const logoutButton = document.getElementById('logout-button');
    const loginCadastro = document.getElementsByClassName('login-cadastro')[0];
  
    if (user) {
      // Exibe o nome do usuário logado
      userDisplay.textContent = user.email;
  
      // Exibe o botão de logout
      logoutButton.style.display = 'block';
  
      // Oculta o formulário de login/cadastro
      loginCadastro.style.display = 'none';
    } else {
      // Limpa o nome do usuário e oculta o botão de logout
      userDisplay.textContent = '';
      logoutButton.style.display = 'none';
  
      // Exibe o formulário de login/cadastro
      loginCadastro.style.display = 'block';
    }
  }
  
  // Função para fazer logout
  function logout() {
    firebase.auth().signOut();
  }
  
  // Adicione o listener de autenticação
  firebase.auth().onAuthStateChanged(updateUIOnAuthStateChanged);
function onChangeEmail() {
    toggleButtonsDisable();
    toggleEmailErrors();
}

function onChangePassword() {
    toggleButtonsDisable();
    togglePasswordErrors();
}

function login() {
    showLoading();
    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value
    ).then(() => {
        hideLoading();
        window.location.href = "../../index.html";
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}
function pularlogin() {
    window.location.replace("../../index.html");
}

function register() {
    window.location.href = "../cadastro/cadastro.html";
}

function recoverPassword() {
    showLoading();
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
        hideLoading();
        alert('Email enviado com sucesso');
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));
    });
}

function getErrorMessage(error) {
    if (error.code == "auth/user-not-found") {
        return "Usuário nao encontrado";
    }
    if (error.code == "auth/wrong-password") {
        return "Senha inválida";
    }
    return error.message;
}

function toggleEmailErrors() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";
    
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}

function togglePasswordErrors() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
}

function toggleButtonsDisable() {
    const emailValid = isEmailValid();
    form.recoverPasswordButton().disabled = !emailValid;

    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
}

function isEmailValid() {
    const email = form.email().value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    return form.password().value ? true : false;
}

const form = {
    email: () => document.getElementById("email"),
    emailInvalidError: () => document.getElementById("email-invalid-error"),
    emailRequiredError: () => document.getElementById("email-required-error"),
    loginButton: () => document.getElementById("login-button"),
    password: () => document.getElementById("password"),
    passwordRequiredError: () => document.getElementById("password-required-error"),
    recoverPasswordButton: () => document.getElementById("recover-password-button"),
} 