let API_KEY = prompt('Please enter your api key from https://api.nasa.gov/')

fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
        data.near_earth_objects.forEach(obj => {
            let asteroid = new Asteroid(obj.name_limited, 5);

            asteroid.createElement(obj.name_limited)
        });
    })
    .catch(err => {
        console.log(err);
    })

let width = window.innerWidth;
let height = window.innerHeight;

window.onresize = function () {
    width = window.innerWidth;
    height = window.innerHeight;
}

class Asteroid {
    constructor(name, distance) {
        this.name = name;
        this.distance = distance;
        this.x = ~~(Math.random() * width);
        this.y = ~~(Math.random() * height);
    }

    createElement(name) {
        let asteroid = document.createElement('div');
        asteroid.classList.add('asteroid');

        document.getElementById('asteroids').appendChild(asteroid);

        console.log(this)
        this.move(asteroid, this.x, this.y)
    }

    move(asteroid, x, y) {
        console.log("X", x, "Y", y)
        let moveAsteroid = setInterval(() => {
            x++ && y++;
            asteroid.style.top = `${y}px`;
            asteroid.style.left = `${x}px`;
        
            if (x > width || y > height) {
                clearInterval(moveAsteroid);
            }
        }, 25);
        
        console.log(this.name)
    }
}




// let moveAsteroid = setInterval(() => {
//     x++ && y++;
//     asteroid.style.top = `${y}px`;
//     asteroid.style.left = `${x}px`;

//     if(x > width || y > height) {
//         clearInterval(moveAsteroid);
//     }
// }, 25);