interface IPosts {
    id: number,
    title: string,
    description: string,
    author: string
}


export const posts: IPosts[] = [
    {id: 1,
    title: "this is new title",
        description: "this is beautiful book!",
        author: 'Artur'
    },{id: 2,
        title: "Second book",
        description: "this is awful book!",
        author: 'Vaysa'

    },{id: 3,
        title: "Third book",
        description: "this is normal book!this is normal book!this is   normal bo    ok!this i s    normal book!this     is normal book!this is normal book!this is normal book!this is normal book!",
        author: 'Lilia'

    },{id: 4,
        title: "Fourth book",
        description: "this is okay! normol is coudl it be book!",
        author: 'Anya'

    },
]