import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrongComponent } from './cadastrong.component';

describe('CadastrongComponent', () => {
  let component: CadastrongComponent;
  let fixture: ComponentFixture<CadastrongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
