using Microsoft.Azure.Cosmos;
using System.Threading.Tasks;

public class CosmosService
{
    private readonly Container _container;

    public CosmosService(CosmosClient cosmosClient, string databaseName, string containerName)
    {
        _container = cosmosClient.GetContainer(databaseName, containerName);
    }

    public async Task<T> GetRecordAsync<T>(string id, string partitionKey)
    {
        try
        {
            ItemResponse<T> response = await _container.ReadItemAsync<T>(id, new PartitionKey(partitionKey));
            return response.Resource;
        }
        catch (CosmosException)
        {
            return default;
        }
    }

    public async Task SetRecordAsync<T>(T record, string id, string partitionKey)
    {
        await _container.UpsertItemAsync(record, new PartitionKey(partitionKey));
    }
}
