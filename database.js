const sqlite3 = require('sqlite3')

const { open } = require('sqlite')

const creatDb = async () => {

    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    })
    // Criar a tabela de pacientes e atendimentos
    await db.exec(`
    CREATE TABLE IF NOT EXISTS pacientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        date_of_birth INTEGER,
        telephone TEXT,
        address TEXT,
        routine TEXT
        
        `)

    console.log('Tabela de pacientes criada com sucesso!')

    await db.exec(`
        CREATE TABLE IF NOT EXISTS atendimentos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            patient_id INTEGER,
            date INTEGER,
            description TEXT,
            evolution TEXT,
            observations TEXT,
            FOREIGN KEY (patient_id) REFERENCES pacientes(id)
        )
    `)

    console.log('Tabela de atendimentos criada com sucesso!')

    
    const checking = await db.get('SELECT * FROM pacientes and atendimentos')

    if (!checking) {
        await db.exec(`
            INSERT INTO pacientes (name, date_of_birth, telephone, address, routine) 
            VALUES
            (
                'João Silva', 1990-01-01, '11123456789', 'Rua A, 123', 'injeção para diabetes'

            ),
            (
                'Maria Souza', 1985-05-15, '11987654321', 'Rua B, 456', 'medicação para hipertensão'
            ),
            (
                'Carlos Oliveira', 1978-10-20, '11999999999', 'Rua C, 789', 'fisioterapia para dor nas costas'
            ),
            (
                'Ana Santos', 1995-03-30, '11888888888', 'Rua D, 321', 'consulta de rotina'
            )
            
        `)
    }else {
        console.log('Dados já existem no banco de dados.')
    }


    return db




}