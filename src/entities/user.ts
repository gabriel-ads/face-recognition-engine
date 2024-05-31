export class User {
    id: number
    name: string
    imagem: {
        base64: string
        url: string
    }
    categoryId: number

    constructor(props: User) {
        const { id, name, imagem, categoryId } = props

        this.id = id
        this.name = name
        this.imagem = {
            base64: imagem.base64,
            url: imagem.url
        }
        this.categoryId = categoryId
    }
}