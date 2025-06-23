import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  isEditingPersonal = false;
  isEditingAddress = false;

  user: any = {
    fullName: '',
    email: '',
    password: '',
    phone: '',
    address: [],
  };

  ngOnInit() {
    const data = localStorage.getItem('user');
    if (data) {
      this.user = JSON.parse(data);
      this.user.password = '**********';
    }

    // Add default address if empty
    if (!this.user.address || this.user.address.length === 0) {
      this.user.address = [
        {
          fullAddress: 'BridgeLabz LLP, 14th Main, HSR Layout, Bangalore',
          city: 'Bengaluru',
          state: 'Karnataka',
          type: 'work',
        },
      ];
    }
  }

  enableEdit(section: 'personal' | 'address') {
    if (section === 'personal') this.isEditingPersonal = true;
    if (section === 'address') this.isEditingAddress = true;
  }

  cancelEdit(section: 'personal' | 'address') {
    if (section === 'personal') this.isEditingPersonal = false;
    if (section === 'address') this.isEditingAddress = false;
  }

  saveProfile() {
    this.isEditingPersonal = false;
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  saveAddress() {
    this.isEditingAddress = false;
    localStorage.setItem('user', JSON.stringify(this.user));
  }
}
