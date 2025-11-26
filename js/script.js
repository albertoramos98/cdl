// ===========================
// CAROUSEL / BANNER
// ===========================

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

// Auto-play carousel
let carouselInterval = setInterval(nextSlide, 5000);

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    slides[n].classList.add('active');
    indicators[n].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Carousel controls
document.getElementById('nextBtn').addEventListener('click', () => {
    nextSlide();
    resetCarouselInterval();
});

document.getElementById('prevBtn').addEventListener('click', () => {
    prevSlide();
    resetCarouselInterval();
});

// Indicator clicks
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        resetCarouselInterval();
    });
});

function resetCarouselInterval() {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(nextSlide, 5000);
}

// ===========================
// MENU MOBILE
// ===========================

const menuToggle = document.getElementById('menuToggle');
const navMobile = document.getElementById('navMobile');
const navLinks = document.querySelectorAll('.nav-mobile .nav-link');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMobile.classList.toggle('active');
});

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMobile.classList.remove('active');
    });
});

// ===========================
// DROPDOWN MOBILE
// ===========================

const dropdownToggle = document.getElementById('dropdownToggle');
const dropdownMenu = document.getElementById('dropdownMenu');

dropdownToggle.addEventListener('click', () => {
    dropdownMenu.classList.toggle('active');
});

// Fechar dropdown ao clicar em um link
const dropdownLinks = document.querySelectorAll('.dropdown-menu-mobile a');
dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
        dropdownMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        navMobile.classList.remove('active');
    });
});

// ===========================
// MODAL TERMOS
// ===========================

const termsBtn = document.getElementById('termsBtn');
const termsModal = document.getElementById('termsModal');
const closeTermsBtns = document.querySelectorAll('#closeTermsBtn, #closeTermsBtn2');

termsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    termsModal.classList.add('active');
});

closeTermsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        termsModal.classList.remove('active');
    });
});

// Fechar modal ao clicar fora
termsModal.addEventListener('click', (e) => {
    if (e.target === termsModal) {
        termsModal.classList.remove('active');
    }
});

// ===========================
// VALIDACAO DE CPF
// ===========================

function validateCPF(cpf) {
    const cleanCPF = cpf.replace(/\D/g, '');
    
    if (cleanCPF.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
    
    let sum = 0;
    let remainder = 0;
    
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(9, 10))) return false;
    
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
    }
    
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(10, 11))) return false;
    
    return true;
}

// ===========================
// VALIDACAO DE CNPJ
// ===========================

function validateCNPJ(cnpj) {
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    
    if (cleanCNPJ.length !== 14) return false;
    if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false;
    
    let size = cleanCNPJ.length - 2;
    let numbers = cleanCNPJ.substring(0, size);
    let digits = cleanCNPJ.substring(size);
    let sum = 0;
    let pos = size - 7;
    
    for (let i = size; i >= 1; i--) {
        sum += parseInt(numbers.charAt(size - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;
    
    size = size + 1;
    numbers = cleanCNPJ.substring(0, size);
    sum = 0;
    pos = size - 7;
    
    for (let i = size; i >= 1; i--) {
        sum += parseInt(numbers.charAt(size - i)) * pos--;
        if (pos < 2) pos = 9;
    }
    
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) return false;
    
    return true;
}

// ===========================
// FORMULARIO ASSOCIACAO
// ===========================

const associationForm = document.getElementById('associationForm');
const formError = document.getElementById('formError');
const formSuccess = document.getElementById('formSuccess');
const documentTypeSelect = document.getElementById('documentType');
const cpfCnpjLabel = document.querySelector('label[for="cpfCnpj"]');
const cpfCnpjInput = document.getElementById('cpfCnpj');

// Atualizar label ao mudar tipo de documento
documentTypeSelect.addEventListener('change', () => {
    const isoCPF = documentTypeSelect.value === 'cpf';
    cpfCnpjLabel.textContent = isoCPF ? 'CPF *' : 'CNPJ *';
    cpfCnpjInput.placeholder = isoCPF ? '000.000.000-00' : '00.000.000/0000-00';
});

// Enviar formulario
associationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Limpar erros anteriores
    formError.style.display = 'none';
    formError.textContent = '';
    
    // Obter dados do formulario
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const documentType = documentTypeSelect.value;
    const cpfCnpj = document.getElementById('cpfCnpj').value.trim();
    const acceptTerms = document.getElementById('acceptTerms').checked;
    
    // Validacoes
    if (!name) {
        showError('Por favor, informe seu nome completo');
        return;
    }
    
    if (!email || !email.includes('@')) {
        showError('Por favor, informe um e-mail valido');
        return;
    }
    
    if (!phone) {
        showError('Por favor, informe seu telefone');
        return;
    }
    
    if (!cpfCnpj) {
        showError(`Por favor, informe seu ${documentType === 'cpf' ? 'CPF' : 'CNPJ'}`);
        return;
    }
    
    // Validar CPF ou CNPJ
    const isValid = documentType === 'cpf' ? validateCPF(cpfCnpj) : validateCNPJ(cpfCnpj);
    if (!isValid) {
        showError(`${documentType === 'cpf' ? 'CPF' : 'CNPJ'} invalido. Por favor, verifique os dados.`);
        return;
    }
    
    if (!acceptTerms) {
        showError('Por favor, aceite os termos de associacao');
        return;
    }
    
    // Simular envio
    submitForm({
        name,
        email,
        phone,
        documentType,
        cpfCnpj,
        acceptTerms
    });
});

