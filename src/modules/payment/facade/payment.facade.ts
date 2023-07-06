import { ProcessPaymentUseCase } from './../usecase/process-payment/process-payment.usecase';
import { PaymentFacadeInputDto, PaymentFacadeInterface, PaymentFacadeOutputDto } from './facade.interface';



export class PaymentFacade implements PaymentFacadeInterface {
  constructor(private processPaymentUseCase: ProcessPaymentUseCase) {}

  async process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return await this.processPaymentUseCase.execute(input)
  }
}