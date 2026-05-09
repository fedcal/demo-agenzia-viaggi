# Customization

## Cambiare i dati mock

Edita i file in `src/assets/mock/`. Vedi [Mock Data](/mock-data).

## Cambiare i colori

I design tokens sono in `src/styles.css`:

```css
:root {
  --color-accent: #0969da;        /* Cambia qui per il colore primario */
  --color-bg-default: #ffffff;
  --color-fg-default: #1f2328;
  /* ... */
}
```

## Cambiare il logo

Sostituisci `public/favicon.ico` e aggiungi il logo SVG in `public/logo.svg`.

## Aggiungere route

1. Crea il componente in `src/app/pages/{nome}/`
2. Aggiungi la route in `src/app/app.routes.ts`:

```typescript
{
  path: 'servizi',
  loadComponent: () => import('./pages/servizi/servizi.component').then((m) => m.ServiziComponent),
  title: 'Servizi — Agenzia Viaggi'
}
```

## Cambiare i metadati SEO

Edita `src/index.html` per:
- `<title>` globale
- `<meta name="description">`
- Open Graph

Per metadati per-route usa `Title` e `Meta` di `@angular/platform-browser`.

## Disabilitare il prerender

In `angular.json`:

```json
"prerender": false
```

In questo caso il sito gira solo in modalità SSR runtime (più lento al cold start, più dinamico).

## Possibili Sviluppi Personalizzabili

Estendere il template agenzia con feature specializzate:

- **AI Personalized Tour Recommendation RediSearch**: visa intelligence MAECI, weather forecasting, group matching (150h)
- **Dynamic Pricing + Demand Forecasting LightGBM**: weekly retraining, elasticity pricing, last-minute flash sale (140h)
- **GDS Integration Amadeus/Sabre**: NDC API, Booking.com/Viator/GetYourGuide aggregation, multi-leg routing (220h)
- **Visa + Travel Requirements AI**: MAECI scraper, vaccination tracking, travel insurance recommendation (100h)
- **Group Booking Collaboration + Split Payment**: WebSocket real-time, Stripe Connect, rooming automation (180h)
- **Travel Day-of Mobile Offline PWA**: MapBox offline maps, Whisper speech-to-text, grammY WhatsApp bot (210h)
- **Currency exchange live**: real-time rate, ATM availability per destination, credit card acceptance map (50h)
- **Flight price alert**: imposta prezzo target, notification se scende, email daily deal destination (70h)
- **Traveler community forum**: destination discussion, tips sharing, photo gallery post-trip (90h)
- **Travel insurance integration**: Generali/AXA quote aggregation, one-click add to booking (110h)
- **Language translation offline**: integra Whisper gguf per audio, add text translator locale (80h)
- **Partner hotel network**: white-label booking per hotel partners, commission tracking, loyalty point sync (150h)

Vedi [Tier & Funzionalità](/tier-features) per architettura completa moduli avanzati.

## White-label per cliente

1. Fork del repo o copia in nuova cartella
2. Sostituisci `agenzia-viaggi` con nome cliente (`acme-pizzeria`)
3. Sostituisci footer rimuovendo riferimento a Federico (modifica `footer.component.ts`)
4. Personalizza `vercel.json` con domain custom cliente
5. Deploy su Vercel cliente con loro account
