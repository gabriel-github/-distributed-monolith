import { Sequelize } from "sequelize-typescript";
import { ClientAdmFacadeFactory } from "../factory/facade.factory";
import { ClientModel } from "../repository/client.model";


describe('Client Adm Facade test', () => {
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
    const clientAdmFacade = ClientAdmFacadeFactory.create()

    const input = {
      id: "1",
      name: "Client 1",
      email: "client@gmail.com",
      address: "Rua 1, 1, sao paulo"
    }

    await clientAdmFacade.add(input);

    const client = await ClientModel.findOne({ where: { id: "1" } });

    expect(client).toBeDefined();
    expect(client.clientName).toBe(input.name);
    expect(client.clientEmail).toBe(input.email);
    expect(client.clientAddress).toBe(input.address)
  })

  it('should find a client', async () => {
    const clientAdmFacade = ClientAdmFacadeFactory.create()

    const input = {
      id: "1",
      name: "Client 1",
      email: "client@gmail.com",
      address: "Rua 1, 1, sao paulo",
    }

    await ClientModel.create({
      id: "1",
      name: "Client 1",
      email: "client@gmail.com",
      address: "Rua 1, 1, sao paulo",
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const client = await clientAdmFacade.find(input);

    expect(client).toBeDefined();
    expect(client.id).toBe("1")
    expect(client.name).toBe("Client 1");
    expect(client.email).toBe("client@gmail.com");
    expect(client.address).toBe("Rua 1, 1, sao paulo");
    expect(client.createdAt).toBeDefined()
    expect(client.updatedAt).toBeDefined()
  })
})