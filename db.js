import pg from "pg"



const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'repertorios',
    password: '1234',
    max: 12,
    min: 2,
    idleTimeoutMillis: 3000,
    connectionTimeoutMillis: 2000
})

export async function insertar(cancion, artista, tono) {
    const client = await pool.connect();
    try {
        const { rows } = client.query({
            text: `insert into repertorios(cancion,artista,tono) values($1,$2,$3) returning *`,
            values: [cancion, artista, tono]
        })
        client.release()
    } catch (err) {
        console.log(err)
    }

}

export async function consultar() {
    const client = await pool.connect()
    try {

        const { rows } = await client.query('select * from repertorios')
        client.release()
        return rows
    } catch (err) {
        console.log(err);
    }
}

export async function eliminar(id) {
    const client = await pool.connect()
    try {
        const { rows } = await client.query({
            text: 'delete from repertorios where id=$1',
            values: [id]
        })
        client.release()
    } catch (err) {
        console.log(err);
    }

}
export async function editar(id, cancion, artista, tono) {
    const client = await pool.connect()
    try {
        const { rows } = await client.query({
            text: 'update repertorios set cancion=$2, artista=$3, tono=$4 where id=$1',
            values: [id, cancion, artista, tono]
        })
        client.release()

    } catch (err) {
        console.log(err);
    }
}