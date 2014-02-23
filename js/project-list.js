/**
 * Provides angularjs controller/data for coding.html
 */

function ProjectListCtrl($scope) {
	$scope.games = [
		{
			name:"The Bender: Unconditional Liver",
			link:"http://www.youtube.com/watch?v=yXqGt6yHazs",
			img:"img/coding/liver.jpg",
			action:"Watch a gameplay video of The Bender: Unconditional Liver: Inspired by A True Story: III: The Reckoning: On Ice: The Musical",
			desc:[
				'An iPad game made for the second Molyjam by Andrea Benavides, Anna Lotko, Nic Vasconcellos, Noah Witherspoon, and myself. The quote we based our game off of was "I want you to experience unconditional love. That\'s what I\'m trying to get at." We took that to mean the uncondtional love your liver gives you when you are binge drinking.',
				'And so, you and some friends must act quickly to perform various actions while the owner of these organs drinks themselves to an early grave. Actions include starting the heart back up by squeezing it, inducing vomit by flicking the stomach, and emptying the bladder by tilting the iPad',
				'Made in Objective C. Art done with photoshop and green make up, and sounds mixed with Audacity. I acted as sound engineer then transitioned to programming secondary features toward the end.'
			]
		},
		{
			name:"Goodnight Molly",
			link:"http://www.youtube.com/watch?v=NfFKWc7f5PI",
			img:"img/coding/goodnight_molly.jpg",
			action:"Watch the gameplay video",
			desc:[
				'An iPad game made for the first ever Molyjam by Andrea Haid, Peter Mohrbacher, Richard Shemaka, Dan Spaventa, Noah Witherspoon, and me. The tweet we based our game off of was "What if the pause button was a weapon?" In this game, you play as Molly, a child experiencing night terrors. When she closes her eyes, her wildest fears come to life and terrorize her bedroom, but when she opens them (pauses the game), the monsters stop moving and come under the influence of physics, hopefully crashing into each other and stuff. I was the primary sound engineer and UI engineer.',
				'The game was made in 48 hours using the Unity game engine. Original art was made with Photoshop and Flash, music was composed with FL studio, and sound effects were mixed with Audacity. I acted as sound engineer and UI programmer.'
			]
		},
		{
			name:"Mini Mages",
			link:"http://youtube.com/watch?v=qVdAuJmO3oo",
			img:"img/coding/minimages.png",
			desc:[
				'An iOS game made for Romp Interactive with Ali Wallick, Wes Anderson, Rose Peng, and Rob Spessard. The game takes advantage of networked iOS devices, specifically using an iPad as console with up to four iPhones or iPods connected as controllers. The game is structured as a set of minigames as the end goal was to explore functionality, and we felt we could best do that by making small games that completely focused on one aspect of the devices.',
				'The entire game was made with the Unity engine in conjunction with the Gamekit plugin for networking. Art was original, but music was taken from license-free online sources due to time constraints.'
			],
			action:"Watch the demo"
		},
		{
			name:"Sync",
			link:"http://www.kongregate.com/games/LCC4725HeyHey/sync",
			img:"img/coding/sync.png",
			desc:[
				'A two player flash game made for my Game Design as Cultural Practice class with Nathan Bailey, Ben Chapman, Cameron Luck, David Dudley, and Jacob Paul. The game is played with two players on one computer. The first player controls a 2D sprite and attempts to blend in with several AIs moving about on screen. A second player then tries to determine which of the sprites is the player.',
				'Built with Flash Builder instead of just Flash, and all art and sound assets are original works.'
			],
			action:"Play Sync"
		},
		{
			name:"The Last Extinction: Earth",
			link:"http://www.kongregate.com/games/stregawolf/the-last-extinction-earth",
			img:"img/coding/lastExtinction.png",
			desc:[
				'My third Global Game Jam entry, made with Dan Spaventa, Richard Shemaka, Alison Cundiff, and Nathan Bailey. I acted as the sound engineer, as well as helping with design and debugging. The topic for this 48 hour competition was "extinction."',
				'In this game you take control of four space craft during Earth\'s final hours. You fire on magma fissures that emanate from the ever expanding core with three satellites, using their beams to reverse the fault growth and buy some time while using the shuttle to beam up as many survivors as you can. The game plays like an arcade game, where the goal is simply to get the most points; however, you get no points for simply surviving as long as possible. (besides, the topic is extinction, so the planet is blowing up no matter what you do)',
        		'Made with Unity 3D to deploy on the web. Music was made with FL Studio, and sound effects were mixed in Audacity.',
        		'PS. The cheese was layed on in places on purpose. Roll with it.'
			],
			action:"Play The Last Extinction: Earth"
		},
		{
			name:"Leap of Faith",
			link:"http://www.globalgamejam.org/2010/leap-faith",
			img:"img/coding/leap.jpg",
			desc:[
				"Richard Shemaka, Daniel Spaventa, Alex Scarlata, Anton Sigety, and I created this game for the second annual Global Game Jam in 2010. The theme for the 48-hour competition was &quot;deception,&quot; with an added constraint of relating the game to the words \"rain,\" \"plane,\" and \"Spain.\" Leap of Faith is about a witch attempting to escape the Spanish Inquisition by jumping on invisible platforms (they're invisible so the Inquisition can't find them, duh), and she can temporarily make these platforms visible by summoning a rain storm over them. However, she can only use her rain powers so many times before it runs out. I provided the sound resources, including the background music, and did some level editing while our main designer got some sleep. We placed 3rd in local judging.",
				"Music made in FL Studio 8. Game made with XNA. Windows only, and requires a download."
			],
			action:"Download from the Global Game Jam site"
		},
		{
			name:"Tangent",
			link:"http://www.globalgamejam.org/games/tangent",
			img:"img/coding/tangent.jpg",
			action:"Download from the Global Game Jam site",
			desc:[
				"My first Global Game Jam entry, made by myself, Rose Peng, Jeanie Choi, Shaun Choo, and Tim Frank. The topic here was &quot;without each other, we'll never run out of problems.&quot; In this game, you control two different entities, Pluggy and Socket, trying to escape some ill-defined dimension by collecting glowing charges and depositing them in a bubble. Apart, these two creatures can do is move around easily. Together, they can only rotate, using the attraction of the charges to move. Also, if they collect too many charges, they explode. I did the programming while the rest of the team provided resources. We placed 2nd in local judging.",
				"Made with Java, so it should be cross-platform compatible. Art done with Photoshop and Flash, and I think the music was made with Garage Band."
			]
		},
		{
			name:"Airships!",
			link:"",
			img:"img/coding/ships_preview.jpg",
			action:"Hint: Starboard means right",
			desc:[
				"This is a mostly complete text adventure. You grew up as a talented  pilot aboard your eccentric millionaire uncle's airship, the Princess Buttercup, and now that he has passed away, he has left the Princess to you. He also left all the repairs to you. Thanks, Uncle.",
				"Built with Inform 7 (some crazy language that is meant to look like English), but it runs in a Java applet."
			]
		},
		{
			name:"Aethereal",
			link:"",
			img:"img/coding/aethereal.jpg",
			desc:[
				'This is the first game I wrote in my spare time during high school. In it, you captain a ship in a top-down, 2D galaxy. The goal was to create a completely sandbox setting where you could do whatever you want: fight bad guys, fight good guys, trade peacefully, trick out your spaceship, etc. in a half procedural, half designed galaxy. Highlights of what I managed to get done before going off to college include newtonian flight physics, messily optimized collision detection for space battles, a 3D galaxy map, and a tile-based environment for when you landed on a space station.'
			]
		},
	];

	$scope.protos = [
		{
			name:"Dandelion Breeze",
			link:"",
			img:"img/coding/dandelion_preview.jpg",
			action:"Play the wind",
			desc:[
				'This is a drawing program; however, instead of using some kind of coloration on a digital canvas, you use the wind to create invisible lines of movement, dropping dandelion seeds into the flow to see your creation.',
				'Click once on a dandelion to pick it up, and click once again to spread its seeds. Drag your cursor to control the wind.',
				"Built using Processing, so it'll require Java to run.",
			]
		},
		{
			name:"Procedural Music Generator",
			link:"",
			img:"img/coding/music_preview.jpg",
			action:"",
			desc:[
				'Every note and instrument you hear is generated purely by some combination of sine waves, triangle waves, square waves, saw waves, white noise, pink noise, and math. There was a mild attempt at making the notes harmonize, but it was only semi-successful.',
				'Built with Processing. Needs Java'
			]
		},
	];

	$scope.graphics = [
		{
			name:"A Ray Tracer",
			link:"",
			img:"img/coding/ray_preview.jpg",
			action:"Render",
			desc:[
				"This is a simple ray tracer. It only renders spheres and triangles. It runs on a simple interpreter, so in the future, I will try to make user input feasible. Until then, one can press numbers 0-9 to see several scenes rendered.",
				'Built with Processing. Needs Java'
			]
		},
	];

	$scope.math = [
		{
			name:"Steepest Descent",
			link:"demos/Steepest Descent.zip",
			img:"img/coding/steepest_prev.jpg",
			action:"Download the project zip file",
			desc:[
				"This program solves Ax=b for x, where A is any arbitrary NxN matrix, using an iterative steepest descent algorithm. There is no GUI, so please read \"readme.txt\" upon downloading. For more information, one can also read \"write up.pdf\"",
				'Built with Java'
			]
		},
		{
			name:"Jacobi's Algorithm",
			link:"demos/Jacobi.zip",
			img:"img/coding/jacobi_preview.jpg",
			action:"Download the project zip file",
			desc:[
				"This program generates a random 5x5 matrix and then uses Jacobi's algorithm to diagonalize it. A graph of (k, b_k) is shown, where k is the number of iterations and b_k is the value of ln(Off(B)), where B is the matrix.",
				'Built with Java'
			]
		},
		{
			name:"Euler's Method for solving ODEs",
			link:"demos/Euler.zip",
			img:"img/coding/euler_preview.jpg",
			action:"Download the project zip file",
			desc:[
				"This program takes in a differential equation of two variables then graphs and solves it.",
				'Built with Java'
			]
		},
	];
}

