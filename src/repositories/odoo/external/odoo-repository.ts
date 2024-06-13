import { IOdooRepository } from "../interface-odoo-repository";
import { INotify } from "src/use-cases/odoo/interface-odoo-cases";
import 'dotenv/config'

import axios from "axios";

export class OdooRepository implements IOdooRepository {
    async notify({ name, clientUserId, image, category }: INotify): Promise<any> {
        try {
            const odooResponse = await axios({
                method: 'post',
                url: `${process.env.HERTA_URL}/notify/`,
                data: {
                    user_id: clientUserId,
                    user_name: name,
                    user_photo: image,
                    user_category: category
                }
            });

            return odooResponse
        } catch (error) {
            console.log(error)
            throw new Error(error as string)
        }
    }
}