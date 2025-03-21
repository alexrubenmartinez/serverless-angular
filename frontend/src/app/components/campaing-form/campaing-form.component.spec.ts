import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaingFormComponent } from './campaing-form.component';

describe('CampaingFormComponent', () => {
  let component: CampaingFormComponent;
  let fixture: ComponentFixture<CampaingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaingFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
