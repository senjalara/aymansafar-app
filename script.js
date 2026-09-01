document.addEventListener('DOMContentLoaded', () => {
    // ==== TAB NAVIGATION LOGIC ====
    const menuBtns = document.querySelectorAll('.menu-btn');
    const contentPanels = document.querySelectorAll('.content-panel');

    menuBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Hapus class active dari semua tombol
            menuBtns.forEach(b => b.classList.remove('active'));
            // Tambahkan class active ke tombol yang diklik
            btn.classList.add('active');

            // Sembunyikan semua panel
            contentPanels.forEach(panel => panel.style.display = 'none');

            // Tampilkan panel yang sesuai dengan data-target
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).style.display = 'block';
        });
    });

    // ==== TELEGRAM FORM LOGIC ====
    const form = document.getElementById('registrationForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.querySelector('.btn-text');
    const spinner = document.getElementById('spinner');
    const statusMessage = document.getElementById('statusMessage');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const investmentAmount = document.getElementById('investment_amount').value;
        const investmentCurrency = document.getElementById('investment_currency').value;
        const investment = `${investmentAmount} ${investmentCurrency}`;
        const country = document.getElementById('country').value;

        submitBtn.disabled = true;
        btnText.textContent = 'جاري الإرسال...';
        spinner.style.display = 'inline-block';
        statusMessage.style.display = 'none';

        try {
            const BOT_TOKEN = '8681023608:AAHOYuJolskBgPNO51s8TNGkn6H865F2_jM'; 
            const CHAT_ID = '8755254303';
            
            const telegramMessage = `
🌟 <b>New Registration!</b> 🌟

👤 <b>Full Name:</b> ${name || '-'}
🏠 <b>Address:</b> ${address || '-'}
📧 <b>Email:</b> ${email || '-'}
📱 <b>Phone Number:</b> ${phone || '-'}
💰 <b>Investment Amount:</b> ${investment || '-'}
🌍 <b>Country:</b> ${country || '-'}
            `.trim();

            const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: CHAT_ID, text: telegramMessage, parse_mode: 'HTML' })
            });
            const data = await response.json();

            if (data.ok) {
                showStatus('Registration submitted successfully! Thank you.', 'success');
                form.reset();
            } else {
                showStatus(`Failed to submit: ${data.description}`, 'error');
            }
        } catch (error) {
            showStatus('Network error occurred.', 'error');
        } finally {
            submitBtn.disabled = false;
            btnText.textContent = 'إرسال التسجيل';
            spinner.style.display = 'none';
        }
    });

    function showStatus(text, type) {
        statusMessage.textContent = text;
        statusMessage.style.display = 'block';
        statusMessage.style.color = type === 'success' ? '#10b981' : '#ef4444';
    }
});
