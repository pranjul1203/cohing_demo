// ============================================
// CONFIGURATION - REPLACE WITH YOUR VALUES
// ============================================

// EmailJS Configuration
// Sign up at https://www.emailjs.com/ and get your credentials
const EMAILJS_CONFIG = {
    publicKey: 'YOUR_EMAILJS_PUBLIC_KEY',  // Replace with your EmailJS public key
    serviceId: 'YOUR_SERVICE_ID',           // Replace with your EmailJS service ID
    templateId: 'YOUR_TEMPLATE_ID'          // Replace with your EmailJS template ID
};

// WhatsApp Configuration
const WHATSAPP_CONFIG = {
    phoneNumber: '919876543210',  // Replace with your WhatsApp number (with country code, no + or -)
    defaultMessage: 'Hello! I would like to know more about your coaching courses.'
};

// ============================================
// EMAILJS INITIALIZATION
// ============================================

// Initialize EmailJS
(function() {
    emailjs.init(EMAILJS_CONFIG.publicKey);
})();

// ============================================
// MOBILE MENU TOGGLE
// ============================================

function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.getElementById('menuBtn');
    
    mobileMenu.classList.toggle('hidden');
    
    // Update icon
    const icon = menuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
        icon.setAttribute('data-lucide', 'menu');
    } else {
        icon.setAttribute('data-lucide', 'x');
    }
    lucide.createIcons();
}

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        const mobileMenu = document.getElementById('mobileMenu');
        const menuBtn = document.getElementById('menuBtn');
        
        mobileMenu.classList.add('hidden');
        
        const icon = menuBtn.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    });
});

// ============================================
// WHATSAPP INTEGRATION
// ============================================

function openWhatsApp(event) {
    event.preventDefault();
    
    const message = encodeURIComponent(WHATSAPP_CONFIG.defaultMessage);
    const url = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${message}`;
    
    window.open(url, '_blank');
}

// ============================================
// FORM SUBMISSION WITH EMAILJS
// ============================================

document.getElementById('inquiryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    const originalBtnText = submitBtn.innerHTML;
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i data-lucide="loader-2" class="animate-spin" width="20" height="20"></i> Sending...';
    lucide.createIcons();
    
    // Hide previous messages
    formMessage.classList.add('hidden');
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        course: document.getElementById('course').value,
        message: document.getElementById('message').value || 'No message provided'
    };
    
    // Send email using EmailJS
    emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
            to_name: 'Excellence Academy',
            from_name: formData.name,
            from_email: formData.email,
            phone: formData.phone,
            course: formData.course,
            message: formData.message,
            reply_to: formData.email
        }
    )
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        
        // Show success message
        formMessage.textContent = '✅ Thank you! We will contact you soon for free counseling.';
        formMessage.className = 'text-center p-4 rounded-lg bg-green-100 text-green-800';
        formMessage.classList.remove('hidden');
        
        // Reset form
        document.getElementById('inquiryForm').reset();
        
        // Optional: Send WhatsApp message too
        sendWhatsAppInquiry(formData);
        
    }, function(error) {
        console.log('FAILED...', error);
        
        // Show error message
        formMessage.textContent = '❌ Something went wrong. Please try again or contact us directly.';
        formMessage.className = 'text-center p-4 rounded-lg bg-red-100 text-red-800';
        formMessage.classList.remove('hidden');
    })
    .finally(function() {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        lucide.createIcons();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 5000);
    });
});

// ============================================
// SEND INQUIRY VIA WHATSAPP (OPTIONAL)
// ============================================

function sendWhatsAppInquiry(formData) {
    const message = `
🎓 *New Course Inquiry*

👤 *Name:* ${formData.name}
📱 *Phone:* ${formData.phone}
📧 *Email:* ${formData.email}
📚 *Course:* ${formData.course}
💬 *Message:* ${formData.message}
    `.trim();
    
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodedMessage}`;
    
    // Uncomment below to auto-open WhatsApp after form submission
    // window.open(url, '_blank');
}

// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// SCROLL TO TOP BUTTON (OPTIONAL)
// ============================================

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.remove('hidden');
        } else {
            scrollBtn.classList.add('hidden');
        }
    }
});

// ============================================
// FORM VALIDATION
// ============================================

// Phone number validation
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    e.target.value = value;
});

// Email validation
document.getElementById('email').addEventListener('blur', function(e) {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        e.target.classList.add('border-red-500');
        e.target.classList.remove('border-gray-200');
    } else {
        e.target.classList.remove('border-red-500');
        e.target.classList.add('border-gray-200');
    }
});

// ============================================
// CONSOLE INSTRUCTIONS
// ============================================

console.log('%c🎓 Excellence Academy Website', 'font-size: 20px; font-weight: bold; color: #1e40af;');
console.log('%c⚙️ Setup Instructions:', 'font-size: 14px; font-weight: bold; color: #f97316;');
console.log('%c1. EmailJS Setup:', 'font-weight: bold;');
console.log('   - Sign up at https://www.emailjs.com/');
console.log('   - Create an email service (Gmail, Outlook, etc.)');
console.log('   - Create an email template');
console.log('   - Get your Public Key, Service ID, and Template ID');
console.log('   - Replace values in EMAILJS_CONFIG in script.js');
console.log('');
console.log('%c2. WhatsApp Setup:', 'font-weight: bold;');
console.log('   - Replace phoneNumber in WHATSAPP_CONFIG with your WhatsApp number');
console.log('   - Format: Country code + number (e.g., 919876543210 for India)');
console.log('   - Customize the defaultMessage if needed');
console.log('');
console.log('%c📧 EmailJS Template Variables:', 'font-weight: bold;');
console.log('   Use these variables in your EmailJS template:');
console.log('   - {{to_name}}');
console.log('   - {{from_name}}');
console.log('   - {{from_email}}');
console.log('   - {{phone}}');
console.log('   - {{course}}');
console.log('   - {{message}}');
console.log('   - {{reply_to}}');
