import { IPatrianiRepository } from "../interface-patriani-repository";
import { INotify } from "src/use-cases/patriani/interface-patriani-cases";
import 'dotenv/config'

import axios from "axios";

export class PatrianiRepository implements IPatrianiRepository {
    async notify({ id, name, date, message }: INotify): Promise<any> {
        try {
            const patrianiResponse = await axios({
                method: 'post',
                url: `${process.env.PATRIANI_URL}`,
                data: {
                    id: id,
                    name: name,
                    date: date,
                    message: message
                },
                headers: {
                    "Authorization": process.env.PATRIANI_TOKEN
                }
            });

            return patrianiResponse
        } catch (error) {
            console.log(error)
            throw new Error(error as string)
        }
    }
}