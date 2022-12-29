insert into alergia (nombre, descripcion)
values
    ('Alergia farmacológica', 'Afección en la que el sistema inmunológico reacciona de forma anormal frente a una sustancia extraña.'),
    ('Alergia a alimentos', 'Reacción molesta o peligrosa del sistema inmunológico tras haber ingerido un alimento determinado.'),
    ('Alergia al látex', 'Reacción alérgica a ciertas proteínas que se encuentran en el látex de caucho natural.'),
    ('Asma alérgica', 'Asma generada por la exposición a las mismas sustancias que desencadenan síntomas alérgicos.'),
    ('Rinitis alérgica', 'Reacción alérgica que provoca ojos llorosos y comezón, estornudos y otros síntomas similares.'),
    ('Alergia al moho', 'Respuesta alérgica anormal a las esporas del moho.');

insert into Especialidad (nombre, descripcion)
values 
    ('Dermatología', 'Enfermedades y desordenes relacionados con la piel'),
    ('Oftalmología', 'Enfermedades del ojo y su tratamiento, incluyendo el globo ocular, su musculatura, el sistema lagrimal y los párpados'),
    ('Angiología y cirugía vascular', 'Estudio, prevención, diagnóstico clínico e instrumental y tratamiento de la patología vascular.'),
    ('Medicina Interna', 'Especialidad médica que atiende integralmente los problemas de salud en pacientes adultos, ingresados en un centro hospitalario o en consultas ambulatorias'),
    ('Gastroenterología', 'Especialidad médica que se ocupa de las enfermedades del aparato digestivo y órganos asociados, conformado por: esófago, estómago, hígado y vías biliares, páncreas, intestino delgado, colonsno recto.');

insert into Doctor (nombre, apellido, "emailDoctor", ranks, superuser, username, pass)
values 
    ('adminN', 'adminP', 'admin@gmail.com', 4.5, TRUE, 'admin', 'admin'),
    ('Juan', 'Perez', 'jperez@gmail.com', 4.5, FALSE, 'doc1', '12345'),
    ('Juan', 'Perez', 'admin@gmail.com', 4.5, TRUE, 'doc1', '12345'),
    ('Julio', 'Torrez', 'jtorrez@gmail.com', 4.2, FALSE, 'doc2', '54321'),
    ('María', 'Gonzales', 'mgonzales@gmail.com', 4.7, FALSE, 'doc3', '67890'),
    ('Valeria', 'Oros', 'voros@gmail.com', 4.9, FALSE, 'doc4', '09876'),
    ('Susana', 'Escobar', 'sescobar@gmail.com', 4.0, FALSE, 'doc5', '12121');

insert into Documento ("emailDoctor", "tipo", "nombre", "emitidoPor", "fechaEmision")
values 
    ('jperez@gmail.com', 'Diploma', 'Diploma en humanidades', 'Universidad Mayor de San Andrés', '2010-12-04'),
    ('jtorrez@gmail.com', 'Maestría', 'Maestria en odontologia', 'Universidad Católica Boliviana', '2010-10-02'),
    ('mgonzales@gmail.com', 'Diploma', 'Diploma en ciencias puras', 'Universidad Privada Boliviana', '2010-8-29'),
    ('voros@gmail.com', 'Título', 'Titulo de doctor', 'Universidad Mayor de San Andrés', '2010-06-15'),
    ('sescobar@gmail.com', 'Diploma', 'Diploma de doctor', 'Universidad Mayor de San Simón', '2010-04-12');

insert into "doctorEspecialidad" ("emailDoctor", "idEspecialidad")
values 
    ('jperez@gmail.com', 3),
    ('mgonzales@gmail.com', 2),
    ('voros@gmail.com', 5),
    ('sescobar@gmail.com', 1),
    ('jtorrez@gmail.com', 4);

insert into Paciente (username, pass, nombre, apellido, "emailPaciente", edad, "tipoSangre", "fechaNacimiento")
values 
    ('pac1', 'abcde', 'Pedro', 'Blanco', 'pblaco@gmail.com', 23, 'A', '1999-04-12'),
    ('pac2', 'edcba', 'Micaela', 'Flores', 'mflores@gmail.com', 34, 'B', '1988-02-23'),
    ('pac3', 'fghij', 'Valentina', 'Morales', 'vmorales@gmail.com', 47, 'O', '1962-02-20'),
    ('pac4', 'jihgf', 'Christian', 'Peñaloza', 'cpeñaloza@gmail.com', 49, 'AB', '1972-03-01'),
    ('pac5', 'ababa', 'Sergio', 'Lopez', 'slopez@gmail.com', 60, 'A', '1962-02-20');

insert into "pacienteAlergia" ("idAlergia", "emailPaciente")
values 
    (1, 'mflores@gmail.com'),
    (3, 'cpeñaloza@gmail.com'),
    (5, 'pblaco@gmail.com'),
    (4, 'vmorales@gmail.com'),
    (2, 'slopez@gmail.com');

insert into "citaMedica" ("emailDoctor", "emailPaciente", fecha, hora, problema, estado)
values 
    ('jperez@gmail.com', 'vmorales@gmail.com', '2022-03-09', '13:30', 'Me duele', TRUE),
    ('jtorrez@gmail.com', 'cpeñaloza@gmail.com', '2022-03-10', '14:30', 'Me duele', TRUE),
    ('mgonzales@gmail.com', 'mflores@gmail.com', '2022-03-11', '15:30', 'Me duele', TRUE),
    ('voros@gmail.com', 'pblaco@gmail.com', '2022-03-12', '16:30', 'Me duele', TRUE),
    ('sescobar@gmail.com', 'slopez@gmail.com', '2022-03-13', '17:30', 'Me duele', TRUE);