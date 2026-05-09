# Tier e Funzionalità — Agenzia Viaggi Boutique

> Catalogo completo delle feature per ogni livello di implementazione

## Tier Base — Fondamenta Digitali (€500 | 200h)

### Core Travel E-commerce
- **Destinazioni showcase**: 100+ mete con foto hero, descrizione, climate info, best season
- **Pacchetti tour curati**: 7-14 giorni itinerari (Europa, Asia, Africa), durata, fascia prezzo €1500-€8000
- **Booking calendar**: availability per group size, date blocking, early booking discount
- **Detailed itinerary**: day-by-day breakdown, highlight locations, meal inclusions, accommodation type
- **Traveler form**: numero persone, preferenze (budget, pace, dietary), special interests (hiking/culture/luxury)
- **Payment Stripe**: deposit (30%), final payment 60gg prima partenza, payment plan option

### Esperienza SEO & Marketing
- **Schema.org Trip**: destination, startDate, endDate, itinerary day-by-day, price
- **Google Business Profile**: mappa negozio, foto destination, booking link, reviews
- **Blog travel**: "guida Bali 2026", "come prepararsi viaggio Asia", "miglior periodo visitare Norvegia"
- **Destination guide**: cosa portare, budget stimato, fuso orario, vaccini richiesti
- **GA4 ecommerce**: view_item (pacchetto), booking submission, conversion rate per destinazione

### Infrastruttura Tecnica
- **SSR + Prerender**: TTFB <500ms, TTFP <1.5s
- **SSL/TLS**: certificato EV per e-commerce payment + normativa privacy dati sensibili
- **CDN Cloudflare**: caching foto destinazione, video preview location
- **Database PostgreSQL**: pacchetti, booking, traveler profiles

---

## Tier Intermedio — Multi-Supplier Orchestration (€2.000 | 500h)

Includes tutte feature Base, più:

### Omnichannel Booking
- **POS Cassa in Cloud**: traccia costi per supplier (hotel, flight, local guide), margin tracking
- **E-fattura SDI v1.9.1**: generazione XML automatica, conservazione contratti tour
- **Multi-currency Stripe**: EUR/USD/GBP, live exchange rate, dynamic pricing per mercato
- **Email automazione Resend**: confirmation booking, itinerary PDF, day-of reminders, post-trip survey
- **WhatsApp Business**: group chat per tour group, day-before briefing, emergency contact

### Supplier Integration
- **Booking.com API**: hotel availability real-time, pricing, cancellation policy
- **Viator/GetYourGuide**: local experiences, activities booking, guide coordination
- **Flight aggregator**: Skyscanner/Amadeus integration (dove possibile), price alert
- **Local guides network**: contractor management, review rating, specialization (birdwatching/food/history)

### Content & Community
- **Video destination 4K**: Vimeo hero video per meta, drone footage, traveler testimonials
- **Instagram feed embed**: travel inspiration, #destination hashtag aggregation, UGC content
- **Blog itinerary**: day-by-day detailed guide, photo gallery, traveler stories, tips local
- **Newsletter**: destination spotlight, early booking alerts, seasonal special offers
- **Reviews & testimonials**: Trustpilot integration, video testimonial past travelers

---

## Tier Avanzato — AI & Personalization (€5.500 | 820h)

Includes tutte feature Intermedio + 6 AI modules:

### 1. AI Personalized Tour Recommendation (150h)
- **RediSearch HNSW 384-dim**: embedding 500 tours (destination, season, intensity, cultural focus, budget, duration)
- **qwen2.5 RAG reasoning**: dialogo cliente "voglio relax mare, 10 giorni, €3500, con famiglia" → ranked tours con spiegazione ("Isole Greche perfetto per snorkeling + famiglia, pasti inclusi, ritmo lento")
- **Visa intelligence**: integrazione dati MAECI schengen requirements, raccomandazione tour no-visa-required paesi per nazionalità
- **Weather forecasting**: periodo consigliato base clima storico, rainfall pattern, hurricane season alerts
- **Group matching**: raggruppa traveler simili stessi target tour, split cost transportation
- **Customization AI**: modify itinerary base preferenze (add kayak adventure, remove nightlife, swap hotel luxury)

### 2. Dynamic Pricing + Demand Forecasting (140h)
- **LightGBM ML weekly retraining**: storico prenotazioni 3 anni + booking.com demand indexes → predizione prezzo per settimana
- **Seasonal elasticity**: luglio+agosto picco estate, dicembre natale, pasqua spike, saldi gennaio-febbraio
- **Early-bird discount dynamic**: "prenotaz almeno 60gg prima" = sconto 12%, meno 30gg = sconto 5%
- **Last-minute flash sale**: se booking <20% capacity 2 settimane prima, sconto aggressivo 35-40% per fill group
- **Group size pricing**: per 6+ persone, sconto per taglia gruppo, bulk hotel rate negotiation
- **Competitor price monitoring**: check Evaneos, iGrandiViaggi pricing similar tours → adjust automaticamente

