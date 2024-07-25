import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUndoComponent } from './dialog-undo.component';

describe('DialogUndoComponent', () => {
  let component: DialogUndoComponent;
  let fixture: ComponentFixture<DialogUndoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogUndoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogUndoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
