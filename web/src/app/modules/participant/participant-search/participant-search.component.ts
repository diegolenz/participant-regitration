import { Component, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ParticipantResponse } from '../model/paticipant';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { ParticipantService } from '../../services/participant-service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Page } from '../../model/http';
import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { CellDef } from '@angular/cdk/table';

@Component({
  selector: 'app-participant-search',
  templateUrl: './participant-search.component.html'
})
export class ParticipantSearchComponent implements AfterViewInit, OnDestroy {
  loading: boolean = false;
  private unsubscribe = new Subject<void>;
  displayedColumns: string[] = ['select', 'code', 'name', 'cpfCnpj', 'phoneNumber'];
  dataSource = new MatTableDataSource<ParticipantResponse>;

  selection = new SelectionModel<ParticipantResponse>(true, []);
  paginator!: Page<ParticipantResponse>;

  nameSearch: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private participantService: ParticipantService,
    private toastr: ToastrService
  ) {


  }

  ngOnDestroy(): void {

  }


  ngAfterViewInit() {
    this.load();
  }

  load(page?: any) {
    console.log(page);
    if (!page) {
      page = this.paginator;
    }

    this.loading = true;
    this.participantService.find(this.nameSearch, page)
      .subscribe({
        next: (participantPage: Page<ParticipantResponse>) => {
          this.loading = false;
          this.dataSource.data = participantPage.content;
          this.paginator = participantPage;
        },
        error: (err: any) => {
          this.loading = false;
          console.log(err);
          this.toastr.error('Falha ao buscar participantes');
        }
      });
  }

  goToManager(code?: number) {

    if (code) {
      return this.router.navigate(['participant', 'manager', code]);
    }

    return this.router.navigate(['participant', 'manager']);
  }


  generatePdf() {
    if (this.selection.isEmpty()) {
      this.toastr.error('Selecione ao menos um participantes para excluir');
      return;
    }

    const rows = [];
    for (var i = 0; i < this.selection?.selected.length; i++) {
      let p: ParticipantResponse = this.selection.selected[i];

      const value = [
        p.code?.toString(), p.name, p.cpfCnpj?.toString(), p.phoneNumber ? p.phoneNumber.toString() : ''
      ]

      rows.push(value);
    }

    this.dataSource.data.map(a => { a.code, a.cpfCnpj, a.name, a.phoneNumber })

    const doc = new jsPDF();
    doc.text("FeepWeb", 10, 10);
    autoTable(doc, {
      head: [['Código', 'Nome', 'cpf/Cnpj', 'telefone']],
      body: rows
    })

    doc.save("participants.pdf");
  }

  deleteSelected() {
    if (this.selection.isEmpty()) {
      this.toastr.error('Selecione ao menos um participantes para excluir');
      return;
    }

    const codesToDelete: number[] = this.selection.selected.map((participant: ParticipantResponse) => participant.code);

    this.participantService.deleteByCodeList(codesToDelete)
      .subscribe({
        next: () => {
          this.loading = false;
          this.toastr.success('Participante(s) excluídos!');
          this.load();
        },
        error: (err) => {
          this.loading = false;
          console.log(err);
          this.toastr.error('Houve uma falha na exclusão!');
        }
      });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }
}