### 3. GDS Integration Amadeus/Sabre (220h)
- **Amadeus NDC/API**: hotel availability real-time, flight inventory, ancillary fees (baggage, seat)
- **Sabre marketplace**: alternative hotel supplier, package flight + hotel bundled pricing
- **Booking.com/Viator/GetYourGuide**: activity search, local guide availability, instant booking confirmation
- **Cancellation policy aggregation**: compare free cancel vs non-refundable per hotel
- **Multi-leg flight optimization**: routing per economia (es. Roma-Francoforte-Bangkok miglior prezzo)
- **Fallback strategy**: se GDS indisponibile, usa cached pricing + notification traveler price change post-confirmation
- **Itinerary API**: genera PDF itinerary automatico con flight time, hotel address, check-in instruction

### 4. Visa + Travel Requirements AI (100h)
- **MAECI/government API scraper**: visa requirements per nazionalità, processing time, costo
- **Vaccination tracking**: yellow fever, malaria, Japanese encephalitis required → link clinic prenotazione
- **Travel insurance recommendation**: qwen2.5 suggest cover type (standard/medical/adventure), premium estimation
- **Currency exchange info**: live rate for destination currency, ATM availability, credit card acceptance
- **Travel advisory alerts**: government travel warning per destination (security, health), automatic notification
- **Document checklist**: passport validity (6 mesi minimo), visas, return ticket proof, travel insurance document

### 5. Group Booking Collaboration + Split Payment (180h)
- **Stripe Connect**: ogni participant paga sua quota, aggregazione pagamenti, split settlement per partner families
- **WebSocket real-time collaboration**: friends creano group booking, discussion channel, vote su itinerary option (beach vs mountain day)
- **Rooming automation**: questionnaire "preferisco roommate?" → smart matching gender, smoking preference, activity level
- **Cost-sharing calculator**: divide hotel+transportation+meals fra group members, per-person tracking
- **Payment tracking**: chi ha pagato, chi deve ancora, reminder notification
- **Cancellation handling**: se person cancella, re-split costs tra remaining, possibility replace da waitlist

### 6. Travel Day-of Mobile Offline PWA (210h)
- **MapBox Offline maps**: download mappa destinazione, navigazione GPS senza dati (offline-first)
- **Whisper speech-to-text gguf**: microfono → riconoscimento voce locale offline, traduzione lingua desiderata (italiano → spagnolo local)
- **grammY WhatsApp bot**: guide risponde domande via WhatsApp ("quando è check-in?", "dove mangiamo stasera?")
- **Travel day itinerary**: timeline push notification (ore 08:00 breakfast, ore 14:00 pickup tour guide)
- **Expense splitting tracker**: scansiona ricevute meal/transport → auto-split gruppo, reimbursement settlement finale
- **Emergency contacts**: stored locally, SOS hotline connection, consulate info destination
- **Photo backup**: se WiFi disponibile, auto-backup foto traveler group, cloud sync evening
- **Offline currency converter**: display locals pricing vs home currency, calculation senza internet

---

## Stack Tecnologico per Tier Avanzato

| Layer | Tecnologia |
|-------|-----------|
| **Frontend** | Angular 21 SSR + PWA offline + MapBox Offline + Signals + Transloco i18n |
| **Backend** | Spring Boot 3.4 Clean Arch + Stripe Connect + Amadeus API + MAECI scraper |
| **ML/AI** | Ollama (qwen2.5:14b, llama3.1:8b) + RediSearch HNSW + LightGBM weekly retraining |
| **Mobile** | grammY WhatsApp bot, Whisper local speech-to-text gguf |
| **Data** | PostgreSQL 16 + Redis Stack 7 |
| **DevOps** | Hetzner CCX23 + Nginx + Cloudflare CDN + Let's Encrypt |
| **External** | Amadeus/Sabre GDS, Booking.com/Viator API, MapBox, MAECI/government APIs |

---

## Roadmap Consigliata

1. **Week 1-2**: Base (destinazioni, pacchetti, Stripe booking)
2. **Week 3-6**: Intermedio (Booking.com API, email automazione, blog content)
3. **Week 7-10**: GDS Amadeus/Sabre integration, flight orchestration
4. **Week 11-15**: AI tour recommendation + visa requirements AI
5. **Week 16-20**: Dynamic pricing LightGBM + demand forecasting
6. **Week 21-25**: Group booking WebSocket + split payment Stripe Connect
7. **Week 26-31**: Travel day-of PWA + offline maps + WhatsApp bot
8. **Week 32+**: Continuous optimization + partnership expansion

**Post-build**: €5.500-6.500 implementazione, €1.200/mese hosting + AI + GDS fee + Stripe 2.9% commission.

---

## Metriche Travel Agenzia

- **Base**: booking conversion 12%, average spend €3500, group size 2.4 persone
- **Intermedio**: supplier cost optimization -8% margin improvement, email engagement 28%, repeat booking 22% clienti
- **Avanzato**: AI tour recommendation adoption 35%, dynamic pricing revenue +18%, group booking feature 41% adoption, split payment functionality 28% usage, day-of PWA downloads 65%, traveler satisfaction 4.7/5, insurance add-on rate 52%, visa+travel requirement completion 89%
