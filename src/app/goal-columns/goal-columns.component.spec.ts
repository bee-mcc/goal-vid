import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalColumnsComponent } from './goal-columns.component';

describe('GoalColumnsComponent', () => {
  let component: GoalColumnsComponent;
  let fixture: ComponentFixture<GoalColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoalColumnsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
