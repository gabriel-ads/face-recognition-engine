export class Patriani {
    id: string
    name: string
    date: string
    message: string

    constructor(props: Patriani) {
        const { id, name, message, date } = props

        this.id = id
        this.name = name
        this.message = message
        this.date = date
    }
}