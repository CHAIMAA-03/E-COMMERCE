//TOTALE PREZZO
const btnPiu = document.querySelector('#btnPiu')
const btnMeno = document.querySelector('#btnMeno')
const nQnta = document.querySelector("#numero")

const prezzoBase = 149.00
let quantita = 1

btnPiu.addEventListener("click", function(){
    quantita++
    aggiornaQnta()
})

btnMeno.addEventListener("click", function(){
    if (quantita > 1) {        // ← blocca prima di arrivare a 0
        quantita--
        aggiornaQnta()
    }
})

function aggiornaQnta() {
    nQnta.textContent = quantita  //cambia il testo, e mette il numero che c'è nel contatore

    const totale = document.querySelector(".totale")

    if (quantita > 1){
        const prezzoTotale = (prezzoBase * quantita).toFixed(2)
        totale.textContent = "Totale: €" + prezzoTotale
    }
    else{
        totale.textContent = ""
    }
}


//RECENSIONI BOX
const btnUtile = document.querySelectorAll('.utile') 

btnUtile.forEach(function(bottone){    // → significa "per ogni bottone nella lista, fai questa cosa".
    bottone.addEventListener("click", function() {
        const messaggio = document.createElement("span")

        messaggio.innerHTML = '<img src="icone/verificato.png">Ti ringraziamo per la tua valutazione.'
        messaggio.style.color = "#539b71"
        messaggio.style.fontWeight = "800"
        messaggio.style.fontSize = "13px"
        messaggio.style.display = "flex"
        messaggio.style.alignItems = "center"

        bottone.replaceWith(messaggio)
    })
})

const righeLink = document.querySelectorAll('.barra-riga')
const cardsRecensioni = document.querySelectorAll('.box-rece')

const SottoBox = document.querySelector('.box-media')
const mostraTutte = document.createElement('p')

mostraTutte.innerHTML = 'Mostra tutte le recensioni'
mostraTutte.style.marginLeft = '12px'
mostraTutte.style.color = '#9a9894'
mostraTutte.style.textDecoration = 'underline'
mostraTutte.style.fontWeight = '600'
mostraTutte.style.cursor = 'pointer'
mostraTutte.style.display = 'none'

SottoBox.insertAdjacentElement("afterend", mostraTutte)

righeLink.forEach(function(riga){
    riga.addEventListener("click", function() {
        const filtro = riga.getAttribute("data-filtro")  // legge quante stelle hai cliccato

        cardsRecensioni.forEach(function(card){
            const filtroCard = card.getAttribute("data-stelle")
            if(filtroCard === filtro){
                card.style.display = "block"   // mostra la card da X stelle
            } else {
                card.style.display = "none"    // nasconde
            }
        })
        mostraTutte.style.display = 'block'
    }) 
})

mostraTutte.addEventListener("click", function(){
    cardsRecensioni.forEach(function(card){
        card.style.display = "block"
    })
    mostraTutte.style.display = 'none'   // ← si nasconde di nuovo
})



//CARRELLO STICKY - OBSERVER 
const btnOriginale = document.querySelector('.box-carrello')
const AggiungiSticky = document.querySelector('.aggiungi-sticky')
const footer = document.querySelector('footer')

window.addEventListener('scroll', function() {
    const posBtn = btnOriginale.getBoundingClientRect() //getBoundingClientRect() --> ti dice la posizione e le dimensioni di un elemento rispetto alla finestra visibile.
    const posFooter = footer.getBoundingClientRect()

    const pulsanteVisibile = posBtn.bottom > 0 && posBtn.top < window.innerHeight   //il bordo inferiore non è ancora uscito verso l'alto e il bordo superiore non è ancora uscito verso il basso. In altre parole — il pulsante è dentro lo schermo.
    const footerVisibile = posFooter.top < window.innerHeight   //il bordo superiore del footer è entrato nello schermo. 

    if (pulsanteVisibile || footerVisibile) {
        AggiungiSticky.classList.remove('visibile')
        toast.classList.remove('visibile')
    } else {
        AggiungiSticky.classList.add('visibile')
    }
})


//BOX COLORI
const boxColori = document.querySelectorAll('.colore-info')

boxColori.forEach(function(box) {
    box.addEventListener('click', function() {

        // 1. Togli la classe "attivo" da tutti i box
        boxColori.forEach(function(b) {
            b.classList.remove('attivo')
        })

        // 2. Aggiungi la classe "attivo" solo a quello cliccato
        box.classList.add('attivo')

        // 3. Leggi quale colore è stato scelto
        const coloreSelezionato = box.getAttribute('data-colore')

        // 4. Cambia le immagini nel carosello
        cambiaImmagini(coloreSelezionato)
    })
})

