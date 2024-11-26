// Função para carregar os contatos do LocalStorage
function loadContacts() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = ''; // Limpa a lista atual

    contacts.forEach((contact, index) => {
        const contactItem = document.createElement('li');
        contactItem.innerHTML = `
            <strong>${contact.name}</strong> - ${contact.phone} - ${contact.email}
            <button onclick="editContact(${index})">Editar</button>
            <button onclick="deleteContact(${index})">Excluir</button>
        `;
        contactList.appendChild(contactItem);
    });
}

// Função para adicionar ou editar um contato
function saveContact(event) {
    event.preventDefault(); // Impede o envio do formulário

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    // Verifica se estamos editando um contato existente
    const contactIndex = document.getElementById('contact-form').dataset.index;
    
    if (contactIndex !== undefined) {
        // Edita o contato
        contacts[contactIndex] = { name, phone, email };
    } else {
        // Adiciona um novo contato
        contacts.push({ name, phone, email });
    }

    // Salva os contatos no LocalStorage
    localStorage.setItem('contacts', JSON.stringify(contacts));

    // Limpa o formulário e atualiza a lista
    document.getElementById('contact-form').reset();
    delete document.getElementById('contact-form').dataset.index; // Remove o índice de edição
    loadContacts();
}

// Função para editar um contato
function editContact(index) {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    const contact = contacts[index];

    // Preenche o formulário com os dados do contato
    document.getElementById('name').value = contact.name;
    document.getElementById('phone').value = contact.phone;
    document.getElementById('email').value = contact.email;

    // Define o índice de edição no formulário
    document.getElementById('contact-form').dataset.index = index;
}

// Função para excluir um contato
function deleteContact(index) {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    contacts.splice(index, 1); // Remove o contato da lista

    // Atualiza o LocalStorage
    localStorage.setItem('contacts', JSON.stringify(contacts));

    // Atualiza a lista exibida
    loadContacts();
}

// Adiciona um ou edita um contato ao enviar o formulário
document.getElementById('contact-form').addEventListener('submit', saveContact);

// Carrega os contatos ao abrir a página
window.onload = loadContacts;
