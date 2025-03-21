import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaingListComponent } from './campaing-list.component';

describe('CampaingListComponent', () => {
  let component: CampaingListComponent;
  let fixture: ComponentFixture<CampaingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaingListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
