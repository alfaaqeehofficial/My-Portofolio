#!/usr/bin/env python3
import re

with open('d:/porto/index.html', 'r', encoding='utf-8') as f:
    h = f.read()

# ── 1. Meta / lang
h = h.replace('<html lang="id">', '<html lang="en">')
h = h.replace(
    'Portofolio profesional Muhammad Ali Al Faqih — Web Developer, Digital Designer & Information Systems Student dengan UI Realistic Glassmorphism dan interaksi mikro taktil.',
    'Professional portfolio of Muhammad Ali Al Faqih — Web Developer, Digital Designer & Information Systems Student with Realistic Glassmorphism UI and tactile micro-interactions.'
)

# ── 2. Favicon (insert before </head>)
favicon = '  <link rel="icon" type="image/png" href="icon.png">\n'
if 'rel="icon"' not in h:
    h = h.replace('  <link rel="stylesheet" href="style.css">', favicon + '  <link rel="stylesheet" href="style.css">')

# ── 3. Navbar text → English
nav_map = {
    '>Beranda<': '>Home<',
    '>Tentang<': '>About<',
    '>Proyek<': '>Projects<',
    '>Keahlian<': '>Certificates<',
    '>Pengalaman<': '>Experience<',
    '>Kontak<': '>Contact<',
    '>Hubungi<': '>Contact<',
    '>Tentang Saya<': '>About Me<',
    '>Proyek &amp; Portfolio<': '>Projects &amp; Portfolio<',
    '>Keahlian &amp; Stack<': '>Certificates &amp; Stack<',
    '>Pengalaman Karir<': '>Career Experience<',
    '>Hubungi Saya<': '>Contact Me<',
}
for old, new in nav_map.items():
    h = h.replace(old, new)

h = h.replace('title="Buka Menu"', 'title="Open Menu"')
h = h.replace('title="Ganti Mode Terang / Gelap"', 'title="Toggle Light / Dark Mode"')
h = h.replace('title="Aktif/Nonaktifkan Efek Suara Tactile"', 'title="Toggle Tactile Sound Effects"')
h = h.replace('title="Ganti Tema Warna Aurora"', 'title="Switch Aurora Color Theme"')
h = h.replace('aria-label="Tutup Menu"', 'aria-label="Close Menu"')

# ── 4. Remove status pill (Available for Freelance...)
h = re.sub(
    r'\s*<div class="hero-status-pill">.*?</div>\s*',
    '\n            ',
    h, flags=re.DOTALL
)

# ── 5. Hero metric labels
h = h.replace('Tahun Pengalaman', 'Years Experience')
h = h.replace('Proyek Selesai', 'Projects Done')
h = h.replace('Kepuasan Klien', 'Client Satisfaction')

# ── 6. Hero card floating badge + timezone
h = h.replace('Spesialisasi', 'Specialization')
h = h.replace('Zona Waktu: WIB', 'Timezone: WIB')

# ── 7. Remove About section (id="tentang") entirely
h = re.sub(
    r'<!--\s*={5,}\s*\n\s*ABOUT SECTION.*?</section>\s*\n',
    '',
    h, flags=re.DOTALL
)

# ── 8. Projects section header → English
h = h.replace('<span>Karya Terpilih</span>', '<span>Selected Works</span>')
h = h.replace('Portofolio &amp; Studi Kasus', 'Portfolio &amp; Case Studies')
h = h.replace('Kumpulan proyek pilihan meliputi portal web cloud, riset analitik statistik, dan identitas visual branding acara.',
              'A curated collection of projects spanning cloud web portals, statistical data research, and event visual branding.')
h = h.replace('<button class="filter-btn active magnetic" data-filter="all">Semua Proyek</button>',
              '<button class="filter-btn active magnetic" data-filter="all">All Projects</button>')

# Project card "Lihat Detail Studi" → View Case Study
h = h.replace('<span>Lihat Detail Studi</span>', '<span>View Case Study</span>')

# Remove github icon-action-btn from project cards
h = re.sub(
    r'\s*<a href="https://github\.com/[^"]*" target="_blank" rel="noreferrer" class="icon-action-btn" title="Source Code">.*?</a>',
    '',
    h, flags=re.DOTALL
)

