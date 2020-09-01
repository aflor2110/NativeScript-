import { Component, EventEmitter, Output, Input, OnInit } from "@angular/core";

@Component ({
    selector: "SearchForm",
    moduleId: module.id,
    template: `
    <TextField [(ngModel)] = "textFieldValue" hint="Ingresar Texto......"></TextField>
    <buttom text="Buscar" (tap)= "onButtomTap()" ></buttom>
    `
})

export class SearchFormComponent implements OnInit {
    textFieldValue: string = "";
    @Output() search: EventEmitter<string> = new EventEmitter();
    @Input() inicial: string;

    ngOnInit(): void {
        this.textFieldValue = this.inicial;
    }

    onTapBtn(): void {
        console.log("TAP");
        
    }

    onButtomTap(): void {
        console.log(this.textFieldValue);
        if (this.textFieldValue.length > 2) {
            this.search.emit(this.textFieldValue);
        }
    }

}
