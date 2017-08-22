window.onload = function() {

    var canvas = document.getElementById("canvas");
    var app = new pc.Application(canvas);
    app.start();

    // Set the canvas to fill the window and automatically change resolution to be the same as the canvas size
    app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
    app.setCanvasResolution(pc.RESOLUTION_AUTO);
    app.scene.ambientLight = new pc.Color(0.8, 0.8, 0.8);
    console.log('ambient', app.scene)
    var entity;

    // Create an Entity with a camera component
    var cameraEntity = new pc.Entity(app);
    cameraEntity.addComponent("camera", {
        clearColor: new pc.Color(0.8, 0.8, 0.8)
    });
    cameraEntity.rotateLocal(0, 0, 0);
    cameraEntity.translateLocal(0, 0.5, 2.4);
    app.root.addChild(cameraEntity);

    // Load model and animation assets
    var model = null;
    var id = null;

    app.assets.loadFromUrl("../assets/Playbot/11266/head2.json", "material", function(err, asset) {
        console.log('asset', asset.resource);
        id = asset.id;
    });
    app.assets.loadFromUrl("../assets/Playbot/11267/head3.json", "material", function(err, asset) {
        console.log('asset', asset.resource);
        id = asset.id;
    });

    app.assets.loadFromUrl("../assets/Playbot/Playbot.json", "model", function(err, asset) {
        model = asset;

        entity = new pc.Entity();
        console.log('sdsa', asset)

        // window.entity = entity;

        entity.addComponent("model", {
            type: "asset",
            asset: model,
            castShadows: true
        });

        var material = entity.model.model.meshInstances[0].material.clone();
        window.material = material;

        var keyboard = new pc.Keyboard(document.body);

        var count = 1;
        var index = 0;
        var btn1 = document.getElementById('btn1');
        var btn2 = document.getElementById('btn2');
        var mesh = entity.model.model.meshInstances;

        btn1.onclick = function() {
            changeMaterials();
        }
        btn2.onclick = function() {
            changeMeshInstance(index);
            index++
        }

        function changeMaterials() {
            if (count <= id) {
                mesh[0].material = app.assets.get(count).resource;
                count++;
            } else {
                mesh[0].material = material;
                count = 1;
            }
        }

        function changeMeshInstance() {
            for (var i = 0; i < mesh.length; i++) {
                if (i === index % mesh.length) {
                    mesh[i].material = app.assets.get(1).resource;
                } else {
                    mesh[i].material = material;
                }
            }
        }

        app.root.addChild(entity);

    });

}