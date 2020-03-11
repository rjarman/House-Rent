import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  public imageArray: any;
  public isImage: boolean;
  public isUpdate: boolean;
  public isRanted: boolean;
  public imagePath = environment.custom.IMAGE_URL;
  public checkedIt;

  addForm = this.fromBuilder.group({
    ownerInfo: this.fromBuilder.group({
      ownerName: ['', Validators.required],
      mobile1: [''],
      mobile2: ['']
    }),
    houseInfo: this.fromBuilder.group({
      emptyRoom: [''],
      roomDetails: [''],
      price: ['']
    }),
    address: this.fromBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
    renterInfo: this.fromBuilder.group({
      name: [''],
      mobile: [''],
      officeAddress: [''],
      permanentAddress: ['']
    }),
    isChecked: ['']
  });

  constructor(private fromBuilder: FormBuilder,
              private databaseService: DatabaseService,
              private route: Router,
              private activatedRouter: ActivatedRoute) {
                this.isImage = false;
                this.isUpdate = false;
                this.isRanted = false;
                this.checkedIt = false;
              }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      if (Object.keys(params).length > 0) {
        // this.retriveData = JSON.parse(params.sameOwnersData);
        this.addForm.get('ownerInfo.ownerName').setValue(JSON.parse(params.sameOwnersData).personal.ownerName);
        this.addForm.get('ownerInfo.mobile1').setValue(JSON.parse(params.sameOwnersData).personal.mobile1);
        this.addForm.get('ownerInfo.mobile2').setValue(JSON.parse(params.sameOwnersData).personal.mobile2);
        this.addForm.get('houseInfo.emptyRoom').setValue(JSON.parse(params.sameOwnersData).details.houseInfo.emptyRoom);
        this.addForm.get('houseInfo.roomDetails').setValue(JSON.parse(params.sameOwnersData).details.houseInfo.roomDetails);
        this.addForm.get('houseInfo.price').setValue(JSON.parse(params.sameOwnersData).details.houseInfo.price);
        this.addForm.get('address.street').setValue(JSON.parse(params.sameOwnersData).details.address.street);
        this.addForm.get('address.city').setValue(JSON.parse(params.sameOwnersData).details.address.city);
        this.addForm.get('address.state').setValue(JSON.parse(params.sameOwnersData).details.address.state);
        this.addForm.get('address.zip').setValue(JSON.parse(params.sameOwnersData).details.address.zip);
        this.addForm.get('isChecked').setValue(JSON.parse(params.sameOwnersData).details.renterInfo.isChecked);

        this.addForm.get('renterInfo.name').setValue(JSON.parse(params.sameOwnersData).details.renterInfo.renterInfo.name);
        this.addForm.get('renterInfo.mobile').setValue(JSON.parse(params.sameOwnersData).details.renterInfo.renterInfo.mobile);
        this.addForm.get('renterInfo.officeAddress').setValue(JSON.parse(params.sameOwnersData)
          .details.renterInfo.renterInfo.officeAddress);
        this.addForm.get('renterInfo.permanentAddress').setValue(JSON.parse(params.sameOwnersData)
          .details.renterInfo.renterInfo.permanentAddress);

          // console.log(JSON.parse(params.sameOwnersData).details.renterInfo.isChecked);
        if (JSON.parse(params.sameOwnersData).details.renterInfo.isChecked === true) {
          this.checkedIt = 'true';
          this.isRanted = true;
        }
        if (JSON.parse(params.sameOwnersData).details.imagePath.length > 0) {
          this.imageArray = JSON.parse(params.sameOwnersData).details.imagePath;
          this.isImage = true;
          this.isUpdate = true;
        }
        localStorage.setItem('tempOldData', JSON.stringify(this.addForm.value));
      }
    });
  }

  onSubmit() {
    if (!this.isUpdate) {
      this.databaseService.addImage = this.imageArray;
      this.databaseService.addOtherData = this.addForm;
      this.databaseService.addUserFormToDatabase();
      this.route.navigate(['/tabs']);
    } else {
      this.databaseService.addImage = this.imageArray;
      this.databaseService.addOtherData = this.addForm;
      this.databaseService.updateUserFormToDatabase();
      this.route.navigate(['/tabs']);

      // console.log(JSON.parse(localStorage.getItem('tempOldData')));
      // console.log(this.addForm);
      // update
    }
    // this.databaseService.addUserFormToDatabase = this.addForm;
    // this.addForm.setValue({images : this.imageArray});
    // console.log(this.addForm);
  }

  setImages(event) {
    if (event.target.files.length > 0) {
      this.imageArray = event.target.files;
    }
  }

  checkBox() {
    if (!this.addForm.get('isChecked').value || '') {
      this.isRanted = true;
    } else {
      this.isRanted = false;
    }
  }

}
