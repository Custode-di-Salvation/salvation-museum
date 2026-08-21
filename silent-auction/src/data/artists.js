// Per aggiungere un nuovo artista o una nuova opera basta aggiungere un oggetto
// qui sotto: nessuna modifica alla logica dell'app è necessaria.
//
// Ogni opera ha bisogno di un `id` univoco (usato come chiave in Firebase per
// le offerte), del resto dei metadati e di una `basePrice` in dollari.

export const artists = [
  {
    id: 'silva-mendoza',
    name: 'I. Silva Mendoza',
    location: 'Madrid / Los Angeles',
    bio: `Isabel Silva Mendoza lavora sul corpo e sulla luce come violenza, sul corpo come superficie che ascolta il tempo: le sue nature morte decadono, le sue figure restano di spalle, i suoi santi non hanno volto. Esposta ad ARCOmadrid e Frieze Los Angeles, con opere in collezione permanente al Museum of Latin American Art di Long Beach, porta a Quel che la montagna conserva tre lavori che guardano gli Appalachi come li guarderebbe uno straniero che li sente, nonostante tutto, familiari.`,
    tagline: 'Tre tele. Neobarocco figurativo, olio su tela.',
    works: [
      {
        id: 'silva-mendoza-vara-de-oro',
        title: 'Vara de oro',
        year: 2026,
        technique: 'Olio su tela',
        dimensions: '60 × 45 cm',
        basePrice: 1800,
        image: 'https://i.imgur.com/AOm6hrB.jpeg',
      },
      {
        id: 'silva-mendoza-la-reina-del-valle',
        title: 'La reina del valle',
        year: 2024,
        technique: 'Olio su tela',
        dimensions: '80 × 60 cm',
        basePrice: 3200,
        image: 'https://i.imgur.com/6iyscdJ.jpeg',
      },
      {
        id: 'silva-mendoza-estudio-santo-rey',
        title: 'Estudio para un santo rey',
        year: 2023,
        technique: 'Olio su tela',
        dimensions: '100 × 70 cm',
        basePrice: 4500,
        image: 'https://i.imgur.com/wOpVQMf.jpeg',
      },
    ],
  },
  {
    id: 'rose-hill',
    name: 'R. Rose Hill',
    location: 'Maine / Chicago',
    bio: `Formata alla School of the Art Institute of Chicago (BFA in Painting, 2017), lavora oggi anche come consulente d'arte. L'artista dipinge corpi resi con precisione anatomica ossessiva e volti che non arrivano mai: al loro posto, superfici di gesso sollevato, croste, materia che si sfalda. La sua pittura ruota attorno al terrore dell'anonimato e all'empatia del dolore. Toglie il nome, toglie il viso, e lascia solo ciò che il tempo non ha ancora portato via. Porta all'asta tre opere tra le più recenti della sua galleria.`,
    tagline: 'Gli incubi. Figurazione tenebrista, olio su tavola e su tela.',
    works: [
      {
        id: 'rose-hill-nightmare-xxix',
        title: 'Nightmare XXIX',
        year: 2024,
        technique: 'Olio su tavola',
        dimensions: '60 × 60 cm',
        basePrice: 2000,
        image: 'https://i.imgur.com/dnqT3hU.jpeg',
      },
      {
        id: 'rose-hill-nightmare-xliii',
        title: 'Nightmare XLIII',
        year: 2026,
        technique: 'Olio su tavola',
        dimensions: '90 × 90 cm',
        basePrice: 3200,
        image: 'https://i.imgur.com/1C1YKHL.png',
      },
      {
        id: 'rose-hill-nightmare-lxxi',
        title: 'Nightmare LXXI',
        year: 2026,
        technique: 'Olio su tela',
        dimensions: '100 × 100 cm',
        basePrice: 4000,
        image: 'https://i.imgur.com/H6zb72Y.jpeg',
      },
    ],
  },
  {
    id: 'anonimo',
    name: 'Artista anonimo',
    location: 'Provenienza ignota',
    bio: `Opere pervenute al museo tramite donazione anonima in occasione dell'inaugurazione. Il ricavato dell'eventuale vendita sarà devoluto interamente al fondo per i futuri ampliamenti del museo.`,
    tagline: 'Tre tele. Olio su tela e su tavola.',
    works: [
      {
        id: 'anonimo-fallen-crow',
        title: 'The Fallen Crow',
        // Anno non indicato: provenienza ignota.
        technique: 'Olio su tela',
        dimensions: '50 × 40 cm',
        basePrice: 400,
        image: 'https://i.imgur.com/vvElQLw.jpeg',
      },
      {
        id: 'anonimo-four-crows',
        title: 'The Four Crows',
        technique: 'Olio su tela',
        dimensions: '80 × 60 cm',
        basePrice: 600,
        image: 'https://i.imgur.com/0q3kwBE.jpeg',
      },
      {
        id: 'anonimo-martyrdom-of-the-crow',
        title: 'The Martyrdom of the Crow',
        technique: 'Olio su tela',
        dimensions: '100 × 70 cm',
        basePrice: 800,
        image: 'https://i.imgur.com/AMgYpkI.jpeg',
      },
    ],
  },
];

// Data/ora di chiusura automatica dell'asta (fuso orario locale del browser).
export const AUCTION_CLOSE_DATE = new Date('2026-09-20T23:59:59');
