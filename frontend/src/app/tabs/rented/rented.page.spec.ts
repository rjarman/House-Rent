import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RentedPage } from './rented.page';

describe('RentedPage', () => {
  let component: RentedPage;
  let fixture: ComponentFixture<RentedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RentedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
