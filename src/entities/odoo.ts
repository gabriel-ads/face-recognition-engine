export class Odoo {
    name: string
    clientUserId?: string
    image: string
    category: 'Usuário' | 'Recepcionista' | 'Corretor' | 'Vip'

    constructor(props: Odoo) {
        const { name, clientUserId, image, category } = props

        this.name = name
        this.clientUserId = clientUserId
        this.image = image
        this.category = category
    }
}