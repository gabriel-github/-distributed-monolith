import { Sequelize } from "sequelize-typescript";
import { Transactionmodel } from "./transaction.model";
import { TransactionRepository } from "./transaction.repository";
import { Transaction } from "../domain/transaction";
import { Id } from "../../@shared/domain/value-object/id.value-object";



describe('TransactionRepository test', () => {
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

  it('should save a transaction', async () => {
    const transactionRepository = new TransactionRepository;

    const transaction = new Transaction({
      id: new Id("1"),
      amount: 100,
      orderId: "order-1"
    })

    transaction.approve()

    const result = await transactionRepository.save(transaction);

    expect(result.id.id).toBe(transaction.id.id)
    expect(result.status).toBe("approved")
    expect(result.amount).toBe(transaction.amount)
    expect(result.orderId).toBe(transaction.orderId)
  })
})