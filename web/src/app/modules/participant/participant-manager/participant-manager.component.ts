import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { genderTypes, maritalTypes, EnumType } from '../model/enum';
import { ParticipantService } from '../../services/participant-service';
import { ParticipantResponse } from '../model/paticipant';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-participant-manager',
  templateUrl: './participant-manager.component.html'
})
export class ParticipantManagerComponent {

  form: FormGroup;
  loading: boolean = false;
  genders: EnumType[];
  maritals: EnumType[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private participantService: ParticipantService,
    private toastr: ToastrService
  ) {
    this.loading = true;

    this.form = this.formBuilder.group({
      code: {
        value: null,
        disabled: true,
      },
      status: [true],
      name: [null, Validators.required],
      externalCode: [null, Validators.required],
      mail: [null],
      phoneNumber: [null, Validators.required],
      cpfCnpj: [null],
      gender: [null],
      marital: [null],
      document: [null],
      spouse: [null],
      notAplicateCnpjCpf: [false],
      tokenSms: [false],
      exposedPerson: [false],
      digitalSignature: [false]
    });

    this.genders = genderTypes;
    this.maritals = maritalTypes;

    this.activatedRoute
      .params
      .subscribe(params => {
        if (params['code']) {
          this.loadParticipant(params['code']);
        } else {
          this.loading = false;
        }
      });
  }

  loadParticipant(code: number) {
    this.participantService.get(code)
      .subscribe({
        next: (participantResponse: ParticipantResponse) => {
          this.loading = false;
          this.form.patchValue(participantResponse);
        },
        error: (err) => {
          this.loading = false;
          console.log(err);
          this.toastr.error('Falha ao carregar participante');
          return this.router.navigate(['participant', 'search']);
        }
      });

  }

  onBack() {
    return this.router.navigate(['participant', 'search']);
  }

  onSave() {
    if (this.form.invalid) {
      this.toastr.error('Campos obrigatórios não preenchidos');
      return;
    }

    let entity = this.form.getRawValue();
    this.loading = true;
    this.participantService.save(entity)
      .subscribe({
        next: () => {
          this.loading = false;
          this.toastr.success('Participante salvo!');
          return this.router.navigate(['participant', 'search']);
        },
        error: (err) => {
          this.loading = false;
          console.log(err);
        }
      });
  }
}
