export class Client {
    id?: number
    createdAt?: Date
    updatedAt?: Date
    name: string
    clientUserId?: number
    image?: {
        base64: string
        url: string
    }
    categoryId: number
    developerId?: number

    constructor(props: Client) {
        const { id, name, image, clientUserId, categoryId, developerId } = props

        this.id = id
        this.name = name
        this.image = image
        this.clientUserId = clientUserId
        this.categoryId = categoryId
        this.developerId = developerId
    }
}