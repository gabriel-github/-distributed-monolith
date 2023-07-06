import { Id } from "../../../@shared/domain/value-object/id.value-object"
import { Transaction } from "../../domain/transaction"
import { ProcessPaymentUseCase } from "./process-payment.usecase"

const transaction = new Transaction({
  id: new Id("1"),
  amount: 100,
  orderId: "1",
  status: "approved"
})

const transactionDeclined = new Transaction({
  id: new Id("1"),
  amount: 99,
  orderId: "1",
  status: "declined"
})

const MockRepository = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transaction))
  }
}

const MockRepositoryDeclined = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transactionDeclined))
  }
}

describe('Process payment unit test', () => {
  it('should approve a transaction', async () => {
    const paymentRepository = MockRepository();
    const processPaymentUseCase = new ProcessPaymentUseCase(paymentRepository);

    const input = {
      orderId: "1",
      amount: 100,
    }

    const result = await processPaymentUseCase.execute(input);

    expect(result.transactionId).toBe(transaction.id.id);
    expect(paymentRepository.save).toHaveBeenCalled()
    expect(result.status).toBe("approved");
    expect(result.amount).toBe(100);
    expect(result.orderId).toBe("1");
    expect(result.createdAt).toStrictEqual(transaction.createdAt)
    expect(result.updatedAt).toStrictEqual(transaction.updatedAt)
  })

  it('should decline a transaction', async () => {
    const paymentRepository = MockRepositoryDeclined();
    const processPaymentUseCase = new ProcessPaymentUseCase(paymentRepository);

    const input = {
      orderId: "1",
      amount: 99,
    }


    const result = await processPaymentUseCase.execute(input);

    expect(result.transactionId).toBe(transactionDeclined.id.id);
    expect(paymentRepository.save).toHaveBeenCalled()
    expect(result.status).toBe("declined");
    expect(result.amount).toBe(99);
    expect(result.orderId).toBe("1");
    expect(result.createdAt).toStrictEqual(transactionDeclined.createdAt)
    expect(result.updatedAt).toStrictEqual(transactionDeclined.updatedAt)
  })
})