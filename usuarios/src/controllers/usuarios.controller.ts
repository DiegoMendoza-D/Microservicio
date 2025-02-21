export const getAll = (req: any, res: any) => {
    const doctores = [
        { id: 1, nombre: "Dr. Ana López", especialidad: "Neurología" },
        { id: 2, nombre: "Dr. Juan Osorio", especialidad: "Traumatología" }
    ];

    res.status(200).json(doctores);
}
