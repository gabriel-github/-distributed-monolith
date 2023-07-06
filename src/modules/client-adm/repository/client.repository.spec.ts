import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import { ClientRepository } from "./client.repository";
import { Client } from "../domain/client.entity";
import { Id } from "../../@shared/domain/value-object/id.value-object";


describe('Client repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should add a client', async () => {
    const clientRepository = new ClientRepository();

    const client = new Client({
      id: new Id("1"),
      name: "Client 1",
      email: "client@gmail.com",
      address: "Rua 1, 1, sao paulo"
    })

    await clientRepository.add(client);

    const clientDb = await ClientModel.findOne({
      where: {id: "1"}
    })

    expect(clientDb.clientId).toBe("1")
    expect(clientDb.clientName).toBe("Client 1")
    expect(clientDb.clientEmail).toBe("client@gmail.com")
    expect(clientDb.clientAddress).toBe("Rua 1, 1, sao paulo")
    expect(clientDb.clientCreatedAt).toStrictEqual(client.createdAt)
    expect(clientDb.clientUpdatedAt).toStrictEqual(client.updatedAt)
  })

  it('should find a client', async () => {
    const clientRepository = new ClientRepository();

    await ClientModel.create({
      id: "1",
      name: "Client 1",
      email: "client@gmail.com",
      address: "Rua 1, 1, sao paulo",
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const client = await clientRepository.find("1");

    const clientDb = await ClientModel.findOne({
      where: {id: "1"}
    })

    expect(clientDb.clientId).toBe(client.id.id)
    expect(clientDb.clientName).toBe(client.name)
    expect(clientDb.clientEmail).toBe(client.email)
    expect(clientDb.clientAddress).toBe(client.address)
    expect(clientDb.clientCreatedAt).toStrictEqual(client.createdAt)
    expect(clientDb.clientUpdatedAt).toStrictEqual(client.createdAt)
  })
})    