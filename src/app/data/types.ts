// Tipi TypeScript per i dati mock dell'agenzia viaggi

export interface Indirizzo {
  via: string;
  citta: string;
  provincia: string;
  cap: string;
  regione: string;
  paese: string;
  lat: number;
  lng: number;
}

export interface Contatti {
  telefono: string;
  whatsapp: string;
  email: string;
  social: {
    instagram?: string;
    facebook?: string;
  };
}

export interface OrariApertura {
  lunedi: string;
  martedi: string;
  mercoledi: string;
  giovedi: string;
  venerdi: string;
  sabato: string;
  domenica: string;
}

export interface MetaSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface InfoAttivita {
  ragioneSociale: string;
  nomeCommerciale: string;
  tagline: string;
  associazione: string;
  fondazione: number;
  indirizzo: Indirizzo;
  contatti: Contatti;
  orari: OrariApertura;
  metaSeo: MetaSeo;
}

export type AreaGeografica =
  | 'asia'
  | 'africa'
  | 'america-latina'
  | 'europa'
  | 'oceania';

export interface Destinazione {
  id: string;
  nome: string;
  paese: string;
  area: AreaGeografica;
  tagline: string;
  descrizione: string;
  prezzoBase: number;
  prezzoMax: number;
  durataMinimaGiorni: number;
  durataConsigliataMesi: string;
  highlights: string[];
  stagioneMigliore: string;
  difficolta: 'facile' | 'media' | 'avventurosa';
  featured: boolean;
}

export type TierPacchetto = 'discovery' | 'premium' | 'custom';

export interface Pacchetto {
  id: string;
  tier: TierPacchetto;
  nome: string;
  descrizione: string;
  prezzoMin: number;
  prezzoMax: number | null;
  includeServizi: string[];
  nonInclude: string[];
  ideal: string;
}

export interface Membro {
  id: number;
  nome: string;
  ruolo: string;
  bio: string;
  areaSpecializzazione: string;
  anniEsperienza: number;
  lingue: string[];
  destinazioniPreferite: string[];
}

export interface Team {
  team: Membro[];
}

export interface FaqItem {
  domanda: string;
  risposta: string;
}

export interface Faq {
  faq: FaqItem[];
}
