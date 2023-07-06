import { Id } from "../../../@shared/domain/value-object/id.value-object"
import { Client } from "../../domain/client.entity"
import { FindClientUseCase } from "./find-client.usecase"

const client = new Client({
  id: new Id("1"),
  name: "Client 1",
  email: "client@gmail.com",
  address: "Rua 1, 1, sao paulo"
})

const mockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(client))
  }
}

describe('Find client unit test', () => {
  it('should find a client', async () => {
    const clientRepository = mockRepository()
    const findClientUseCase = new FindClientUseCase(clientRepository);

    const result = await findClientUseCase.execute({
      id: "1"
    })

    expect(clientRepository.find).toHaveBeenCalled()
    expect(result.id).toBe("1");
    expect(result.name).toBe("Client 1");
    expect(result.email).toBe("client@gmail.com");
    expect(result.address).toBe("Rua 1, 1, sao paulo");
    expect(result.createdAt).toEqual(client.createdAt);
    expect(result.updatedAt).toEqual(client.updatedAt);
  })
})