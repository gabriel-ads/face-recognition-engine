export class Client {
    id?: number
    createdAt?: Date
    updatedAt?: Date
    name: string
    clientUserId?: string
    image?: {
        base64: string
        url: string
    }
    categoryId: number
    developerId?: number
    lastSeen?: string

    constructor(props: Client) {
        const { id, name, image, clientUserId, categoryId, developerId, lastSeen } = props

        if (!name) {
            throw new Error('Name cannot be empty')
        }

        if (!clientUserId) {
            throw new Error('ClientUserId cannot be empty')
        }

        if (!image?.base64) {
            throw new Error('Base64 cannot be empty')
        }

        if (!categoryId) {
            throw new Error('CategoryId cannot be empty')
        }

        if (!image) {
            throw new Error('Image cannot be empty')
        }

        this.id = id
        this.name = name
        this.image = image
        this.clientUserId = clientUserId
        this.categoryId = categoryId
        this.developerId = developerId
        this.lastSeen = lastSeen
    }
}