function showError(message) {
    formError.textContent = message;
    formError.style.display = 'block';
    formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function submitForm(data) {
    console.log('Dados do formulario:', data);
    
    // Mostrar mensagem de sucesso
    associationForm.style.display = 'none';
    formSuccess.style.display = 'block';
    
    // Resetar formulario
    associationForm.reset();
    
    // Mostrar formulario novamente apos 5 segundos
    setTimeout(() => {
        associationForm.style.display = 'flex';
        formSuccess.style.display = 'none';
    }, 5000);
}

// ===========================
// FORMULARIO DE CONTATO
// ===========================

const contactForm = document.getElementById('contactForm');
const contactFormError = document.getElementById('contactFormError');
const contactFormSuccess = document.getElementById('contactFormSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Limpar erros anteriores
        contactFormError.style.display = 'none';
        contactFormError.textContent = '';
        
        // Obter dados do formulario
        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const phone = document.getElementById('contact-phone').value.trim();
        const subject = document.getElementById('contact-subject').value.trim();
        const message = document.getElementById('contact-message').value.trim();
        
        // Validacoes
        if (!name) {
            showContactError('Por favor, informe seu nome completo');
            return;
        }
        
        if (!email || !email.includes('@')) {
            showContactError('Por favor, informe um e-mail valido');
            return;
        }
        
        if (!phone) {
            showContactError('Por favor, informe seu telefone');
            return;
        }
        
        if (!subject) {
            showContactError('Por favor, selecione um assunto');
            return;
        }
        
        if (!message) {
            showContactError('Por favor, escreva sua mensagem');
            return;
        }
        
        // Simular envio
        submitContactForm({
            name,
            email,
            phone,
            subject,
            message
        });
    });
}

function showContactError(message) {
    contactFormError.textContent = message;
    contactFormError.style.display = 'block';
    contactFormError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function submitContactForm(data) {
    console.log('Dados do formulario de contato:', data);
    
    // Mostrar mensagem de sucesso
    contactForm.style.display = 'none';
    contactFormSuccess.style.display = 'block';
    
    // Resetar formulario
    contactForm.reset();
    
    // Mostrar formulario novamente apos 5 segundos
    setTimeout(() => {
        contactForm.style.display = 'flex';
        contactFormSuccess.style.display = 'none';
    }, 5000);
}

// ===========================
// BOTOES SPC E CCT
// ===========================

const spcBtn = document.getElementById('spcBtn');
const cctBtn = document.getElementById('cctBtn');

if (spcBtn) {
    spcBtn.addEventListener('click', () => {
        alert('Sistema SPC\n\nEste eh um link para o sistema SPC. Para acessar, voce precisara de suas credenciais de associado.\n\nEntre em contato com a CDL para obter suas credenciais.');
    });
}

if (cctBtn) {
    cctBtn.addEventListener('click', () => {
        alert('Download CCT\n\nO documento da CCT estara disponivel em breve.\n\nEntre em contato com a CDL para solicitar o documento.');
    });
}

// ===========================
// SMOOTH SCROLL
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// INICIALIZACAO
// ===========================

// Mostrar primeiro slide
showSlide(0);
