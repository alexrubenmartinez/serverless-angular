import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaingDetailComponent } from './campaing-detail.component';

describe('CampaingDetailComponent', () => {
  let component: CampaingDetailComponent;
  let fixture: ComponentFixture<CampaingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaingDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
