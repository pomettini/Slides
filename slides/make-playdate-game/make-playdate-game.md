---
marp: true
theme: haskell
---

# Let's make a game for Playdate

**Also called "the Game Boy with a Crank"**

Giorgio Pomettini ([@pomettini](https://github.com/pomettini))

---

# What's in this talk

- Setting up a dev environment
- Lua language overview
- Making a player moving on the screen
- How to use the Crank (duh)
- Where to look for help
- Profit (?)

---

# Brief history

- Created by [Panic](https://panic.com/), a software house notable for [Coda](https://panic.com/coda/) and [Transmit](https://panic.com/transmit/), and for publishing [Firewatch](https://www.firewatchgame.com/) and [Untitled Goose Game](https://goose.game/), as a way to celebrate their 20th birthday
- Announced on May 2019
- Started shipping on April 2022
- $179 (with taxes & shipping = ~€280)
- Comes with [24 exclusive games](https://play.date/games/)
- Any Playdate is a devkit and you can develop/sideload games on it!

---

# Tech specs

**Display**

- Monochrome 1-bit memory LCD display, 400x240px resolution
- Refreshed at 30 fps by default, maximum 50 fps

**Controls**

- Eight-way d-pad, two primary buttons
- Collapsible crank, accelerometer

**Sound:** Internal speaker, microphone, headphone jack
**Connectivity:** Wi-Fi, Bluetooth
**Memory & Storage:** 16MB _(yes, megabytes!)_ RAM, 4GB flash storage

---

# Dev environments

- [Pulp](https://play.date/pulp/) on your browser
- [Playdate SDK](https://play.date/dev/) which supports Lua or C
- [Visual Studio Code](https://code.visualstudio.com/) on Windows, Mac and Linux
- [Nova](https://nova.app/) on Mac (recommended)
- Playdate Simulator (included in the SDK)
- A Playdate (if you have one)

---

# Pulp

- [Pulp](https://play.date/pulp) is an online game maker for Playdate (inspired by [Bitsy](https://bitsy.org/))
- It’s an all-in-one game studio: it includes sprite, animation, music and a level editor
- Uses [PulpScript](https://play.date/pulp/docs/pulpscript/), which is a friendly scripting language
- However, since Pulp games are limited in scope, we'll use the [Playdate SDK](https://play.date/dev/) instead

---

# Playdate Simulator

- Download the [Playdate SDK](https://play.date/dev/)
- Launch the Playdate Simulator

# ![height:350px](images/playdate-simulator.png)

---

# Visual Studio Code setup

- Make sure you have Visual Studio Code installed
- Download the [Playdate extension](https://marketplace.visualstudio.com/items?itemName=Orta.playdate)
- Fork the Visual Studio Code template for [Windows](https://github.com/Whitebrim/VSCode-PlaydateTemplate) or for [MacOS](https://github.com/cadin/playdate-vscode-template)
- Ctrl/Cmd + Shift + P → Run app in Playdate Simnulator

---

# Nova setup

- Make sure you have Nova installed
- Install the [Playdate extension](https://extensions.panic.com/extensions/com.panic/com.panic.Playdate/)
- Click on the project name in the top left of the window tooolbar
- In the **Build & Run section** of the resulting dialog, click the **plus** button
- Choose **Playdate Simulator** from the list of options to create a new configuration
- Specify our project’s _Source_ folder. It will use _./Source_ or _./source_ by default
- Press the **Run** button in the upper left corner of the window to invoke the Playdate Simulator and run your game

---

# Hello world!

```lua
print("Hello world!")
```

# ![height:350px](images/hello-world.png)

---

# Brief intro to Lua

---

# Primitives

- Lua is a dynamically typed language
- There are no type definitions in the language, each value carries its own type

```lua
"Hello world"   -- string
10.4            -- number
true            -- boolean
nil             -- nil
print           -- function
```

---

# Functions

- Functions can both carry out a specific task or compute and return values

```lua
function add(a, b)
    return a + b
end

print(add(10, 20))  -- Returns 30
```

- In that syntax, a function definition has a name (add), a list of parameters (a and b), and a body, which is a list of statements

---

# Tables

- The table type implements associative arrays
- An associative array is an array that can be indexed not only with numbers, but also with strings or any other value of the language
- Tables have no fixed size, you can add as many elements as you want to a table dynamically

```lua
-- Create a table and store its reference in `player'
player = {}
player["hp"] = 100
print(player["hp"])     -- Prints 100
print(player.hp)        -- Prints 100 (Same as above)
```

---

# Tables

- Each table may store values with different types of indices and it grows as it needs to accommodate new entries

```lua
a = {}
a[10] = "Hello"
a["x"] = "World"
print(a[10])        -- Prints "Hello"
print(a.x)          -- Prints "World"
print(a[20])        -- Prints nil (undefined)
```

- Table fields evaluate to nil if they are not initialized

---

# Loops

- A numeric for has the following syntax

```lua
for i = 1, 5 do
    print(i)
end

-- Output:

-- 1
-- 2
-- 3
-- 4
-- 5
```

---

# Loops

- The basic Lua library provides `pairs` a handy function that allows you to iterate over the elements of a table

```lua
a = {}
a[10] = "Hello"
a["x"] = "World"

for key, value in pairs(a) do
    print(key .. value)  -- Concats strings with ..
end

-- Output:

-- 10Hello
-- xWorld
```

---

# Conditionals

- TODO

---

# Meh things

- One-based indexing (arrays starts at 1)

---

# Loading a Sprite

```lua
-- Importing Playdate core libs

import "CoreLibs/graphics"
import "CoreLibs/sprites"

gfx = playdate.graphics

player = gfx.sprite:new()                   -- Creates a new sprite object
player:setImage(gfx.image.new('player'))    -- 'player.png' is being loaded
player:moveTo(200, 120)                     -- Moving the sprite in the center
player:addSprite()                          -- Adds the sprite to the display list

function playdate.update()
    gfx.sprite.update()                     -- Calls update() on every sprite
end
```

---

# Loading a Sprite

# ![height:450px](images/hello-sprite.png)

---

# Transforming a Sprite

```lua
-- Make the player sprite five time bigger

player:setScale(5)
```

# ![height:300px](images/big-sprite.png)

---

# Transforming a Sprite

```lua
-- Rotating a sprite (in degrees)

player:setRotation(135)
```

# ![height:300px](images/rotated-sprite.png)

---

# Transforming a Sprite

```lua
-- Flipping a sprite (on the horizontal side)

player:setImageFlip(gfx.kImageFlippedX)
```

# ![height:300px](images/flipped-sprite.png)

---

# Transforming a Sprite

```lua
-- Setting the z-index for the sprite (high value = draw first)

player:setZIndex(10)

-- Sprites that aren’t visible don’t get their draw() method called

player:setVisible(false)
```

- For more sprite-related methods have a look at their [Inside Playdate](https://sdk.play.date/Inside%20Playdate.html#_sprite_basics) section

---

# Moving a sprite

```lua
function playdate.leftButtonDown()
    player:moveTo(player.x - 10, player.y)  -- Player is moving to the left
end

function playdate.rightButtonDown()
    player:moveTo(player.x + 10, player.y)  -- Player is moving to the right
end

function playdate.upButtonDown()
    player:moveTo(player.x, player.y - 10)  -- Player is moving up
end

function playdate.downButtonDown()
    player:moveTo(player.x, player.y + 10)  -- Player is moving down
end
```

---

# Using the Crank

- For `playdate.cranked()`, `change` is the angle change in degrees
- `acceleratedChange` is change multiplied by a value that increases as the crank moves faster, similar to the way mouse acceleration works

```lua
-- Moves player horizontally based on how you turn the crank

function playdate.cranked(change, acceleratedChange)
    player:moveTo(player.x + change, player.y)
end
```

---

# Using the Crank

# ![height:450px](images/playdate-simulator-full.png)

---

# OOP

- Lua does not offer built-in support for object-oriented programming of any kind
- CoreLibs provides a basic object-oriented class system
- **Object** is the base class all new subclasses inherit from

```lua
-- Base class is Animal

class('Animal').extends()

-- Cat is a subclass of Animal

class('Cat').extends(Animal)
```

---

# OOP

- Classes are provided with an **init** function
- The subclass decides how many and what type of arguments its **init** function takes

```lua
function Cat:init(age, weight)
    Oak.super.init(self, age)
    self.weight = height
end
```

- The init function will normally want to call its superclass’s implementation of **init** and must use the syntax above

---

# OOP

Let's make an example by putting the player logic in its class

```lua
-- player.lua

import "CoreLibs/graphics"
import "CoreLibs/sprites"

gfx = playdate.graphics

class("Player").extends(gfx.sprite)

function Player:init(x, y)
    Player.super.init(self)
    self:setImage(gfx.image.new('player'))
    self:moveTo(x, y)
    self:addSprite()
end
```

---

# OOP

Looks better now, don't you think?

```lua
import "CoreLibs/graphics"
import "CoreLibs/sprites"
import "player"

gfx = playdate.graphics

player = Player(200, 120)

function playdate.update()
  gfx.sprite.update()
end
```

---

# OOP

```lua
players = { Player(100, 120), Player(200, 120), Player(300, 120) }
```

# ![height:400px](images/three-players.png)

---

# Documentation

---

# Where to put your game

- Unfortunately Playdate doesn't have a store (yet) so
- You can self-host it on your website or
- Put it or sell it on websites such as [itch.io](https://itch.io/)

---

# Where to look for help

- [SquidGodDev](https://www.youtube.com/c/SquidGodDev) excellent video tutorials
- [Awesome Playdate](https://github.com/sayhiben/awesome-playdate) crowd-sourced awesomeness
- [/r/PlaydateConsole](https://www.reddit.com/r/PlaydateConsole/) and [/r/PlaydateDeveloper](https://www.reddit.com/r/PlaydateDeveloper/)

---

# Demo

---

# Things I didn't cover (yet)

- Collisions
- Audio
- Accelerometer
- Fonts
- Debugging
- Deploying on a real device _(maybe for part 2?)_

But you can find all your answers on [Inside Playdate](https://sdk.play.date/)

---

# Thank you

- Questions?
