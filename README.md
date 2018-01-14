

# Banner Boy - Mini Cooper

This is a test project for Banner Boy. https://bannerboy.com/

## Getting Started

### Prerequisites
node.js<br>
gulp.js

### Installing
After installing Prerequisites
```
npm install
```

## File Structure



# Banner Boy - Mini Cooper

This is a test project for Banner Boy. https://bannerboy.com/

## Getting Started

### Prerequisites
node.js<br>
gulp.js

### Installing
After installing Prerequisites
```
npm install
```

## File Structure


    ├── dev                         # development build outputs
	├── prod                        # production build outputs
    ├── src                     
	│   ├── global                  # global templates
    │   │   ├── pug                 # global html template
    │   │   ├── scripts             # global js
    │   ├── creatives           
	│   │   ├── [version]           # creative execution
    │   │   │   ├── [size]          # size specific
    │   │	│   │   ├── assets      # psds for png sprites + images
    │   │	│   │   ├── js          # size specific js
    │   │	│   │   ├── pug         # size specific html template
    │   │	│   │   ├── sass        # size specific sass
    │   │   │   │   └── ...  
    │   │   │   └── ...  
    │   │   └── ...  
	│   └── ...           
	└── ...



## Gulp commands

```
gulp
```
default development mode
```
gulp prod
```
minify files and optimize image assets for production build
```
gulp testsize
```
tests production build for file size without fallback image
```
gulp traffic
```
zips production builds for deployment

## Built With

* SASS
* PUG (https://pugjs.org/api/getting-started.html)
* Sprite smith - sprite sheets (https://www.npmjs.com/package/spritesmith)
* Tiny PNG API (https://tinypng.com/developers)

## Author
Erik Peterson
erik@erik-id.com




## Gulp commands

```
gulp
```
default development mode
```
gulp prod
```
minify files and optimize image assets for production build
```
gulp testsize
```
tests production build for file size without fallback image
```
gulp traffic
```
zips production builds for deployment

## Built With

* SASS
* PUG (https://pugjs.org/api/getting-started.html)
* Sprite smith - sprite sheets (https://www.npmjs.com/package/spritesmith)
* Tiny PNG API (https://tinypng.com/developers)

## Author
Erik Peterson
erik@erik-id.com
