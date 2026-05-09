import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-viaggi-firma',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Viaggi Firma</h1>
        <p>I nostri pacchetti esclusivi per ogni tipo di esploratore. Tutto incluso, zero stress.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="pacchetti$ | async as p">

      <section class="intro">
        <h2>Tre livelli di esperienza</h2>
        <p>
          Ogni pacchetto Atlante include almeno assicurazione, sistemazione selezionata e supporto
          diretto durante il viaggio. La differenza è nel livello di personalizzazione e nei servizi inclusi.
        </p>
      </section>

      <ul class="pacchetti-list">
        <li *ngFor="let pkg of p.pacchetti" class="pkg-card" [class.pkg-card--featured]="pkg.tier === 'premium'">
          <div class="pkg-card__badge" *ngIf="pkg.tier === 'premium'">Più scelto</div>
          <div class="pkg-card__tier" [attr.data-tier]="pkg.tier">{{ pkg.nome }}</div>
          <div class="pkg-card__price">
            <span *ngIf="pkg.prezzoMax; else openPrice">
              {{ pkg.prezzoMin | currency:'EUR':'symbol':'1.0-0' }} – {{ pkg.prezzoMax | currency:'EUR':'symbol':'1.0-0' }}
            </span>
            <ng-template #openPrice>da {{ pkg.prezzoMin | currency:'EUR':'symbol':'1.0-0' }}</ng-template>
            <small>per persona</small>
          </div>
          <p class="pkg-card__desc">{{ pkg.descrizione }}</p>
          <p class="pkg-card__ideal"><strong>Ideale per:</strong> {{ pkg.ideal }}</p>

          <div class="pkg-card__details">
            <div class="pkg-services">
              <h4>Cosa include</h4>
              <ul>
                <li *ngFor="let s of pkg.includeServizi">{{ s }}</li>
              </ul>
            </div>
            <div class="pkg-services pkg-services--no">
              <h4>Non include</h4>
              <ul>
                <li *ngFor="let s of pkg.nonInclude">{{ s }}</li>
              </ul>
            </div>
          </div>

          <a routerLink="/contatti" class="btn btn-primary">Richiedi questo pacchetto</a>
        </li>
      </ul>

      <section class="custom-cta">
        <h2>Non trovi quello che cerchi?</h2>
        <p>
          Il pacchetto Custom Design è pensato per costruire insieme un'esperienza completamente originale.
          Parla direttamente con un travel designer: nessun impegno, solo idee.
        </p>
        <a routerLink="/contatti" class="btn btn-primary">Parla con un travel designer</a>
      </section>
    </article>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: var(--color-bg-subtle);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 {
        margin: 0 0 0.5rem;
      }
      .page-header p {
        color: var(--color-fg-muted);
        margin: 0;
      }
      .content {
        padding: 3rem 1rem;
      }
      .intro {
        max-width: 720px;
        margin: 0 auto 3rem;
        text-align: center;
      }
      .intro h2 {
        margin-bottom: 0.75rem;
      }
      .intro p {
        color: var(--color-fg-muted);
        margin: 0;
        line-height: 1.7;
      }
      .pacchetti-list {
        list-style: none;
        padding: 0;
        margin: 0 0 4rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
      }
      .pkg-card {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-lg);
        padding: 2rem;
        background: #ffffff;
        position: relative;
      }
      .pkg-card--featured {
        border-color: var(--color-accent);
        box-shadow: 0 0 0 2px var(--color-accent);
      }
      .pkg-card__badge {
        position: absolute;
        top: -12px;
        left: 2rem;
        background: var(--color-accent);
        color: #ffffff;
        font-size: 0.75rem;
        font-weight: 700;
        padding: 0.2rem 0.8rem;
        border-radius: 9999px;
      }
      .pkg-card__tier {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
      }
      .pkg-card__tier[data-tier="discovery"] { color: #0e7490; }
      .pkg-card__tier[data-tier="premium"] { color: #7c3aed; }
      .pkg-card__tier[data-tier="custom"] { color: #b45309; }
      .pkg-card__price {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--color-fg-default);
        margin-bottom: 1rem;
      }
      .pkg-card__price small {
        font-size: 0.85rem;
        font-weight: 400;
        color: var(--color-fg-muted);
        margin-left: 0.25rem;
      }
      .pkg-card__desc {
        color: var(--color-fg-muted);
        margin: 0 0 0.75rem;
        line-height: 1.6;
        max-width: 680px;
      }
      .pkg-card__ideal {
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        margin: 0 0 1.5rem;
      }
      .pkg-card__details {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.5rem;
        margin-bottom: 1.5rem;
      }
      .pkg-services h4 {
        margin: 0 0 0.5rem;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--color-fg-muted);
      }
      .pkg-services ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .pkg-services ul li {
        font-size: 0.9rem;
        padding: 0.3rem 0;
        border-bottom: 1px dashed var(--color-border);
        color: var(--color-fg-default);
      }
      .pkg-services ul li::before {
        content: '✓ ';
        color: var(--color-success);
        font-weight: 700;
      }
      .pkg-services--no ul li {
        color: var(--color-fg-muted);
      }
      .pkg-services--no ul li::before {
        content: '— ';
        color: var(--color-fg-muted);
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
        cursor: pointer;
        border: none;
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
      .custom-cta {
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
        padding: 3rem 2rem;
        text-align: center;
      }
      .custom-cta h2 {
        margin-bottom: 0.75rem;
      }
      .custom-cta p {
        color: var(--color-fg-muted);
        margin: 0 0 1.5rem;
        max-width: 560px;
        margin-inline: auto;
        margin-bottom: 1.5rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViaggiFiremaComponent {
  private readonly mockData = inject(MockDataService);

  readonly pacchetti$ = this.mockData.pacchetti$;
}