# ── 9. Replace entire Skills section with Certificates section
cert_section = '''    <!-- ======================================================================
         CERTIFICATES SECTION
         ====================================================================== -->
    <section id="keahlian" class="section">
      <div class="container">

        <div class="section-header reveal">
          <div class="section-tag">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="8" r="6"></circle>
              <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"></path>
            </svg>
            <span>Awards &amp; Certifications</span>
          </div>
          <h2 class="section-title">Certificates &amp; Credentials</h2>
          <p class="section-subtitle">
            A collection of professional certificates and credentials earned through dedicated study and training programs.
          </p>
        </div>

        <div class="certs-grid reveal">

          <!-- Certificate 1 -->
          <div class="glass-panel tilt-card cert-card reveal delay-1">
            <div class="cert-header">
              <div class="cert-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="8" r="6"></circle>
                  <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"></path>
                </svg>
              </div>
              <div>
                <div class="cert-label">Certificate 1</div>
                <div class="cert-issuer">Professional Certification</div>
              </div>
            </div>
            <div class="cert-embed-wrap">
              <embed src="master.encrypted.pdf" type="application/pdf" class="cert-embed">
            </div>
            <div class="cert-actions">
              <a href="master.encrypted.pdf" target="_blank" class="btn btn-glass magnetic cert-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                <span>View Full PDF</span>
              </a>
            </div>
          </div>

          <!-- Certificate 2 -->
          <div class="glass-panel tilt-card cert-card reveal delay-2">
            <div class="cert-header">
              <div class="cert-icon" style="color: var(--accent-secondary);">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="8" r="6"></circle>
                  <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"></path>
                </svg>
              </div>
              <div>
                <div class="cert-label">Certificate 2</div>
                <div class="cert-issuer">Professional Certification</div>
              </div>
            </div>
            <div class="cert-embed-wrap">
              <embed src="master.encrypted (1).pdf" type="application/pdf" class="cert-embed">
            </div>
            <div class="cert-actions">
              <a href="master.encrypted (1).pdf" target="_blank" class="btn btn-glass magnetic cert-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                <span>View Full PDF</span>
              </a>
            </div>
          </div>

          <!-- Certificate 3 -->
          <div class="glass-panel tilt-card cert-card reveal delay-3">
            <div class="cert-header">
              <div class="cert-icon" style="color: var(--accent-tertiary);">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="8" r="6"></circle>
                  <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"></path>
                </svg>
              </div>
              <div>
                <div class="cert-label">Certificate 3</div>
                <div class="cert-issuer">Professional Certification</div>
              </div>
            </div>
            <div class="cert-embed-wrap">
              <embed src="master.encrypted (2).pdf" type="application/pdf" class="cert-embed">
            </div>
            <div class="cert-actions">
              <a href="master.encrypted (2).pdf" target="_blank" class="btn btn-glass magnetic cert-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                <span>View Full PDF</span>
              </a>
            </div>
          </div>

          <!-- Certificate 4 -->
          <div class="glass-panel tilt-card cert-card reveal delay-1">
            <div class="cert-header">
              <div class="cert-icon" style="color: #10b981;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="8" r="6"></circle>
                  <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"></path>
                </svg>
              </div>
              <div>
                <div class="cert-label">Certificate 4</div>
                <div class="cert-issuer">Professional Certification</div>
              </div>
            </div>
            <div class="cert-embed-wrap">
              <embed src="master.encrypted (3).pdf" type="application/pdf" class="cert-embed">
            </div>
            <div class="cert-actions">
              <a href="master.encrypted (3).pdf" target="_blank" class="btn btn-glass magnetic cert-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                <span>View Full PDF</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
'''

h = re.sub(
    r'<!-- ={5,}\s*\n\s*SKILLS SECTION.*?</section>\s*\n',
    cert_section + '\n',
    h, flags=re.DOTALL
)

