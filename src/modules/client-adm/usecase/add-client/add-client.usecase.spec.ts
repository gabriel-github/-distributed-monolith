import { Id } from "../../../@shared/domain/value-object/id.value-object"
import { Client } from "../../domain/client.entity"
import { AddClientUseCase } from "./add-client.usecase"

const client = new Client({
  id: new Id("1"),
  name: "Client 1",
  email: "client@gmail.com",
  address: "Rua 1, 1, sao paulo"
})

const mockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn()
  }
}

describe('Add client unit test', () => {
  it('should add a client', async () => {
    const clientRepository = mockRepository()
    const addClientUseCase = new AddClientUseCase(clientRepository);

    const result = await addClientUseCase.execute({
      name: "Client 1",
      email: "client@gmail.com",
      address: "Rua 1, 1, sao paulo"
    })

    expect(clientRepository.add).toHaveBeenCalled()
    expect(result.id).toBeDefined();
    expect(result.name).toBe("Client 1");
    expect(result.email).toBe("client@gmail.com");
    expect(result.address).toBe("Rua 1, 1, sao paulo");
  })
})