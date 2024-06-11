import { Odoo } from "src/entities/odoo";
import { IOdooCases, INotify } from "./interface-odoo-cases";
import { IOdooRepository } from "src/repositories/odoo/interface-odoo-repository";

export class OdooCases implements IOdooCases {
    constructor(private readonly odooRepository: IOdooRepository) { }

    notify: ({ name, clientUserId, image, category }: INotify) => Promise<any>;
}