interface Data{
    id:string,
    name:string,
    description:string,
    price:number,
    stock?:number
    published:boolean
}

export const database:Data[]=[
    {
        id:'1',
        name:'Arreglo 1',
        description:'desc arrglo 1',
        price:20,
        stock:10,
        published:true
    },
    {
        id:'2',
        name:'Arreglo 2',
        description:'desc arrglo 2',
        price:5,
        stock:10,
        published:true
    },
    {
        id:'3',
        name:'Arreglo 3',
        description:'desc arrglo 3',
        price:17,
        stock:10,
        published:true
    },
    {
        id:'4',
        name:'Arreglo 4',
        description:'desc arrglo 4',
        price:23,
        stock:10,
        published:true
    }
]
