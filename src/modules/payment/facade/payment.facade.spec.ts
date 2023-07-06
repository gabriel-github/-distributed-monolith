import { Sequelize } from "sequelize-typescript";
import { PaymentFacadeFactory } from "../factory/facade.factory";
import { Transactionmodel } from "../repository/transaction.model";


describe('ProcessPayment Facade test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([Transactionmodel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('shoul create a transaction', async () => {
    const paymentFacade = PaymentFacadeFactory.create();

    const input = {
      orderId: "order-1",
      amount: 100
    }

    const result = await paymentFacade.process(input);

    expect(result.amount).toBe(100)
    expect(result.orderId).toBe("order-1")
    expect(result.status).toBe("approved")
    expect(result.transactionId).toBeDefined()

  })
})