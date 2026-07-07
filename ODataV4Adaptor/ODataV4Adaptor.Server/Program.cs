using Microsoft.AspNetCore.OData;
using Microsoft.AspNetCore.OData.Batch;
using Microsoft.OData.ModelBuilder;
using ODataV4Adaptor.Server.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Build OData model
var modelBuilder = new ODataConventionModelBuilder();
var gantt = modelBuilder.EntitySet<GanttDataAdaptor>("GanttTasks");
gantt.EntityType.HasKey(t => t.TaskID);

var batchHandler = new DefaultODataBatchHandler
{
    MessageQuotas =
    {
        MaxNestingDepth = 10,
        MaxOperationsPerChangeset = 100
    }
};

// Register OData route components
builder.Services.AddControllers().AddOData(
    options => options
        .Select()
        .Filter()
        .OrderBy()
        .Expand()
        .Count()
        .SetMaxTop(100)
        .AddRouteComponents("odata", modelBuilder.GetEdmModel(), batchHandler));

// Enable CORS so the TypeScript client (served from a different origin
// when run via webpack dev server, or from the same origin when served
// from this server's wwwroot) can call the OData endpoint.
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(corsBuilder =>
    {
        corsBuilder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// CORS must be applied before MapControllers and after static files so
// pre-flight requests are handled correctly.
app.UseCors();
app.UseODataBatching();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
