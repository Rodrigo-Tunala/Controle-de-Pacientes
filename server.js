const express = require('express');

const app = express();

const { creatDb } = require('./database')

const PORT = 3000

app.use(express.json());


app.get('/', (req, res) => {
    res.send(`
        <body>
            <h1>Sistema de Gerenciamento de Pacientes</h1>
            <h2>Bem-vindo ao sistema!</h2>
            <p>use as rotas /pacientes e /pacientes/:id/atendimentos para acessar os dados dos pacientes e atendimentos.</p>
        </body>
    `)
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
    creatDb();

})


app.get('/patients', async (req, res) => {

    const db = await creatDb();

    const patients = await db.all(`SELECT * FROM patients`)

    res.json(patients);

})

app.get('/patients/:id/services', async (req, res) => {

    const { id } = req.params;

    const db = await creatDb();

    // mostrar o paciente e seus atendimentos
    const patient = await db.get(`SELECT * FROM patients WHERE id = ?`, [id])
    
    if (!patient) {
        return res.status(404).json({ error: 'Paciente não encontrado' });
    }
    

    const services = await db.all(`SELECT * FROM services WHERE patient_id = ?`, [id])

    if (services.length === 0) {
        return res.status(404).json({ error: 'Nenhum atendimento encontrado para este paciente' });
    }

    const patient_services = await db.all(`SELECT p.id AS id, p.name, s.date, s.id AS id_service, s.description, s.evolution, s.observations FROM patients p JOIN services s ON p.id = s.patient_id WHERE p.id =? `, [id]);

    res.json(patient_services);
})

app.post(`/patients/:id/services`, async (req, res) => {

    const {date, description, evolution, observations } = req.body;
    
    const { id } = req.params;
    

    const db = await creatDb();


    await db.run(`INSERT INTO services (patient_id, date, description, evolution, observations) VALUES (?, ?, ?, ?, ?)`, [id, date, description, evolution, observations])

    res.json({ message: 'Atendimento adicionado com sucesso' });

    
})

app.put('/patients/:id', async (req, res) => {

    const { id } = req.params;
    const { name, email, address, phone } = req.body;

    const db = await creatDb();

    const patient = await db.get(`SELECT * FROM patients WHERE id = ?`, [id]);

    if (!patient) {
        return res.status(404).json({ error: 'Paciente não encontrado' });
    }

    await db.run(`UPDATE patients SET name = ?, email = ?, address = ?, phone = ? WHERE id = ?`, [name, email, address, phone, id]);

    res.json({ message: 'Paciente atualizado com sucesso' });

});


app.put('/patients/:id/services/:service_id', async (req, res) =>{

    const { id } = req.params;
    const { service_id } = req.params;
    const { date, description, evolution, observations } = req.body;

    const db =await creatDb();

    const service = await db.get(`SELECT * FROM services WHERE id = ? AND patient_id = ?`, [service_id, id]);

    if (!service) {
        return res.status(404).json({ error: 'Atendimento não encontrado' });
    }
    await db.run(`UPDATE services SET date = ?, description = ?, evolution = ?, observations = ? WHERE id = ? AND patient_id = ?`, [date, description, evolution, observations, service_id, id]);

    res.json({ message: 'Atendimento atualizado com sucesso' });
})


app.delete('/patients/:id/services/:service_id', async (req, res) => {

    const { id } = req.params;
    const { service_id } = req.params;  

    const db = await creatDb();

    const service = await db.get(`SELECT * FROM services WHERE id = ? AND patient_id = ?`, [service_id, id]);

    if (!service) {
        return res.status(404).json({ error: 'Atendimento não encontrado' });
    }

    await db.run(`DELETE FROM services WHERE id = ? AND patient_id = ?`, [service_id, id]);

    res.json({ message: 'Atendimento deletado com sucesso' });
});



app.delete('/patients/:id', async (req, res) => {

    const { id } = req.params;

    const db = await creatDb();

    const patient = await db.get(`SELECT * FROM patients WHERE id = ?`, [id])

    if (!patient) {
        return res.status(404).json({ error: 'Paciente não encontrado' });
    }

    await db.run(`DELETE FROM patients WHERE id = ?`, [id])


    res.json({ message: 'Paciente deletado com sucesso' });

})
