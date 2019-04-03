
// This component gives the invisible hider walls the property they need
AFRAME.registerComponent('hider-material', {
    init: function() {
        const mesh = this.el.getObject3D('mesh');
       mesh.material.colorWrite = false
    },
});

// This component hides and shows certain elements as the camera moves
AFRAME.registerComponent('portal', {
    schema: {
        width: {default: 4},
        height: {default: 6},
        depth: {default: 1},
    },
    init: function(){
        this.camera = document.getElementById('camera');
        this.contents = document.getElementById('portal-contents');
        this.walls = document.getElementById('hider-walls');
        this.portalWall = document.getElementById('portal-wall');
        this.portalWorld = document.getElementById('portal-world');
        this.isInPortalSpace = false;
        this.wasOutside = true
    },
    tick: function() {
        const position = this.camera.object3D.position;

        const isOutside = position.z  > this.data.depth / 2;
        const withinPortalBounds =
            position.y < this.data.height && Math.abs(position.x) < this.data.width / 2;

        if (this.wasOutside != isOutside && withinPortalBounds) {
            this.isInPortalSpace = !isOutside
        }

        this.contents.object3D.visible = this.isInPortalSpace || isOutside;
        this.walls.object3D.visible = !this.isInPortalSpace && isOutside;
        this.portalWall.object3D.visible = this.isInPortalSpace && !isOutside;
        this.portalWorld.object3D.visible = this.isInPortalSpace;

        this.wasOutside = isOutside
    }
});


AFRAME.registerComponent('registerevents', {
    init: function () {
        let marker = this.el;
        marker.addEventListener('markerFound', function() {
            //  let markerId = marker.id;
            //console.log('! markerFound', markerId);

            // Hide Marker Frame
            document.getElementById('containerUi').style.display = 'none';
        });
        marker.addEventListener('markerLost', function() {
            // let markerId = marker.id;
            // console.log('! markerLost', markerId);
            document.getElementById('containerUi').style.display = 'block';
            popUpWindowClose();
        });
    }
});