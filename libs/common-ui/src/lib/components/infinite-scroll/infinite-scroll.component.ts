import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import {
  WaIntersectionObservee,
  WaIntersectionObserverDirective,
} from '@ng-web-apis/intersection-observer';

@Component({
  selector: 'app-infinite-scroll',
  imports: [
    CommonModule,
    InfiniteScrollDirective,
    WaIntersectionObserverDirective,
    WaIntersectionObservee,
  ],
  templateUrl: './infinite-scroll.component.html',
  styleUrl: './infinite-scroll.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollComponent {
  scrollType = input<'ngx' | 'web-api' | null>(null);

  scrollEnded = output<void>();

  onIntersection(entries: IntersectionObserverEntry[]) {
    if (entries.length === 0) {
      return;
    }

    if (entries[0].isIntersecting) {
      this.scrollEnded.emit();
    }
  }

  onScrollEnded() {
    this.scrollEnded.emit();
  }
}
