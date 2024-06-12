import { Odoo } from "src/entities/odoo"
import { IOdooCases, INotify } from "./interface-odoo-cases";
import { IOdooRepository } from "src/repositories/odoo/interface-odoo-repository";

export class OdooCases implements IOdooCases {
    constructor(private readonly odooRepository: IOdooRepository) { }

    async notify({ name, clientUserId, image, category }: INotify) {
        const odoo = new Odoo({ name, clientUserId, image, category })

        const odooResponse = await this.odooRepository.notify(odoo)

        return odooResponse
    }
}