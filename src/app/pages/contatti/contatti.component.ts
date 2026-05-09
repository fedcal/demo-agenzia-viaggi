import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-contatti',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ReactiveFormsModule],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Contatti e preventivo</h1>
        <p>Raccontaci il tuo prossimo viaggio. Risponderemo entro 24 ore con una proposta personalizzata.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="info$ | async as info">
      <div class="contact-grid">
        <section class="info-block">
          <h2>Dove siamo</h2>
          <p>
            {{ info.indirizzo.via }}<br />
            {{ info.indirizzo.cap }} {{ info.indirizzo.citta }} ({{ info.indirizzo.provincia }})<br />
            {{ info.indirizzo.regione }}
          </p>
          <p class="assoc">{{ info.associazione }}</p>

          <h2>Contatti diretti</h2>
          <ul class="contact-list">
            <li>
              <strong>Telefono:</strong>
              <a [href]="'tel:' + info.contatti.telefono">{{ info.contatti.telefono }}</a>
            </li>
            <li>
              <strong>WhatsApp:</strong>
              <a [href]="whatsAppLink(info.contatti.whatsapp)" target="_blank" rel="noopener">
                {{ info.contatti.whatsapp }}
              </a>
            </li>
            <li>
              <strong>Email:</strong>
              <a [href]="'mailto:' + info.contatti.email">{{ info.contatti.email }}</a>
            </li>
          </ul>

          <h2>Orari di apertura</h2>
          <ul class="hours-list">
            <li><span>Lunedì</span><span>{{ info.orari.lunedi }}</span></li>
            <li><span>Martedì</span><span>{{ info.orari.martedi }}</span></li>
            <li><span>Mercoledì</span><span>{{ info.orari.mercoledi }}</span></li>
            <li><span>Giovedì</span><span>{{ info.orari.giovedi }}</span></li>
            <li><span>Venerdì</span><span>{{ info.orari.venerdi }}</span></li>
            <li><span>Sabato</span><span>{{ info.orari.sabato }}</span></li>
            <li><span>Domenica</span><span>{{ info.orari.domenica }}</span></li>
          </ul>
        </section>

        <section class="form-block">
          <h2>Richiedi un preventivo</h2>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="!submitted(); else thankyou">
            <div class="field">
              <label for="nome">Nome e cognome</label>
              <input id="nome" type="text" formControlName="nome" autocomplete="name" required />
            </div>
            <div class="field">
              <label for="email">Email</label>
              <input id="email" type="email" formControlName="email" autocomplete="email" required />
            </div>
            <div class="field">
              <label for="telefono">Telefono (opzionale)</label>
              <input id="telefono" type="tel" formControlName="telefono" autocomplete="tel" />
            </div>
            <div class="field">
              <label for="destinazione">Destinazione / area di interesse</label>
              <input
                id="destinazione"
                type="text"
                formControlName="destinazione"
                placeholder="es. Giappone, Asia in generale, sorprendimi..."
                required
              />
            </div>
            <div class="row">
              <div class="field">
                <label for="partenza">Data partenza indicativa</label>
                <input id="partenza" type="month" formControlName="partenza" required />
              </div>
              <div class="field">
                <label for="durata">Durata (giorni)</label>
                <input id="durata" type="number" formControlName="durata" min="5" max="90" required />
              </div>
              <div class="field">
                <label for="persone">N. persone</label>
                <input id="persone" type="number" formControlName="persone" min="1" max="20" required />
              </div>
            </div>
            <div class="field">
              <label for="budget">Budget indicativo per persona</label>
              <select id="budget" formControlName="budget" required>
                <option value="">Seleziona...</option>
                <option value="fino-2500">Fino a €2.500</option>
                <option value="2500-4000">€2.500 – €4.000</option>
                <option value="4000-6000">€4.000 – €6.000</option>
                <option value="oltre-6000">Oltre €6.000</option>
              </select>
            </div>
            <div class="field">
              <label for="note">Raccontaci il tuo viaggio ideale</label>
              <textarea id="note" formControlName="note" rows="4" placeholder="Cosa ti aspetti? Avventura, relax, cultura, gastronomia..."></textarea>
            </div>
            <div class="field field--checkbox">
              <input id="privacy" type="checkbox" formControlName="privacy" />
              <label for="privacy">
                Accetto la privacy policy e il trattamento dei dati personali per ricevere il preventivo.
              </label>
            </div>
            <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Invia richiesta</button>
            <p class="form-disclaimer">
              Demo non funzionale: nessuna richiesta viene realmente inviata. Per contatti reali usa telefono o email sopra.
            </p>
          </form>

          <ng-template #thankyou>
            <div class="thankyou">
              <h3>Grazie {{ form.value.nome }}!</h3>
              <p>
                La tua richiesta di preventivo per
                <strong>{{ form.value.persone }} persona/e</strong> verso
                <strong>{{ form.value.destinazione }}</strong> è stata simulata.
              </p>
              <p>In un sito reale riceveresti un'email di conferma e un travel designer ti contattarebbe entro 24 ore.</p>
              <button type="button" class="btn btn-secondary" (click)="reset()">Nuova richiesta</button>
            </div>
          </ng-template>
        </section>
      </div>
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
      .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 3rem;
      }
      .info-block h2 {
        margin: 1.5rem 0 0.75rem;
        font-size: 1.2rem;
      }
      .info-block h2:first-child {
        margin-top: 0;
      }
      .info-block p {
        margin: 0 0 0.5rem;
        color: var(--color-fg-muted);
        font-size: 0.95rem;
        line-height: 1.6;
      }
      .assoc {
        font-size: 0.8rem !important;
        font-style: italic;
      }
      .contact-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .contact-list li {
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
      }
      .hours-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .hours-list li {
        display: flex;
        justify-content: space-between;
        padding: 0.4rem 0;
        border-bottom: 1px dashed var(--color-border);
        font-size: 0.9rem;
      }
      .form-block {
        background: var(--color-bg-subtle);
        padding: 2rem;
        border-radius: var(--radius-lg);
      }
      .form-block h2 {
        margin: 0 0 1.5rem;
      }
      .field {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
      }
      .field label {
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
      }
      .field input,
      .field textarea,
      .field select {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.95rem;
        background: #ffffff;
      }
      .field input:focus,
      .field textarea:focus,
      .field select:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .field--checkbox {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
      }
      .field--checkbox label {
        font-weight: 400;
        font-size: 0.85rem;
        color: var(--color-fg-muted);
      }
      .row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.75rem;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
        transition: all 0.15s ease;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .btn-primary:not(:disabled):hover {
        background: #0c6b82;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
      }
      .form-disclaimer {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin-top: 0.5rem;
      }
      .thankyou {
        text-align: center;
        padding: 1rem 0;
      }
      .thankyou h3 {
        color: var(--color-success);
        margin-bottom: 1rem;
      }
      .thankyou p {
        color: var(--color-fg-muted);
        margin-bottom: 0.75rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContattiComponent {
  private readonly mockData = inject(MockDataService);
  private readonly fb = inject(FormBuilder);

  readonly info$ = this.mockData.info$;
  readonly submitted = signal(false);

  readonly form: FormGroup = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: [''],
    destinazione: ['', Validators.required],
    partenza: ['', Validators.required],
    durata: [14, [Validators.required, Validators.min(5), Validators.max(90)]],
    persone: [2, [Validators.required, Validators.min(1), Validators.max(20)]],
    budget: ['', Validators.required],
    note: [''],
    privacy: [false, Validators.requiredTrue]
  });

  whatsAppLink(num: string): string {
    const clean = num.replace(/[^0-9]/g, '');
    return `https://wa.me/${clean}`;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted.set(true);
    }
  }

  reset(): void {
    this.form.reset({ durata: 14, persone: 2, privacy: false });
    this.submitted.set(false);
  }
}
