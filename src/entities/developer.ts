export class Developer {
    id?: number
    createdAt?: Date
    updatedAt?: Date
    name: string
    token?: string
    clients?: Array<{
        id: number
        name: string
        imagem: {
            base64: string
            url: string
        }
        categoryId: number
        developerId: number
    }>

    constructor(props: Developer) {
        const { id, name, token } = props

        this.id = id
        this.name = name
        this.token = token
    }
}