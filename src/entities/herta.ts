export class Herta {
    clientUserId?: number
    name: string
    image?: {
        base64: string
        url: string
    }
    categoryId: number
    developerId?: number

    constructor(props: Herta) {
        const { name, image, clientUserId, categoryId, developerId } = props

        this.name = name
        this.image = image
        this.clientUserId = clientUserId
        this.categoryId = categoryId
        this.developerId = developerId
    }
}