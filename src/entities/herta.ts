export class Herta {
    name: string
    clientUserId?: string
    image?: {
        base64: string
        url: string
    }
    categoryId: number

    constructor(props: Herta) {
        const { name, clientUserId, image, categoryId } = props

        this.name = name
        this.clientUserId = clientUserId
        this.image = image
        this.categoryId = categoryId
    }
}