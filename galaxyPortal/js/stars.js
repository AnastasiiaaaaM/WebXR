function stars() {

    let stars = document.getElementById('stars').object3D;

    let starsGeometry = new THREE.Geometry();

    for ( let i = 0; i < 100; i ++ ) {

        let star = new THREE.Vector3();
        star.x = THREE.Math.randFloatSpread( 1.6 );
        star.y = THREE.Math.randFloatSpread( 0.3 );
        star.z = THREE.Math.randFloatSpread( 1.6 );

        starsGeometry.vertices.push( star );

    }

    let starsMaterial = new THREE.PointsMaterial( {
        color: 0xffffff,
        size: 0.1,
        map: THREE.ImageUtils.loadTexture(
            "assets/img/particle.png"
        ),
        alphaTest: 0.5,
        transparent: true
    } );

    let starField = new THREE.Points( starsGeometry, starsMaterial );

    stars.add( starField );


}