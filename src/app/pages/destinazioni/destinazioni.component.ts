import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';
import type { AreaGeografica, Destinazione } from '../../data/types';

type FiltroArea = AreaGeografica | 'tutte';
type FiltroBudget = 'tutti' | 'budget' | 'medio' | 'premium';

const AREA_LABELS: Record<string, string> = {
  tutte: 'Tutte',
  asia: 'Asia',
  africa: 'Africa',
  'america-latina': 'America Latina',
  europa: 'Europa',
  oceania: 'Oceania'
};

const BUDGET_LABELS: Record<FiltroBudget, string> = {
  tutti: 'Tutti i budget',
  budget: 'Fino a €2.500',
  medio: '€2.500 – €4.000',
  premium: 'Oltre €4.000'
};

function matchBudget(d: Destinazione, filtro: FiltroBudget): boolean {
  if (filtro === 'tutti') return true;
  if (filtro === 'budget') return d.prezzoBase < 2500;
  if (filtro === 'medio') return d.prezzoBase >= 2500 && d.prezzoBase <= 4000;
  return d.prezzoBase > 4000;
}

@Component({
  selector: 'app-destinazioni',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Le nostre destinazioni</h1>
        <p>12 destinazioni selezionate dai nostri travel designer. Ogni viaggio è su misura.</p>
      </div>
    </section>

    <article class="demo-container content">
      <div class="filters" role="group" aria-label="Filtri destinazioni">
        <div class="filter-group">
          <span class="filter-label">Area geografica:</span>
          <div class="filter-chips">
            <button
              *ngFor="let area of areeDisponibili"
              class="chip"
              [class.chip--active]="filtroArea() === area"
              (click)="setArea(area)"
              type="button"
            >
              {{ areaLabel(area) }}
            </button>
          </div>
        </div>
        <div class="filter-group">
          <span class="filter-label">Budget per persona:</span>
          <div class="filter-chips">
            <button
              *ngFor="let b of budgetOptions"
              class="chip"
              [class.chip--active]="filtroBudget() === b"
              (click)="setBudget(b)"
              type="button"
            >
              {{ budgetLabel(b) }}
            </button>
          </div>
        </div>
      </div>

      <p class="results-count">
        {{ destinazioniFiltrate().length }} destinazioni trovate
      </p>

      <ul class="dest-grid" *ngIf="destinazioniFiltrate().length > 0; else noResults">
        <li *ngFor="let d of destinazioniFiltrate()" class="dest-card">
          <div class="dest-card__header">
            <span class="dest-card__area">{{ areaLabel(d.area) }}</span>
            <span class="dest-card__diff" [attr.data-diff]="d.difficolta">{{ difficoltaLabel(d.difficolta) }}</span>
          </div>
          <h2 class="dest-card__nome">{{ d.nome }}</h2>
          <p class="dest-card__paese">{{ d.paese }}</p>
          <p class="dest-card__tagline">{{ d.tagline }}</p>
          <p class="dest-card__desc">{{ d.descrizione }}</p>
          <ul class="dest-card__highlights">
            <li *ngFor="let h of d.highlights.slice(0, 3)">{{ h }}</li>
          </ul>
          <div class="dest-card__meta">
            <span>Stagione migliore: {{ d.stagioneMigliore }}</span>
            <span>Min. {{ d.durataMinimaGiorni }} giorni</span>
          </div>
          <div class="dest-card__footer">
            <span class="dest-card__price">
              {{ d.prezzoBase | currency:'EUR':'symbol':'1.0-0' }} –
              {{ d.prezzoMax | currency:'EUR':'symbol':'1.0-0' }}
              <small>/persona</small>
            </span>
          </div>
        </li>
      </ul>

      <ng-template #noResults>
        <div class="no-results">
          <p>Nessuna destinazione corrisponde ai filtri selezionati.</p>
          <button type="button" class="btn btn-secondary" (click)="resetFiltri()">Rimuovi filtri</button>
        </div>
      </ng-template>
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
      .filters {
        background: var(--color-bg-subtle);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
        margin-bottom: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .filter-group {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
      }
      .filter-label {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--color-fg-muted);
        white-space: nowrap;
      }
      .filter-chips {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
      .chip {
        padding: 0.3rem 0.8rem;
        border-radius: 9999px;
        border: 1px solid var(--color-border);
        background: #ffffff;
        font-size: 0.85rem;
        cursor: pointer;
        color: var(--color-fg-muted);
        transition: all 0.15s ease;
      }
      .chip:hover {
        border-color: var(--color-accent);
        color: var(--color-accent);
      }
      .chip--active {
        background: var(--color-accent);
        border-color: var(--color-accent);
        color: #ffffff;
        font-weight: 600;
      }
      .results-count {
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        margin-bottom: 1.5rem;
      }
      .dest-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 1.5rem;
      }
      .dest-card {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.5rem;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .dest-card__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
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
      }
      .dest-card__diff {
        font-size: 0.72rem;
        font-weight: 600;
        border-radius: 9999px;
        padding: 0.15rem 0.6rem;
      }
      .dest-card__diff[data-diff="facile"] {
        background: #dafbe1;
        color: var(--color-success);
      }
      .dest-card__diff[data-diff="media"] {
        background: #fff8c5;
        color: var(--color-warning);
      }
      .dest-card__diff[data-diff="avventurosa"] {
        background: #ffebe9;
        color: var(--color-danger);
      }
      .dest-card__nome {
        margin: 0;
        font-size: 1.35rem;
      }
      .dest-card__paese {
        margin: 0;
        font-size: 0.85rem;
        color: var(--color-fg-muted);
      }
      .dest-card__tagline {
        margin: 0;
        font-weight: 600;
        font-size: 0.95rem;
        font-style: italic;
        color: var(--color-fg-muted);
      }
      .dest-card__desc {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        line-height: 1.6;
      }
      .dest-card__highlights {
        margin: 0;
        padding-left: 1.25rem;
        font-size: 0.85rem;
        color: var(--color-fg-muted);
      }
      .dest-card__highlights li {
        margin-bottom: 0.2rem;
      }
      .dest-card__meta {
        display: flex;
        justify-content: space-between;
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        flex-wrap: wrap;
        gap: 0.25rem;
        padding-top: 0.5rem;
        border-top: 1px dashed var(--color-border);
      }
      .dest-card__footer {
        padding-top: 0.5rem;
        border-top: 1px solid var(--color-border);
        margin-top: auto;
      }
      .dest-card__price {
        color: var(--color-accent);
        font-weight: 700;
        font-size: 1rem;
      }
      .dest-card__price small {
        font-weight: 400;
        font-size: 0.8rem;
        color: var(--color-fg-muted);
      }
      .no-results {
        text-align: center;
        padding: 3rem 1rem;
        color: var(--color-fg-muted);
      }
      .btn {
        display: inline-block;
        padding: 0.6rem 1.25rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        border: 1px solid var(--color-border);
        background: #ffffff;
        color: var(--color-fg-default);
        cursor: pointer;
      }
      .btn:hover {
        background: var(--color-bg-subtle);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DestinazioniComponent {
  private readonly mockData = inject(MockDataService);

  readonly filtroArea = signal<FiltroArea>('tutte');
  readonly filtroBudget = signal<FiltroBudget>('tutti');

  private readonly tutteDestinazioni = toSignal(
    this.mockData.destinazioni$.pipe(map((d) => d.destinazioni)),
    { initialValue: [] as Destinazione[] }
  );

  readonly destinazioniFiltrate = computed(() => {
    const area = this.filtroArea();
    const budget = this.filtroBudget();
    return this.tutteDestinazioni().filter((d) => {
      const matchArea = area === 'tutte' || d.area === area;
      return matchArea && matchBudget(d, budget);
    });
  });

  readonly areeDisponibili: FiltroArea[] = [
    'tutte',
    'asia',
    'africa',
    'america-latina',
    'europa',
    'oceania'
  ];

  readonly budgetOptions: FiltroBudget[] = ['tutti', 'budget', 'medio', 'premium'];

  setArea(area: FiltroArea): void {
    this.filtroArea.set(area);
  }

  setBudget(b: FiltroBudget): void {
    this.filtroBudget.set(b);
  }

  resetFiltri(): void {
    this.filtroArea.set('tutte');
    this.filtroBudget.set('tutti');
  }

  areaLabel(area: string): string {
    return AREA_LABELS[area] ?? area;
  }

  budgetLabel(b: FiltroBudget): string {
    return BUDGET_LABELS[b];
  }

  difficoltaLabel(d: string): string {
    const labels: Record<string, string> = {
      facile: 'Facile',
      media: 'Media',
      avventurosa: 'Avventurosa'
    };
    return labels[d] ?? d;
  }
}
