var args = process.argv.slice(2);
var fs = require('fs');
var name = args[0];
var capsName = name.charAt(0).toUpperCase() + name.slice(1);

var dir = './src/' + name;

var files =
    [
        {
            name: '.ts',
            content: "import { ApiHandler } from '../../shared/api.interfaces';\nimport { <%capsName%>Controller } from './<%name%>.controller';\nimport { <%capsName%>Repository } from './<%name%>.repository';\nimport { <%capsName%>Service } from './<%name%>.service';\n\nconst repo: <%capsName%>Repository = new <%capsName%>Repository();\nconst service: <%capsName%>Service = new <%capsName%>Service(repo);\nconst controller: <%capsName%>Controller = new <%capsName%>Controller(service);",
        },
        {
            name: '.service.ts',
            content: "import { <%capsName%>Repository } from './<%name%>.repository';\nexport class <%capsName%>Service {\n\tpublic constructor(private readonly _repo: <%capsName%>Repository){\n\t}\n}",
        },
        {
            name: '.service.spec.ts',
            content: ""
        },
        {
            name: '.controller.ts',
            content: "import { <%capsName%>Service } from './<%name%>.service';\nexport class <%capsName%>Controller {\n\tpublic constructor(private readonly _service: <%capsName%>Service) {\n\t}\n}",
        },
        {
            name: '.controller.spec.ts',
            content: ""

        },
        {
            name: '.repository.ts',
            content: "import { DefaultCrudRepository } from 'data-access-object';\nimport { <%capsName%>Model } from './<%name%>.model';\nexport class <%capsName%>Repository extends DefaultCrudRepository<<%capsName%>Model>  {\n\tpublic constructor() {\n\t\tsuper(<%capsName%>Model);\n\t} \n}"
        },
        {
            name: '.interface.ts',
            content: ""
        },
        {
            name: '.model.ts',
            content: "import { DataSource, Entity, ModelDefinition } from 'data-access-object';\nimport { dataSource } from '../config/config';\nexport class <%capsName%>Model extends Entity {\n\tpublic static definition: ModelDefinition = new ModelDefinition({\n\t});\n\tpublic static dataSource: DataSource = dataSource;\n\tpublic constructor(data?: Partial<<%capsName%>Model>) {\n\t\tsuper(data);\n\t}\n}"
        }
    ]

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    for (var file of files) {
        (function () {
            var content = file.content.replace(/<%name%>/g, name);
            content = content.replace(/<%capsName%>/g, capsName);
            var path = dir + '/' + name + file.name;

            fs.writeFile(path, content, function (err) {
                if (err) {
                    return console.log(err);
                }

                console.log(path + " created");
            });
        })();
    }
} else {
    console.log('Component already exists: ' + args[0]);
}
