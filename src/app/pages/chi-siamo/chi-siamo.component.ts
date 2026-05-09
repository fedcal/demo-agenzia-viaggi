import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-chi-siamo',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Chi siamo</h1>
        <p>Dal 2008 progettiamo viaggi su misura per chi vuole scoprire il mondo in modo autentico.</p>
      </div>
    </section>

    <article class="demo-container content">
      <section class="story">
        <h2>Atlante Viaggi Boutique</h2>
        <p>
          Nata a Bologna nel 2008, Atlante Viaggi Boutique è un'agenzia indipendente specializzata in
          itinerari personalizzati. Non lavoriamo con cataloghi. Ogni viaggio parte da una conversazione:
          chi sei, dove vuoi andare, cosa ti aspetti di sentire tornando a casa.
        </p>
        <p>
          Siamo iscritti a <strong>Asscom Confcommercio</strong> e lavoriamo esclusivamente con partner
          locali selezionati e verificati. I nostri travel designer vivono e respirano le destinazioni
          di cui si occupano: Omar ha vissuto a Casablanca, Giulia tre anni a Kyoto, Valentina ha
          percorso la Carretera Austral in bici. Non vendiamo pacchetti: costruiamo esperienze.
        </p>
        <p>
          In 17 anni abbiamo progettato oltre 2.400 itinerari, accompagnato 6.000+ viaggiatori
          e mantenuto un tasso di soddisfazione del 97% (indagine post-viaggio 2025).
        </p>
      </section>

      <section class="values">
        <h2>I nostri valori</h2>
        <ul class="values-grid">
          <li>
            <h3>Autenticità</h3>
            <p>Fuori dai circuiti di massa, dentro le comunità locali. La vera scoperta è nell'incontro.</p>
          </li>
          <li>
            <h3>Responsabilità</h3>
            <p>Privilegiamo fornitori locali, strutture a basso impatto, turismo sostenibile e consapevole.</p>
          </li>
          <li>
            <h3>Competenza</h3>
            <p>Ogni destination specialist conosce personalmente i luoghi che propone. Nessuna vendita al buio.</p>
          </li>
          <li>
            <h3>Cura</h3>
            <p>Seguiamo ogni dettaglio pre-partenza e siamo reperibili 7/7 durante tutto il tuo viaggio.</p>
          </li>
        </ul>
      </section>

      <section class="team" *ngIf="team$ | async as team">
        <h2>Il team</h2>
        <ul class="team-grid">
          <li *ngFor="let m of team.team" class="team-card">
            <div class="team-card__avatar" aria-hidden="true">{{ m.nome.charAt(0) }}</div>
            <h3>{{ m.nome }}</h3>
            <p class="team-card__role">{{ m.ruolo }}</p>
            <p class="team-card__area">{{ m.areaSpecializzazione }}</p>
            <p class="team-card__bio">{{ m.bio }}</p>
            <p class="team-card__exp">{{ m.anniEsperienza }} anni di esperienza</p>
            <div class="team-card__lingue">
              <span *ngFor="let l of m.lingue" class="lang-tag">{{ l }}</span>
            </div>
          </li>
        </ul>
      </section>

      <section class="faq" *ngIf="faq$ | async as faq">
        <h2>Domande frequenti</h2>
        <ul class="faq-list">
          <li *ngFor="let item of faq.faq" class="faq-item">
            <h3>{{ item.domanda }}</h3>
            <p>{{ item.risposta }}</p>
          </li>
        </ul>
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
      .story {
        max-width: 720px;
        margin: 0 auto 4rem;
      }
      .story h2 {
        margin-bottom: 1rem;
      }
      .story p {
        line-height: 1.7;
        margin-bottom: 1rem;
        color: var(--color-fg-muted);
      }
      .values {
        margin-bottom: 4rem;
      }
      .values h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .values-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1.5rem;
      }
      .values-grid li {
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
      }
      .values-grid h3 {
        margin: 0 0 0.5rem;
        color: var(--color-accent);
      }
      .values-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.95rem;
      }
      .team {
        margin-bottom: 4rem;
      }
      .team h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .team-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 1.5rem;
      }
      .team-card {
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        text-align: center;
      }
      .team-card__avatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: var(--color-accent);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: 700;
        margin: 0 auto 1rem;
      }
      .team-card h3 {
        margin: 0 0 0.25rem;
      }
      .team-card__role {
        margin: 0 0 0.25rem;
        color: var(--color-accent);
        font-weight: 600;
        font-size: 0.9rem;
      }
      .team-card__area {
        margin: 0 0 0.75rem;
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        font-style: italic;
      }
      .team-card__bio {
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        margin-bottom: 0.5rem;
        text-align: left;
      }
      .team-card__exp {
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 0.75rem;
      }
      .team-card__lingue {
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
        justify-content: center;
      }
      .lang-tag {
        font-size: 0.7rem;
        background: #ecfeff;
        color: var(--color-accent);
        padding: 0.2rem 0.5rem;
        border-radius: 9999px;
        font-weight: 600;
      }
      .faq h2 {
        text-align: center;
        margin-bottom: 2rem;
      }
      .faq-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        max-width: 720px;
        margin-inline: auto;
      }
      .faq-item {
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
      }
      .faq-item h3 {
        margin: 0 0 0.5rem;
        font-size: 1rem;
        color: var(--color-fg-default);
      }
      .faq-item p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        line-height: 1.6;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChiSiamoComponent {
  private readonly mockData = inject(MockDataService);

  readonly team$ = this.mockData.team$;
  readonly faq$ = this.mockData.faq$;
}
