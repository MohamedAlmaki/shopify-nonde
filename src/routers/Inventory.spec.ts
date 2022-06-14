import express, { Application } from 'express';
import "ts-jest";
import request from "supertest";

import InventoryRoute from './InventoryRoute';
import InventoryController from "../controllers/InventoryController";

jest.mock('../controllers/InventoryController');

describe('', () => {
    const shortId = 'short-id';
    const expectedResponse = expect.anything();

    let app: Application;
    let InventoryControllerMock: any
    let mockRequest: any;

    beforeEach(() => {
        jest
            .spyOn(InventoryController, 'getInventory')
            .mockImplementation(async (req, res) => {
                res.json();
            });

        app = express();
        app.use(express.json());
        app.use('/', InventoryRoute.getRouter());
        mockRequest = request(app);
    });

    it('should call InventoryControllerMock.getInventory function when GET /inventory', async () => {
        await mockRequest.get(`/inventory`);

        expect(InventoryControllerMock.getInventory)
            .toHaveBeenCalledWith(
                expect.objectContaining({
                    params: { shortId },
                }),
                expectedResponse,
            );
    });

    it('should call call InventoryControllerMock.createInventory function when POST /inventory', async () => {
        const body = { name: String };

        await mockRequest.post(`/inventory`).send(body);
        expect(InventoryControllerMock.shortenUrl)
            .toHaveBeenCalledWith(
                expect.objectContaining({
                    body,
                }), expectedResponse,
            );
    });
});