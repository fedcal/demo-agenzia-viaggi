import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="hero">
      <div class="demo-container">
        <h1>Viaggi su misura per esploratori curiosi</h1>
        <p class="hero-tagline">Atlante Viaggi Boutique — Bologna. Travel designer specializzati per ogni area del mondo.</p>
        <div class="hero-actions">
          <a routerLink="/destinazioni" class="btn btn-primary">Esplora le destinazioni</a>
          <a routerLink="/contatti" class="btn btn-secondary">Richiedi un preventivo</a>
        </div>
      </div>
    </section>

    <section class="features demo-container">
      <h2>Perché scegliere Atlante Viaggi</h2>
      <ul class="feature-grid">
        <li>
          <span class="feature-icon" aria-hidden="true">🗺️</span>
          <h3>Itinerari su misura</h3>
          <p>Ogni viaggio viene progettato ascoltando i tuoi desideri, non dai cataloghi standard.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🌍</span>
          <h3>4 specialisti d'area</h3>
          <p>Asia, Africa, Americhe ed Europa: ogni travel designer conosce la propria area in profondità.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🛡️</span>
          <h3>Assicurazione inclusa</h3>
          <p>Partite sereni: assicurazione medico-bagaglio inclusa in tutti i pacchetti.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">📱</span>
          <h3>Supporto 7/7 in viaggio</h3>
          <p>Un numero WhatsApp diretto attivo per tutta la durata del tuo viaggio.</p>
        </li>
      </ul>
    </section>

    <section class="featured demo-container" *ngIf="featuredDestinazioni$ | async as destinazioni">
      <div class="section-header">
        <h2>Destinazioni in evidenza</h2>
        <a routerLink="/destinazioni" class="link-more">Tutte le destinazioni →</a>
      </div>
      <ul class="dest-grid">
        <li *ngFor="let d of destinazioni" class="dest-card">
          <div class="dest-card__area">{{ areaLabel(d.area) }}</div>
          <h3 class="dest-card__nome">{{ d.nome }}</h3>
          <p class="dest-card__tagline">{{ d.tagline }}</p>
          <div class="dest-card__footer">
            <span class="dest-card__price">Da {{ d.prezzoBase | currency:'EUR':'symbol':'1.0-0' }}</span>
            <span class="dest-card__days">{{ d.durataMinimaGiorni }}+ giorni</span>
          </div>
        </li>
      </ul>
    </section>

    <section class="pacchetti-band demo-container" *ngIf="pacchetti$ | async as p">
      <h2>I nostri pacchetti</h2>
      <ul class="pacchetti-grid">
        <li *ngFor="let pkg of p.pacchetti" class="pkg-card" [class.pkg-card--featured]="pkg.tier === 'premium'">
          <div class="pkg-card__tier" [attr.data-tier]="pkg.tier">{{ pkg.nome }}</div>
          <p class="pkg-card__desc">{{ pkg.descrizione }}</p>
          <p class="pkg-card__price">
            <span *ngIf="pkg.prezzoMax; else openPrice">
              {{ pkg.prezzoMin | currency:'EUR':'symbol':'1.0-0' }} – {{ pkg.prezzoMax | currency:'EUR':'symbol':'1.0-0' }}
            </span>
            <ng-template #openPrice>da {{ pkg.prezzoMin | currency:'EUR':'symbol':'1.0-0' }}</ng-template>
          </p>
          <p class="pkg-card__ideal"><em>Ideale per:</em> {{ pkg.ideal }}</p>
          <a routerLink="/viaggi-firma" class="btn btn-accent">Scopri di più</a>
        </li>
      </ul>
    </section>

    <section class="cta-band">
      <div class="demo-container">
        <h2>Il tuo prossimo viaggio inizia da una conversazione</h2>
        <p>Raccontaci dove vuoi andare. Il nostro travel designer ti risponde entro 24 ore con una proposta personalizzata.</p>
        <a routerLink="/contatti" class="btn btn-primary">Inizia a pianificare</a>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: 5rem 1rem;
        text-align: center;
        background: linear-gradient(180deg, #ecfeff 0%, #ffffff 100%);
        border-bottom: 1px solid var(--color-border);
      }
      .hero h1 {
        font-size: clamp(2rem, 5vw, 3.5rem);
        margin: 0 0 1rem;
        color: var(--color-fg-default);
      }
      .hero-tagline {
        font-size: 1.15rem;
        color: var(--color-fg-muted);
        margin: 0 0 2rem;
      }
      .hero-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: #0c6b82;
        text-decoration: none;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
        text-decoration: none;
      }
      .btn-accent {
        background: var(--color-accent);
        color: #ffffff;
        font-size: 0.9rem;
        padding: 0.5rem 1rem;
      }
      .btn-accent:hover {
        background: #0c6b82;
        text-decoration: none;
      }
      .features {
        padding: 4rem 1rem;
      }
      .features h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .feature-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .feature-grid li {
        text-align: center;
      }
      .feature-icon {
        font-size: 2.5rem;
        display: block;
        margin-bottom: 0.5rem;
      }
      .feature-grid h3 {
        margin: 0 0 0.5rem;
        font-size: 1.1rem;
      }
      .feature-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.95rem;
      }
      .featured {
        padding: 4rem 1rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
        margin: 0 1rem 2rem;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .section-header h2 {
        margin: 0;
      }
      .link-more {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;
      }
      .dest-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1rem;
      }
      .dest-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .dest-card__area {
        font-size: 0.72rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--color-accent);
        background: #ecfeff;
        border-radius: 9999px;
        padding: 0.15rem 0.6rem;
        display: inline-block;
        align-self: flex-start;
      }
      .dest-card__nome {
        margin: 0;
        font-size: 1.25rem;
      }
      .dest-card__tagline {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        flex: 1;
      }
      .dest-card__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 0.5rem;
        border-top: 1px solid var(--color-border);
      }
      .dest-card__price {
        color: var(--color-accent);
        font-weight: 700;
      }
      .dest-card__days {
        font-size: 0.85rem;
        color: var(--color-fg-muted);
      }
      .pacchetti-band {
        padding: 4rem 1rem;
        margin-bottom: 2rem;
      }
      .pacchetti-band h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .pacchetti-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.25rem;
      }
      .pkg-card {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        background: #ffffff;
      }
      .pkg-card--featured {
        border-color: var(--color-accent);
        box-shadow: 0 0 0 1px var(--color-accent);
      }
      .pkg-card__tier {
        font-weight: 700;
        font-size: 1.1rem;
        color: var(--color-fg-default);
      }
      .pkg-card__tier[data-tier="discovery"] {
        color: #0e7490;
      }
      .pkg-card__tier[data-tier="premium"] {
        color: #7c3aed;
      }
      .pkg-card__tier[data-tier="custom"] {
        color: #b45309;
      }
      .pkg-card__desc {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        flex: 1;
      }
      .pkg-card__price {
        font-weight: 700;
        color: var(--color-fg-default);
        margin: 0;
      }
      .pkg-card__ideal {
        font-size: 0.85rem;
        color: var(--color-fg-muted);
        margin: 0;
      }
      .cta-band {
        padding: 4rem 1rem;
        background: var(--color-fg-default);
        color: #ffffff;
        text-align: center;
      }
      .cta-band h2 {
        margin: 0 0 0.75rem;
        color: #ffffff;
      }
      .cta-band p {
        color: rgba(255, 255, 255, 0.85);
        margin: 0 0 2rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly mockData = inject(MockDataService);

  readonly featuredDestinazioni$ = this.mockData.destinazioni$.pipe(
    map((data) => data.destinazioni.filter((d) => d.featured).slice(0, 3))
  );

  readonly pacchetti$ = this.mockData.pacchetti$;

  areaLabel(area: string): string {
    const labels: Record<string, string> = {
      asia: 'Asia',
      africa: 'Africa',
      'america-latina': 'America Latina',
      europa: 'Europa',
      oceania: 'Oceania'
    };
    return labels[area] ?? area;
  }
}
