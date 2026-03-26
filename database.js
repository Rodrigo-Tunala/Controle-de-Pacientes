const sqlite3 = require('sqlite3')

const { open } = require('sqlite')

const creatDb = async () => {

    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    })
    
    await db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        date_of_birth TEXT,
        telephone TEXT,
        address TEXT,
        routine TEXT
    )`)

    console.log('Tabela de pacientes criada com sucesso!')

    await db.exec(`
        CREATE TABLE IF NOT EXISTS services (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            patient_id INTEGER,
            date TEXT,
            description TEXT,
            evolution TEXT,
            observations TEXT,
            FOREIGN KEY (patient_id) REFERENCES patients(id)
        )
    `)

    console.log('Tabela de atendimentos criada com sucesso!')

    
    const checking = await db.get(`SELECT * FROM patients`)

    if (!checking) {
        await db.exec(`
            INSERT INTO patients (name, date_of_birth, telephone, address, routine) 
            VALUES
            (
                'João Silva', '1990-01-01', '11123456789', 'Rua A, 123', 'injeção para diabetes'
            ),
            (
                'Maria Souza', '1985-05-15', '11987654321', 'Rua B, 456', 'medicação para hipertensão'
            ),
            (
                'Carlos Oliveira', '1978-10-20', '11999999999', 'Rua C, 789', 'fisioterapia para dor nas costas'
            ),
            (
                'Ana Santos', '1995-03-30', '11888888888', 'Rua D, 321', 'consulta de rotina'
            )
        
            `)
    }else {
        console.log('Dados já existem no banco de dados.')
    }


    return db;




}


module.exports = { creatDb };