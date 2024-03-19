// Função para atualizar a exibição com base no estado de autenticação do usuário
function updateUIOnAuthStateChanged(user) {
    const userDisplay = document.getElementById('user-display');
    const logoutButton = document.getElementById('logout-button');
    const loginCadastro = document.getElementsByClassName('login-cadastro')[0];
  
    if (user) {
      // Exibe o nome do usuário logado
      userDisplay = form.email;
  
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
    window.location.href = "paginas/cadastro/cadastro.html";
    firebase.auth().signOut();
   
  }
  
  // Adicione o listener de autenticação
  firebase.auth().onAuthStateChanged(updateUIOnAuthStateChanged);