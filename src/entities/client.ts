export class Client {
    id?: number
    createdAt?: Date
    updatedAt?: Date
    name: string
    image: {
        base64: string
        url: string
    }
    categoryId: number
    developerId?: number

    constructor(props: Client) {
        const { id, name, image: imagem, categoryId, developerId } = props

        this.id = id
        this.name = name
        this.image = {
            base64: imagem.base64,
            url: imagem.url
        }
        this.categoryId = categoryId
        this.developerId = developerId
    }
}