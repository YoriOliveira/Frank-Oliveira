document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("customerAuthForm");
  const signupButton = document.getElementById("customerSignup");
  const logoutButton = document.getElementById("customerLogout");
  const sessionPanel = document.getElementById("customerSession");
  const emailDisplay = document.getElementById("customerEmailDisplay");
  const message = document.getElementById("customerAuthMessage");

  if (!form || !signupButton || !logoutButton || !sessionPanel || !emailDisplay || !message) return;

  const config = window.SUPABASE_CONFIG;
  if (!config || !config.url || !config.anonKey) {
    message.textContent = "Configure a URL do projeto e a chave anon/publicável em js/supabase-config.js para ativar o acesso.";
    return;
  }

  if (!window.supabase?.createClient) {
    message.textContent = "Não foi possível carregar o serviço de autenticação. Verifique sua conexão e recarregue a página.";
    return;
  }

  let client;
  try {
    client = window.supabase.createClient(config.url, config.anonKey);
  } catch (error) {
    console.error("Falha ao inicializar o Supabase:", error);
    message.textContent = "A configuração do Supabase é inválida. Confira a URL e a chave pública.";
    return;
  }

  const setBusy = busy => {
    form.querySelectorAll("button, input").forEach(element => { element.disabled = busy; });
    logoutButton.disabled = busy;
  };

  const showSession = user => {
    form.hidden = Boolean(user);
    sessionPanel.hidden = !user;
    emailDisplay.textContent = user ? `Conectado como ${user.email}` : "";
    if (user) message.textContent = "";
  };

  const showError = error => {
    if (error.message === "Invalid login credentials") {
      message.textContent = "E-mail ou senha inválidos.";
    } else if (error.message === "User already registered") {
      message.textContent = "Este e-mail já possui uma conta. Tente entrar.";
    } else {
      message.textContent = `Não foi possível concluir a operação: ${error.message}`;
    }
  };

  form.addEventListener("submit", async event => {
    event.preventDefault();
    setBusy(true);
    message.textContent = "Entrando...";

    try {
      const { error } = await client.auth.signInWithPassword({
        email: form.elements.email.value.trim(),
        password: form.elements.password.value
      });
      if (error) throw error;
      form.reset();
    } catch (error) {
      showError(error);
    } finally {
      setBusy(false);
    }
  });

  signupButton.addEventListener("click", async () => {
    if (!form.reportValidity()) return;
    setBusy(true);
    message.textContent = "Criando sua conta...";

    try {
      const { data, error } = await client.auth.signUp({
        email: form.elements.email.value.trim(),
        password: form.elements.password.value
      });
      if (error) throw error;
      form.reset();
      if (!data.session) {
        message.textContent = "Cadastro iniciado. Confira seu e-mail para confirmar a conta.";
      }
    } catch (error) {
      showError(error);
    } finally {
      setBusy(false);
    }
  });

  logoutButton.addEventListener("click", async () => {
    setBusy(true);
    message.textContent = "Encerrando sessão...";
    try {
      const { error } = await client.auth.signOut();
      if (error) throw error;
    } catch (error) {
      showError(error);
    } finally {
      setBusy(false);
    }
  });

  client.auth.onAuthStateChange((_event, session) => showSession(session?.user ?? null));
  client.auth.getSession().then(({ data, error }) => {
    if (error) {
      showError(error);
      return;
    }
    showSession(data.session?.user ?? null);
  }).catch(showError);
});
