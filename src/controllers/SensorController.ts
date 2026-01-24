import type { Request, Response } from "express";
import type SensorService from "../services/SensorService.js";


export default class SensorController {

    private sensorService: SensorService;

    constructor(sensorService:  SensorService) {
        this.sensorService = sensorService;
    }

    public async getAllSensors(req: Request, res: Response) {

        const sensors = await this.sensorService.getAllSensors();
        res.status(200).json(sensors);

    }

    public async addSensor(req: Request, res: Response) {

            const body = req.body;
            const sensor = await this.sensorService.addSensor(body);
            res.status(201).json(sensor);

    }


    public async updateSensor(req: Request, res: Response) {
            const { id } = req.params;
            const body = req.body;
            const sensor = await this.sensorService.updateSensor(id as string, body);
            res.status(200).json(sensor);
    }

    public async deleteSensor(req: Request, res: Response) {
            const { id } = req.params;
            await this.sensorService.deleteSensor(id as string);
            res.status(204).json({ status: "Sensor deletado" })
    }
}
