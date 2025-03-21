import { ChangeDetectionStrategy, Component, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-infinite-scroll-trigger',
  imports: [CommonModule],
  templateUrl: './infinite-scroll-trigger.component.html',
  styleUrl: './infinite-scroll-trigger.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollTriggerComponent implements OnInit {
  loaded = output<void>();

  ngOnInit() {
    this.loaded.emit();
  }
}
