import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelfPage } from './self.page';

describe('SelfPage', () => {
  let component: SelfPage;
  let fixture: ComponentFixture<SelfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
