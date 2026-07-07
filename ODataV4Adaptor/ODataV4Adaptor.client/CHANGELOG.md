# ODataV4Adaptor in TypeScript Gantt (ASP.NET Core)

This sample shows how to bind a **Syncfusion EJ2 TypeScript Gantt** component to a remote
**ASP.NET Core Web API** that exposes its data through an **OData V4** endpoint using the
built-in `ODataV4Adaptor` of `@syncfusion/ej2-data`.

It follows the same structure and conventions as the official Syncfusion sample
[Binding-data-from-remote-service-to-typescript-data-grid](https://github.com/SyncfusionExamples/Binding-data-from-remote-service-to-typescript-data-grid/tree/master/ODataV4Adaptor).

## Project structure

```
ODataV4Adaptor.slnx
├── ODataV4Adaptor.Client/                <- TypeScript client (this project)
│   ├── src/
│   │   ├── index.html                    <- HTML entry, loads Syncfusion CSS from CDN
│   │   ├── index.ts                      <- Gantt + DataManager + ODataV4Adaptor
│   │   └── styles.css                    <- Custom layout styles
│   ├── package.json                      <- npm scripts and Syncfusion dependencies
│   ├── webpack.config.js                 <- Bundles TypeScript into wwwroot
│   ├── tsconfig.json
│   ├── eslint.config.js
│   └── ODataV4Adaptor.Client.esproj      <- Visual Studio JS project SDK
└── ODataV4Adaptor.Server/                <- ASP.NET Core Web API
    ├── Controllers/GanttController.cs    <- OData controller for GanttTasks
    ├── Models/GanttData.cs               <- Entity + sample data
    ├── Program.cs                        <- OData + CORS configuration
    └── Properties/launchSettings.json    <- 7023 (HTTPS) / 5168 (HTTP)
```

## Prerequisites

* [Node.js](https://nodejs.org/) (LTS recommended) and **npm**
* [.NET SDK](https://dotnet.microsoft.com/download) (the server targets `net10.0`)

## How to run the sample

### 1. Restore and build the TypeScript client

```powershell
cd ODataV4Adaptor.Client
npm install
npm run build
```

`npm run build` runs `webpack --mode=development --watch`. The first build produces:

* `wwwroot/index.html` – the page that hosts the Gantt
* `wwwroot/main.<hash>.js` – the TypeScript bundle
* `wwwroot/css/main.<hash>.css` – your custom CSS

Leave the watch process running while developing.

### 2. Run the ASP.NET Core server

In a second terminal:

```powershell
cd ODataV4Adaptor.Server
dotnet run
```

The server listens on the URLs declared in `launchSettings.json`
(`https://localhost:7023` and `http://localhost:5168` by default) and the
fallback middleware serves `wwwroot/index.html` produced by the client build.

### 3. Open the application

Browse to **https://localhost:7023/** – the Gantt is rendered and immediately loads
its data from `https://localhost:7023/odata/GanttTasks` via the
`ODataV4Adaptor`. CORS is enabled on the server so the same page works even
when the client is opened from a different origin.

> If you change the server's HTTPS port, update the `url` in
> `src/index.ts` (and re-run `npm run build`) and the `applicationUrl`
> in `ODataV4Adaptor.Server/Properties/launchSettings.json`.

## What the sample demonstrates

* Connecting a TypeScript Gantt to an OData V4 service using
  `new DataManager({ url, adaptor: new ODataV4Adaptor() })`.
* Configuring the Gantt with the same set of task fields that the
  server entity exposes (`TaskID`, `TaskName`, `StartDate`, `EndDate`,
  `Duration`, `Progress`, `ParentID`).
* Enabling sort, filter, selection, edit, toolbar, search and
  expand/collapse features – all of which are processed remotely by the
  OData V4 service.
* Using Syncfusion's CDN stylesheet links in `index.html` and
  `syncfusion-helper.js` so no CSS bundling step is required.
* ASP.NET Core 10 minimal hosting model with OData v4 and a permissive
  CORS policy for local development.

## NPM scripts

| Script          | What it does                                                            |
|-----------------|-------------------------------------------------------------------------|
| `npm run build` | Webpack in development mode with `--watch` – outputs to `wwwroot`        |
| `npm run release` | Webpack in production mode – outputs to `wwwroot`                     |
| `npm run publish` | Production webpack build followed by `dotnet publish -c Release`      |

## Resources

* [Syncfusion EJ2 Grid – ODataV4Adaptor](https://ej2.syncfusion.com/documentation/grid/connecting-to-adaptors/odatav4-adaptor)
* [Syncfusion EJ2 Gantt – Getting Started](https://ej2.syncfusion.com/documentation/gantt/getting-started)
* [Microsoft.AspNetCore.OData](https://learn.microsoft.com/aspnet/core/web-api/odata/odata)
