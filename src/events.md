---
layout: "base.njk"
title: "Eventi e auditorium"
---

L'auditorium del museo, ricavato nell'ala nord del primo piano (nella ex sala assembleare secondaria della Grange Hall), è uno spazio flessibile con pavimento in legno originale e travi a vista. 

Dispone di circa **quaranta posti a sedere**, impianto di proiezione e audio essenziale (microfoni radio, mixer), ed è pensato per ospitare il programma culturale della città.


## Programmazione regolare

* **Conferenze e seminari:** interventi tematici tenuti dal curatore del museo o da studiosi in visita. Alcuni docenti della *Ashmoth University* tengono qui seminari serali (con prenotazione consigliata).
* **Presentazioni di libri:** incontri con autori locali e regionali per nuove uscite su storia, folklore e natura degli Appalachi.
* **Proiezioni:** documentari sulla storia del West Virginia, sull'industria mineraria e sull'ecologia del canyon del Blackwater.
* **Visite guidate tematiche:** spesso concentrate nella sala del folklore o sulla botanica locale.

<div class="alert-box">
  <h3>Iscrizione eventi</h3>
  <p>L'ingresso agli eventi del museo è quasi sempre <strong>gratuito</strong>. Data la capienza limitata della sala (40 posti), consigliamo vivamente la prenotazione anticipata. Puoi registrarti recandoti presso la biglietteria nel vestibolo del piano terra.</p>
</div>

### I prossimi appuntamenti

<div id="dynamic-calendar" class="calendar-list">
  <p><em>Caricamento calendario in corso...</em></p>
</div>

<script>
  // Array of lore-friendly events
  const allEvents = [
    { title: "I misteri del Cauldron Lake: geologia e miti", desc: "Conferenza speciale a cura del Dr. Aris Thorne dell'Ashmoth University. Un'analisi delle formazioni carsiche che hanno originato il lago.", tag: "Conferenza" },
    { title: "Granny magic e rimedi tradizionali", desc: "Workshop pratico nella radura botanica. Scopri l'uso erboristico storico di consolida e menta di montagna.", tag: "Workshop" },
    { title: "Proiezione: voci dalle miniere", desc: "Documentario inedito sul crollo della Widow's Peak, arricchito da interviste ai discendenti dei minatori.", tag: "Proiezione" },
    { title: "Letture nel bosco", desc: "Attività per bambini nel Giardino Botanico, con le storielle tradizionali della volpe e del corvo.", tag: "Famiglie" },
    { title: "I canti del Senza-Volto", desc: "Concerto acustico di dulcimer e banjo. Un viaggio nella musica folk appalachiana dell'Ottocento.", tag: "Musica" },
    { title: "Gli animali della notte", desc: "Incontro sulla fauna notturna appalachiana: dai gufi alle tracce della lince rossa.", tag: "Natura" },
    { title: "Archivio aperto: i diari Sterling", desc: "Il curatore svela documenti inediti scritti dai Figli del Perdono durante la fondazione di Salvation.", tag: "Storia" },
    { title: "La Festa del Cervo: origini", desc: "Seminario storico sulle antiche maschere in pino esposte al museo e il loro significato allegorico.", tag: "Folklore" }
  ];

  function generateCalendar() {
    // Pick 4 random events
    const shuffled = allEvents.sort(() => 0.5 - Math.random());
    const selectedEvents = shuffled.slice(0, 4);
    
    // Sort them so the dates will align sequentially
    // (We will just generate incremental dates from today)
    const container = document.getElementById("dynamic-calendar");
    container.innerHTML = ""; // Clear loading text
    
    let currentDate = new Date();
    
    selectedEvents.forEach((ev, index) => {
      // Add between 1 to 5 days sequentially to space them out
      const daysToAdd = Math.floor(Math.random() * 4) + 1 + (index * 3);
      currentDate.setDate(currentDate.getDate() + daysToAdd);
      
      const day = currentDate.getDate();
      const monthNames = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
      const month = monthNames[currentDate.getMonth()];
      
      const eventHTML = `
        <div class="event-item">
          <div class="event-date">
            <span class="d-day">${day}</span>
            <span class="d-month">${month}</span>
          </div>
          <div class="event-body">
            <h4 class="event-title">${ev.title} <span class="event-tag">${ev.tag}</span></h4>
            <p class="event-desc">${ev.desc}</p>
          </div>
        </div>
      `;
      container.innerHTML += eventHTML;
    });
  }
  
  // Run on page load
  document.addEventListener("DOMContentLoaded", generateCalendar);
</script>
