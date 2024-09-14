using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class RecordController : ControllerBase
{
    private readonly CosmosService _cosmosService;
    private readonly IHubContext<RecordHub> _hubContext;

    public RecordController(CosmosService cosmosService, IHubContext<RecordHub> hubContext)
    {
        _cosmosService = cosmosService;
        _hubContext = hubContext;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(string id, [FromQuery] string partitionKey)
    {
        var record = await _cosmosService.GetRecordAsync<dynamic>(id, partitionKey);
        if (record == null) return NotFound();
        return Ok(record);
    }

    [HttpPost]
    public async Task<IActionResult> Set([FromBody] dynamic record, [FromQuery] string id, [FromQuery] string partitionKey)
    {
        await _cosmosService.SetRecordAsync(record, id, partitionKey);
        await _hubContext.Clients.All.SendAsync("ReceiveMessage", "server", $"Record {id} updated");
        return Ok();
    }
}