function cambiaImmagini(colore) {
    const immagini = {
        grigio: [
            'angolazioni_orologio/orologio.png',
            'angolazioni_orologio/chermo_notifiche.png',
            'angolazioni_orologio/retro.png',
            'angolazioni_orologio/side-view.png',
            'angolazioni_orologio/orologio_scatola.png',
            'angolazioni_orologio/person_running.png',
            'angolazioni_orologio/person_working.png'
        ],
        nero: [
            'angolaz_orol_black/orologio_nero.jpg',
            'angolaz_orol_black/schermo_notifiche_nero.jpg',
            'angolaz_orol_black/retro_nero.jpg',
            'angolaz_orol_black/side-view_nero.jpg',
            'angolaz_orol_black/orologio_scatola_nero.jpg',
            'angolaz_orol_black/person_running_nero.jpg',
            'angolaz_orol_black/person_working_nero.jpg'
        ],
        verde: [
            'angolaz_orol_verde/orologio_verde.jpg',
            'angolaz_orol_verde/chermo_notifiche_verde.jpg',
            'angolaz_orol_verde/retro_verde.jpg',
            'angolaz_orol_verde/side-view_verde.jpg',
            'angolaz_orol_verde/orologio_scatola_verde.png',
            'angolaz_orol_verde/person_running_verde.jpg',
            'angolaz_orol_verde/person_working_verde.jpg'
        ]
    }

    const slides = document.querySelectorAll('.carosello .slide')

    // Per ogni immagine, cambia il src con quello nuovo
    slides.forEach(function(slide, indice) {        //indice --> Quando forEach scorre la lista, tiene automaticamente il conto di a che punto è arrivato — 0, 1, 2, 3...
        slide.src = immagini[colore][indice]        // immagini[colore] — stai aprendo il cassetto giusto dell'oggetto. Se colore vale "nero", stai dicendo "dammi la lista del nero". Le parentesi quadre [ ] su un oggetto servono per accedere a un suo valore tramite il nome.
        // immagini[colore][indice] — dopo aver aperto il cassetto giusto, prendi l'elemento nella posizione indice di quell'array. 
    })

    // Torna sempre alla prima slide quando cambi colore
    document.querySelector('#s1').checked = true
}


//ZOOM
const zoomWrapper = document.querySelector('.zoom-wrapper')
const zoomRisultato = document.querySelector('.zoom-risultato')
const slidesZoom = document.querySelectorAll('.carosello .slide')


zoomWrapper.addEventListener('mousemove', function(e) {     //Ogni volta che il mouse si sposta anche di un solo pixel dentro zoomWrapper, il browser esegue la funzione.
    let imgAttuale = null   //variabile vuota
    slidesZoom.forEach(function(slide) {
        if (getComputedStyle(slide).opacity === '1') {
            imgAttuale = slide  //se la condizione è vera, salva quell'immagine nella variabile.
        }
    })
    if (!imgAttuale) return

    const rect = zoomWrapper.getBoundingClientRect()    //questo metodo ti dice la posizione e le dimensioni di un elemento sullo schermo. Restituisce un oggetto con proprietà tipo top, left, width, height.
    const x = e.clientX - rect.left   // la posizione X del mouse rispetto all'intero schermo (da sinistra).
    const y = e.clientY - rect.top    // la posizione Y del mouse rispetto all'intero schermo (dall'alto).
    //e.clientX - rect.left → se il carosello inizia a 200px e il mouse è a 250px dallo schermo, il mouse è a 50px dal bordo sinistro del carosello.

    // Convertire in precenuali (un valore tra 0 e 1)
    const percX = (x / rect.width) * 100
    const percY = (y / rect.height) * 100
    
    const zoom = 4      // 3 significa che l'immagine sarà 3 volte più grande nel riquadro risultato.

    zoomRisultato.style.display = 'block'
    zoomRisultato.style.backgroundImage = 'url(' + imgAttuale.src + ')'
    zoomRisultato.style.backgroundSize = (zoom * 100) + '%'     //l'immagine di sfondo è 3 volte più grande del riquadro. Questo crea l'effetto ingrandimento.
    zoomRisultato.style.backgroundPosition = percX + '% ' + percY + '%'     //sposta l'immagine ingrandita in modo che la zona mostrata corrisponda esattamente a dove hai il mouse. 
})

zoomWrapper.addEventListener('mouseleave', function() {
    zoomRisultato.style.display = 'none'
})



//OFFERTA A TEMPO
const scadenza = new Date('2026-04-30T23:59:59')

function aggiornaCountdown() {
    const adesso = new Date()
    const differenza = scadenza - adesso

    if (differenza <= 0) {
        document.getElementById('countdown').textContent = 'Offerta scaduta'
        return
    }

    const giorni = Math.floor(differenza / (1000 * 60 * 60 * 24))
    const ore = Math.floor((differenza % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minuti = Math.floor((differenza % (1000 * 60 * 60)) / (1000 * 60))
    const secondi = Math.floor((differenza % (1000 * 60)) / 1000)

    document.getElementById('countdown').innerHTML =
        '<span>' + giorni + 'g</span>' +
        '<span>' + ore + 'h</span>' +
        '<span>' + minuti + 'm</span>' +
        '<span>' + secondi + 's</span>'
}

aggiornaCountdown()
setInterval(aggiornaCountdown, 1000)    //chiama la funzione ogni 1000 millisecondi — ogni secondo. Il timer scorre in tempo reale.


//NOTIFICA TOAST
const toast = document.getElementById('toast')

function mostraToast() {
    toast.classList.add('visibile')

    setTimeout(function() {
        toast.classList.remove('visibile')
    }, 3000)
}

document.querySelector('.box-carrello').addEventListener('click', function() {
    toast.style.bottom = '15px'
    mostraToast()
})

document.querySelector('.aggiungi-btn').addEventListener('click', function() {
    toast.style.bottom = '100px'
    mostraToast()
})