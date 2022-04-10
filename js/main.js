let API_KEY = prompt('Please enter your api key from https://api.nasa.gov/')

fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
        data.near_earth_objects.forEach(obj => {
            let asteroid = new Asteroid(obj.name_limited, obj.id);
            asteroid.createElement()
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
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.x = ~~(Math.random() * width);
        this.y = ~~(Math.random() * height);
    }

    createElement() {
        const asteroid = document.createElement('img');
        asteroid.classList.add('asteroid');
        asteroid.setAttribute('id', this.id);
        asteroid.src = './img/asteroid2.png';

        const size = (Math.random() * 19) + 41;
        asteroid.style.width = `${size}px`;
        asteroid.style.height = `${size}px`;

        document.getElementById('asteroids').appendChild(asteroid);

        this.move(asteroid)
    }

    // Need to make this method private
    move(asteroid) {
        let bool = Math.random() < .5

        const step = _ => {
            let val = Math.floor(Math.random() * 3) + 1
            return  bool ? -val : val
        }

        let [x, y, run, rise] = [this.x, this.y, step(), step()]
        this.setRotation(asteroid, rise, run);

        let moveAsteroid = setInterval(() => {  
            x += run;
            y += rise;

            asteroid.style.top = `${y}px`;
            asteroid.style.left = `${x}px`;
        
            if (x > width || y > height || x < -50 || y < -50) {
                x = this.x
                y = this.y
            }
        }, 60);
        
        console.log(this.name)
    }

    // Need to make this method private
    setRotation(asteroid, rise, run) {
        let angle = Math.atan(rise / run) * 100;

        if (Math.sign(rise) === 1)
            angle = angle + 180;
        
        console.log(angle);
        asteroid.style.transform = `rotate(${angle}deg)`;
    }
}