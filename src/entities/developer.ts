export class Developer {
    id?: number
    createdAt?: Date
    updatedAt?: Date
    name?: string
    username?: string
    password?: string
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
        const { id, name, username, password, token } = props
        const pattern = /\s/gm

        const regex = new RegExp(pattern)

        if (username) {
            if (regex.test(username)) {
                throw new Error('Username cannot contain spaces')
            }
        } else {
            throw new Error('Username cannot be empty')
        }


        this.id = id
        this.name = name
        this.username = username
        this.password = password
        this.token = token
    }
}