using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Azure.Cosmos;
using Microsoft.AspNetCore.SignalR;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();

        // CosmosDB configuration
        services.AddSingleton<CosmosClient>(sp =>
            new CosmosClient(Configuration["CosmosDB:ConnectionString"]));

        services.AddSingleton<CosmosService>(sp =>
            new CosmosService(
                sp.GetRequiredService<CosmosClient>(),
                Configuration["CosmosDB:DatabaseName"],
                Configuration["CosmosDB:ContainerName"]));

        // Add SignalR
        services.AddSignalR();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseRouting();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapHub<RecordHub>("/recordHub");
        });
    }
}
