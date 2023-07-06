import { AddClientUseCase } from "../usecase/add-client/add-client.usecase";
import { FindClientUseCase } from "../usecase/find-client/find-client.usecase";
import { AddClientFacadeInputDto, ClientAdmFacadeInterface, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.interface.facade";



export class ClientAdmFacade implements ClientAdmFacadeInterface {
  constructor(private addClientUseCase: AddClientUseCase, private findClientUseCase: FindClientUseCase) {}
  
  async add(input: AddClientFacadeInputDto): Promise<void> {
    await this.addClientUseCase.execute(input)
  }

  async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
    return await this.findClientUseCase.execute(input)
  }
}