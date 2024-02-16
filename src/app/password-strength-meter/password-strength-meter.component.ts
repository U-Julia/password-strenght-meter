import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";

enum StrengthType {
  default,
  easy,
  medium,
  strong,
  length
}

interface Item {
  type: StrengthType,
  color: string
}

@Component({
  selector: 'app-password-strength-meter',
  templateUrl: './password-strength-meter.component.html',
  styleUrls: ['./password-strength-meter.component.scss']
})
export class PasswordStrengthMeterComponent implements OnInit, OnDestroy {
  public items: Item[] = [];
  form = new FormGroup({
    password: new FormControl('',
      [Validators.minLength(8)])
  })

  private passwordSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.setItems();
    this.formControlListener();
  }

  ngOnDestroy(): void {
    this.passwordSubscription?.unsubscribe();
  }

  private setItems(type?: StrengthType): void {
    switch (type) {
      case StrengthType.length:
        this.items = [
          {
            type: StrengthType.length,
            color: '#FF0000'
          },
          {
            type: StrengthType.length,
            color: '#FF0000'
          },
          {
            type: StrengthType.length,
            color: '#FF0000'
          },
        ];
        break;
      case StrengthType.easy:
        this.items = [
          {
            type: StrengthType.easy,
            color: '#FF0000'
          },
          {
            type: StrengthType.easy,
            color: '#c1bfbf'
          },
          {
            type: StrengthType.easy,
            color: '#c1bfbf'
          },
        ];
        break;
      case StrengthType.medium:
        this.items = [
          {
            type: StrengthType.medium,
            color: '#ffff00'
          },
          {
            type: StrengthType.medium,
            color: '#ffff00'
          },
          {
            type: StrengthType.medium,
            color: '#c1bfbf'
          },
        ];
        break;
      case StrengthType.strong:
        this.items = [
          {
            type: StrengthType.strong,
            color: '#006400'
          },
          {
            type: StrengthType.strong,
            color: '#006400'
          },
          {
            type: StrengthType.strong,
            color: '#006400'
          },
        ];
        break;
      default:
        this.items = [
          {
            type: StrengthType.default,
            color: '#c1bfbf'
          },
          {
            type: StrengthType.default,
            color: '#c1bfbf'
          },
          {
            type: StrengthType.default,
            color: '#c1bfbf'
          },
        ];
    }
  }

  private formControlListener(): void {
    this.passwordSubscription = this.form.get('password')?.valueChanges
      .pipe(map(value => {
        const v = value.trim();
        return v;
      }))
      .subscribe(value => {
        this.checkPasswordStrength(value)
      })
  }

  private checkPasswordStrength(password: string): void {
    const easyRegex = /^[a-zA-Z0-9_!@#$%^&*()+{}\[\]:;<>,/.?~=-]*$/;
    const mediumRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,/.?~=-])[a-zA-Z!@#$%^&*()_+{}\[\]:;<>,/.?~=-]*$|^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]*$|^(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,/.?~=-])[0-9!@#$%^&*()_+{}\[\]:;<>,/.?~=-]*$/;
    const strongRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,/.?~=-])[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,/.?~=-]*$/;
    this.setItems();
    if (!password.length) {
      return
    }
    if (this.form.get('password')?.errors?.minlength) {
      this.setItems(StrengthType.length);
      return;
    }

    if (strongRegex.test(password)) {
      this.setItems(StrengthType.strong);
      return;
    }

    if (mediumRegex.test(password)) {
      this.setItems(StrengthType.medium);
      return;
    }

    if (easyRegex.test(password)) {
      this.setItems(StrengthType.easy);
      return;
    }
  }
}
