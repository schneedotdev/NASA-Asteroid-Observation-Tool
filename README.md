<div align="center">
  <h1>NASA Asteroid Observation Tool</h1>
  <p>Using NASA's Asteroid NeoWs API, this app allows you to observe an archive of asteroids that have been within a close proximity of earth.</p>
  <p><b>Live Website:</b> https://asteroid-observer.netlify.app</p>
</div>

<div align="center">
  <img src="https://user-images.githubusercontent.com/77141303/168932147-5aa35725-9b12-4277-8394-4d9917e3eaa3.gif">
</div>


## How It's Made:

**Tech used:** HTML, CSS, JavaScript

Using the Fetch API, I was able to request data from NASA's NeoWs API. Once the response is received, I populate the DOM with elements representing each of NASA's documented asteroids. I use an image of an asteroid to represent each object that was received from NASA. Each asteroid has a hover state that displays the asteroid flying across the screen and a click event which brings up information about the asteroid. Lastly, each asteroid is given a random location, size and trajectory/slope to follow. The image used is then rotated based on the angle produced by the tangent line given by the slope, and the x axis. 

## Future Optimizations:

<ul>
  <li>Using netlify, store token secret from user and consume it on page load.</li>
</ul>

## Lessons Learned:

By using math and css transformations, I am able to simmulate the path of an asteroid across a browser window.
