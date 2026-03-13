const output = document.querySelector('#output');
const appToken = document.querySelector('#app-token');

const forms = {
  login: document.querySelector('#form-login'),
  create: document.querySelector('#form-create'),
  list: document.querySelector('#form-list'),
  getById: document.querySelector('#form-get'),
  update: document.querySelector('#form-update'),
  remove: document.querySelector('#form-delete'),
};

const writeOutput = (title, data, isError = false) => {
  const stamp = new Date().toLocaleTimeString('pt-BR');
  output.style.color = isError ? '#9e1b29' : '#143229';
  output.textContent =
    `[${stamp}] ${title}\n\n` +
    (typeof data === 'string' ? data : JSON.stringify(data, null, 2));
};

const api = async (path, options = {}) => {
  const response = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const rawBody = await response.text();
  let payload = null;
  try {
    payload = rawBody ? JSON.parse(rawBody) : null;
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const reason =
      payload?.detalhes ||
      payload?.erro ||
      payload?.message ||
      (rawBody ? rawBody.slice(0, 240) : null) ||
      'Erro na API';

    throw new Error(`HTTP ${response.status} ${response.statusText} - ${reason}`);
  }

  return payload ?? { mensagem: rawBody || 'Resposta sem conteudo' };
};

forms.login.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const payload = {
    email: data.get('email')?.toString().trim(),
    password: data.get('password')?.toString().trim(),
  };

  try {
    const response = await api('/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    writeOutput('Login bem-sucedido', response);
    form.reset();
  } catch (error) {
    writeOutput('Login falhou', error.message, true);
  }
})

forms.create.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const tipo = data.get('tipo');

  const payload = {
    nome: data.get('nome')?.toString().trim(),
    email: data.get('email')?.toString().trim(),
    password: data.get('password')?.toString().trim(),
  };

  try {
    const response = await api(`/${tipo}`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${appToken.value.trim()}`,
      }
    });
    writeOutput(`${tipo}: criado com sucesso`, response);
    form.reset();
  } catch (error) {
    writeOutput(`${tipo}: falha ao criar`, error.message, true);
  }
});

forms.list.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const tipo = data.get('tipo');

  try {
    const response = await api(`/${tipo}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${appToken.value.trim()}`,
      }
    });
    writeOutput(`${tipo}: lista carregada`, response);
  } catch (error) {
    writeOutput(`${tipo}: falha ao listar`, error.message, true);
  }
});

forms.getById.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const tipo = data.get('tipo');
  const id = data.get('id');

  try {
    const response = await api(`/${tipo}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${appToken.value.trim()}`,
      }
    });
    writeOutput(`${tipo}: registro ${id}`, response);
  } catch (error) {
    writeOutput(`${tipo}: falha na busca`, error.message, true);
  }
});

forms.update.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const tipo = data.get('tipo');
  const id = data.get('id');

  const payload = {};
  ['nome', 'email', 'password'].forEach((field) => {
    const value = data.get(field)?.toString().trim();
    if (value) payload[field] = value;
  });

  if (Object.keys(payload).length === 0) {
    writeOutput(`${tipo}: nada para atualizar`, 'Informe ao menos um campo.', true);
    return;
  }

  try {
    const response = await api(`/${tipo}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${appToken.value.trim()}`,
      }
    });
    writeOutput(`${tipo}: registro ${id} atualizado`, response);
    form.reset();
  } catch (error) {
    writeOutput(`${tipo}: falha ao atualizar`, error.message, true);
  }
});

forms.remove.addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const tipo = data.get('tipo');
  const id = data.get('id');

  try {
    const response = await api(`/${tipo}/${id}`, {
      method: 'DELETE', headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${appToken.value.trim()}`,
      }
    });
    writeOutput(`${tipo}: registro ${id} deletado`, response);
    form.reset();
  } catch (error) {
    writeOutput(`${tipo}: falha ao deletar`, error.message, true);
  }
});