# ── 10. Experience section header → English
h = h.replace('<span>Perjalanan Karir &amp; Organisasi</span>', '<span>Career &amp; Organization Journey</span>')
h = h.replace('Rekam Jejak &amp; Pengalaman', 'Track Record &amp; Experience')
h = h.replace('Pengalaman dalam mengelola strategi media sosial, memimpin visual branding acara berskala besar, dan produksi konten digital.',
              'Experience managing social media strategy, leading large-scale event visual branding, and producing digital content.')

# ── 11. Contact section → Remove Telegram + GitHub, fix Instagram + LinkedIn
# Remove Telegram icon in contact-social-row
h = re.sub(
    r'\s*<!-- Telegram -->\s*\n\s*<a href="https://t\.me/[^"]*"[^>]*class="social-circle-lg magnetic"[^>]*>.*?</a>\s*\n',
    '\n',
    h, flags=re.DOTALL
)
# Remove GitHub icon in contact-social-row
h = re.sub(
    r'\s*<!-- GitHub -->\s*\n\s*<a href="https://github\.com/[^"]*"[^>]*class="social-circle-lg magnetic"[^>]*>.*?</a>\s*\n',
    '\n',
    h, flags=re.DOTALL
)
# Fix Instagram URL in contact-social-row
h = h.replace(
    'href="https://instagram.com" target="_blank" rel="noreferrer" class="social-circle-lg magnetic" title="Instagram"',
    'href="https://www.instagram.com/ma.alfaey/" target="_blank" rel="noreferrer" class="social-circle-lg magnetic" title="Instagram"'
)
# Fix LinkedIn URL in contact-social-row
h = h.replace(
    'href="https://www.linkedin.com/in/muhammad-ali-al-faqih-899a28424/" target="_blank" rel="noreferrer" class="social-circle-lg magnetic" title="LinkedIn Profile"',
    'href="https://www.linkedin.com/in/muhammadalialfaqih" target="_blank" rel="noreferrer" class="social-circle-lg magnetic" title="LinkedIn Profile"'
)

# Contact button text
h = h.replace('<span>Kirim Email</span>', '<span>Send Email</span>')
h = h.replace('<span>Salin Email</span>', '<span>Copy Email</span>')
h = h.replace('title="Salin Alamat Email"', 'title="Copy Email Address"')

# ── 12. Modal – remove GitHub button
h = re.sub(
    r'\s*<a href="#" target="_blank" rel="noreferrer" id="modalGithubLink"[^>]*>.*?</a>\s*',
    ' ',
    h, flags=re.DOTALL
)

# ── 13. Footer – remove GitHub + Telegram icons, fix Instagram, update copyright
h = re.sub(
    r'\s*<a href="https://github\.com/[^"]*"[^>]*class="social-circle-btn magnetic"[^>]*>.*?</a>\s*\n',
    '\n',
    h, flags=re.DOTALL
)
h = re.sub(
    r'\s*<a href="https://t\.me/[^"]*"[^>]*class="social-circle-btn magnetic"[^>]*>.*?</a>\s*\n',
    '\n',
    h, flags=re.DOTALL
)
# Fix Instagram URL in footer
h = h.replace(
    'href="https://instagram.com" target="_blank" rel="noreferrer" class="social-circle-btn magnetic" title="Instagram"',
    'href="https://www.instagram.com/ma.alfaey/" target="_blank" rel="noreferrer" class="social-circle-btn magnetic" title="Instagram"'
)
# Fix LinkedIn URL in footer
h = h.replace(
    'href="https://www.linkedin.com/in/muhammad-ali-al-faqih-899a28424/" target="_blank" rel="noreferrer" class="social-circle-btn magnetic" title="LinkedIn"',
    'href="https://www.linkedin.com/in/muhammadalialfaqih" target="_blank" rel="noreferrer" class="social-circle-btn magnetic" title="LinkedIn"'
)

# Update footer copyright text
h = h.replace(
    '&copy; 2026 <strong>Muhammad Ali Al Faqih</strong>. Didesain dengan Glassmorphism Realistis &amp; Micro-interactions.',
    '&copy; 2026 <strong>Muhammad Ali Al Faqih</strong>. Designed with Realistic Glassmorphism &amp; Micro-interactions.'
)

with open('d:/porto/index.html', 'w', encoding='utf-8') as f:
    f.write(h)

print('All changes applied successfully!')
