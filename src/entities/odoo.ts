export class Odoo {
    name: string
    clientUserId?: number
    image?: {
        base64: string
        url: string
    }
    category: 'Users' | 'Recepcionista' | 'Corretor' | 'Vip'

    constructor(props: Odoo) {
        const { name, clientUserId, image, category } = props

        this.name = name
        this.clientUserId = clientUserId
        this.image = image
        this.category = category
    }
}