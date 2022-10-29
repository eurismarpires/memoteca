import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeucomponenteComponent } from './meucomponente.component';

describe('MeucomponenteComponent', () => {
  let component: MeucomponenteComponent;
  let fixture: ComponentFixture<MeucomponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeucomponenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeucomponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
