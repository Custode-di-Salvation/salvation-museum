---
layout: "base.njk"
title: "Home"
isHome: true
---

<div class="hero-slider-container">
  <div class="hero-slider" id="heroSlider">
    <div class="hero-slide active" style="background-image: url('https://i.imgur.com/CF8DdyK.jpeg')"></div>
    <div class="hero-slide" style="background-image: url('https://i.imgur.com/w4XQ6WZ.jpeg')"></div>
    <div class="hero-slide" style="background-image: url('https://i.imgur.com/IO32F7f.jpeg')"></div>
    <div class="hero-slide" style="background-image: url('https://i.imgur.com/LyNExZH.png')"></div>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <div class="hero-eyebrow">
        SALVATION GRANGE HALL &middot; EST. 1908
      </div>
      <h1 class="hero-title">Il Salvation<br>Museum of<br>History &<br>Natural Sciences</h1>
      <p class="hero-sub">Custode della memoria storica e naturale della città e della valle.</p>
    </div>
  </div>
</div>

<main class="main-content">

Il **Salvation Museum of History & Natural Sciences** è il custode ufficiale della memoria storica e naturale della città e della valle del Blackwater. Dalle nostre origini come collezione privata di un naturalista locale, siamo orgogliosi di aprire le porte della nostra nuova e rinnovata sede sulla Main Street.

Ospitato nello storico edificio della *Salvation Grange Hall* (est. 1908), il museo offre un percorso espositivo che attraversa la geologia, la fauna, la storia dei primi coloni, l'industria mineraria e il folklore appalachiano, fino ad arrivare alla nostra contemporaneità. 

> *"La montagna conserva ciò che dimentica, e dimentica ciò che conserva."*

## Le nostre aree

<div class="area-grid">
  <a class="area-card" href="/visit/">
    <div class="ico"><i class="fa-solid fa-clock"></i></div>
    <h4>Organizza la tua visita</h4>
    <p>Scopri gli orari, The Grange Kitchen e il bookshop.</p>
    <span class="go">Vai alla pagina &rarr;</span>
  </a>

  <a class="area-card" href="/exhibits/">
    <div class="ico"><i class="fa-solid fa-map-location-dot"></i></div>
    <h4>Esplora le sale</h4>
    <p>Dalla storia naturale al folklore, fino al giardino botanico.</p>
    <span class="go">Vai alla pagina &rarr;</span>
  </a>

  <a class="area-card" href="/archives/">
    <div class="ico"><i class="fa-solid fa-box-archive"></i></div>
    <h4>Consultazione archivio</h4>
    <p>Regolamento e accesso per studiosi all'archivio storico.</p>
    <span class="go">Vai alla pagina &rarr;</span>
  </a>
</div>

<p><em><i class="fa-solid fa-bullhorn" style="margin-right: 6px; color: var(--brick);"></i> Siamo felici di annunciare il completamento dei lavori di ampliamento (estate 2026). La nuova struttura include un ascensore per l'accesso ai piani superiori e un giardino botanico raddoppiato in estensione.</em></p>

</main>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    if (slides.length > 0) {
      setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
      }, 5000); // Scorre ogni 5 secondi
    }
  });
</script>
