import { read, write } from '../utils/sensorFile.js';
import { AppError } from '../errors/AppError.js';
import { appDataSource } from '../database/appDataSource.js';
import { Sensor } from '../entities/Sensor.js';



class SensorService {
    private fileName = 'sensor.json';
    private sensorsMemoria: Sensor[] = []
    private repositorySensor = appDataSource.getRepository(Sensor);

    public async getAllSensors(): Promise<Sensor[]> {

        const sensors = await this.repositorySensor.find();
        return sensors;
    }


    // Criar uma função que recupera um sensor pelo seu ID

    public async addSensor(body: unknown): Promise<Sensor> {
        const { serialNumber, nome, descricao  } = body as Sensor;
        // validations 
        if(!serialNumber || !nome) {
            throw new Error("Missing required sensor fields");
        }
        const sensor = await this.repositorySensor.findOne({
            where: {
                serialNumber: serialNumber
            },
        })
        if(sensor) {
            throw new AppError(400, "Sensor já cadastrado!");
        }
        const novoSensor = { nome, serialNumber, descricao };
        const sensorSerializado = this.repositorySensor.create(novoSensor as Sensor);
        const sensorBanco = await this.repositorySensor.save(sensorSerializado)
        return sensorBanco;
    }
 
    public async updateSensor(id: string, body: Sensor) {
       const sensor = await this.repositorySensor.findOneBy({ id });
       if(!sensor) {
            throw new AppError(404, "Sensor não existe!");
       }
       const newSensor = await this.repositorySensor.create(body);
       const updatedSensor = await this.repositorySensor.merge(sensor, newSensor);
       await this.repositorySensor.save(updatedSensor)
       return updatedSensor;
    }

    public async deleteSensor(id: string) {

        

    }

}

export default SensorService;