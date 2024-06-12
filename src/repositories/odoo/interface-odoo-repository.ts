import { INotify } from "src/use-cases/odoo/interface-odoo-cases"

export interface IOdooRepository {
    notify: (odoo: INotify) => Promise<any>
}