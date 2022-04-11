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
        
        // let [x, y] = this.startLocation();
        // this.x = x;
        // this.y = y;
    }

    createElement() {
        const asteroid = document.createElement('div');
        asteroid.classList.add('asteroid');
        
        // const above = `<h3 id="${this.id}-above" class="asteroid-name">${this.name}</h3>`
        // const below = `<h3 id="${this.id}-below" class="asteroid-name">${this.name}</h3>`

        const above = document.createElement('h3');
        above.setAttribute('id', `${this.id}-above`);
        above.classList.add('asteroid-name');
        above.style.display = 'none';
        above.innerText = this.name;

        const below = document.createElement('h3');
        below.setAttribute('id', `${this.id}-below`);
        below.classList.add('asteroid-name');
        below.style.display = 'none';
        below.innerText = this.name;

        const img = document.createElement('img');
        img.setAttribute('id', this.id);
        img.classList.add('asteroid-img');
        img.src = './img/asteroid.png';
        img.alt = "image of an asteroid"

        const size = (Math.random() * 19) + 41;
        img.style.width = `${size}px`;
        img.style.height = `${size}px`;

        asteroid.appendChild(above);
        asteroid.appendChild(img);
        asteroid.appendChild(below);

        // const asteroid = document.createElement('img');
        // asteroid.classList.add('asteroid');
        // asteroid.setAttribute('id', this.id);
        // asteroid.src = './img/asteroid.png';

        
        // const img = document.getElementById(`${this.id}`);
        // const size = (Math.random() * 19) + 41;
        // img.style.width = `${size}px`;
        // img.style.height = `${size}px`;

        document.getElementById('asteroids').appendChild(asteroid);

        // const size = (Math.random() * 19) + 41;
        // asteroid.style.width = `${size}px`;
        // asteroid.style.height = `${size}px`;

        // document.getElementById('asteroids').appendChild(asteroid);

        this.move(asteroid, img)
    }

    // Need to make this method private
    move(asteroid, img) {
        let bool = Math.random() < .5

        const step = _ => {
            let val = Math.floor(Math.random() * 3) + 1

            this.setHoverLocation(bool);

            return  bool ? -val : val;
        }

        let [x, y, run, rise] = [this.x, this.y, step(), step()]
        this.rotate(img, rise, run);

        let moveAsteroid = setInterval(() => {  
            x += run;
            y += rise;

            asteroid.style.top = `${y}px`;
            asteroid.style.left = `${x}px`;
        
            if(x > width || y > height || x < -50 || y < -50) {
                x = this.x
                y = this.y
            }
        }, 60);
        
        console.log(this.name)
    }

    // Need to make this method private
    rotate(img, rise, run) {
        let angle = Math.atan(rise / run) * 100;

        if(Math.sign(rise) === 1)
            angle = angle + 180;
        
        console.log(angle);
        img.style.transform = `rotate(${angle}deg)`;
    }

    setHoverLocation(bool) {
        if(bool) {
            document.getElementById(`${this.id}-below`).style.display = "block";
        } else {
            document.getElementById(`${this.id}-above`).style.display = "block";
        }
    }


    // startLocation() {
    //     const direction = Math.floor(Math.random() * 4);
    //     let [x, y] = [0, 0]

    //     switch(direction) {
    //         case 0: // top
    //             y = height;
    //             x = Math.random() * width;
    //             break;
    //         case 1: // right
    //             y = Math.random() * height;
    //             x = width;
    //             break;
    //         case 2: // bottom
    //             x = Math.random() * width;
    //             break;
    //         case 3: // left
    //             y = Math.random() * height
    //             break;
    //     }

    //     return [x, y];
    // }
}