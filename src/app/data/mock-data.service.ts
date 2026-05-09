import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

import type { InfoAttivita, Destinazione, Pacchetto, Team, Faq } from './types';

export interface DestinazioniJson {
  destinazioni: Destinazione[];
}

export interface PacchettiJson {
  pacchetti: Pacchetto[];
}

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private readonly http = inject(HttpClient);

  readonly info$: Observable<InfoAttivita> = this.http
    .get<InfoAttivita>('/assets/mock/info.json')
    .pipe(shareReplay(1));

  readonly destinazioni$: Observable<DestinazioniJson> = this.http
    .get<DestinazioniJson>('/assets/mock/destinazioni.json')
    .pipe(shareReplay(1));

  readonly pacchetti$: Observable<PacchettiJson> = this.http
    .get<PacchettiJson>('/assets/mock/pacchetti.json')
    .pipe(shareReplay(1));

  readonly team$: Observable<Team> = this.http
    .get<Team>('/assets/mock/team.json')
    .pipe(shareReplay(1));

  readonly faq$: Observable<Faq> = this.http
    .get<Faq>('/assets/mock/faq.json')
    .pipe(shareReplay(1));
}
